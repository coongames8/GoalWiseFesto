import { useLocation, useNavigate } from 'react-router-dom';
import './Pay.scss';
import { useEffect, useState } from 'react';
import AppHelmet from '../AppHelmet';
import ScrollToTop from '../ScrollToTop';
import Loader from '../../components/Loader/Loader';
import { pricings } from '../../data';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { notificationState, subscriptionState, userState } from '../../recoil/atoms';
import { PaystackButton } from 'react-paystack';
import { getUser, updateUser } from '../../firebase';
import { useCurrency } from '../../context/CurrencyContext';

export default function Subscription() {
    const [user, setUser] = useRecoilState(userState);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [data, setData] = useState(null);
    const setNotification = useSetRecoilState(notificationState);
    const [subscription, setSubscription] = useRecoilState(subscriptionState);
    const navigate = useNavigate();
    const { symbol, convertPrice } = useCurrency();

    useEffect(() => {
        if (location.state && location.state.subscription) {
            const sub = location.state.subscription;
            setData({
                ...sub,
                price: sub.price != null ? sub.price : convertPrice(sub.price),
                currency: sub.currency || symbol,
            });
            setSubscription(sub);
        } else {
            const fallback = { ...pricings[0], price: convertPrice(pricings[0].price), currency: symbol };
            setData(fallback);
            setSubscription(fallback);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const handleUpgrade = async () => {
        const currentDate = new Date().toISOString();
        await updateUser(
            user.email,
            true,
            {
                subDate: currentDate,
                billing: subscription.billing,
                plan: subscription.plan,
            },
            setNotification
        )
            .then(() => getUser(user.email, setUser))
            .then(() => navigate('/', { replace: true }));
    };

    const amount = (data && data.price) || convertPrice(subscription.price);
    const displaySymbol = data?.currency || symbol;
    const payCurrency = displaySymbol === '₦' ? 'NGN' : 'KES';

    const componentProps = {
        reference: new Date().getTime().toString(),
        email: user ? user.email : 'coongames8@gmail.com',
        amount: amount * 100,
        publicKey: 'pk_live_f36eadef9a97cb84ef23ebec889bfc4e458e3a4a',
        currency: payCurrency,
        metadata: {
            name: user ? user.email : 'coongames8@gmail.com',
        },
        text: 'PAY NOW',
        onSuccess: () => handleUpgrade(),
        onClose: () => {},
    };

    return (
        <div className="pay">
            <AppHelmet title="Booking" />
            <ScrollToTop />
            {loading && <Loader />}
            {data && (
                <div className="pay-card">
                    <h2>Complete your subscription</h2>
                    <span className="plan">{data.plan} Plan</span>
                    <div className="amount">
                        {displaySymbol} {data.price.toLocaleString()}
                    </div>
                    <h4>Billing: {data.billing}</h4>
                    <PaystackButton {...componentProps} className="btn" />
                </div>
            )}
        </div>
    );
}
