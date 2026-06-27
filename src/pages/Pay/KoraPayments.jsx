import { useLocation, useNavigate } from 'react-router-dom';
import './Pay.scss';
import { useEffect, useState } from 'react';
import AppHelmet from '../AppHelmet';
import ScrollToTop from '../ScrollToTop';
import Loader from '../../components/Loader/Loader';
import { pricings } from '../../data';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { notificationState, subscriptionState, userState } from '../../recoil/atoms';
import KoraPayment from 'kora-checkout';
import { getUser, updateUser } from '../../firebase';

export default function KoraPayments() {
    const [user, setUser] = useRecoilState(userState);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [data, setData] = useState(null);
    const setNotification = useSetRecoilState(notificationState);
    const [subscription, setSubscription] = useRecoilState(subscriptionState);
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state) {
            setData(location.state.subscription);
            setSubscription(location.state.subscription);
        } else {
            setData(pricings[0]);
            setSubscription(pricings[0]);
        }
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

    const handlePayment = () => {
        const paymentOptions = {
            key: 'pk_live_v3G6gawdvs1ugJmqo3cfQaGJS5njbJTrjLyxT2gB',
            reference: new Date().getTime().toString(),
            amount: data != null ? data.price : subscription.price,
            currency: 'KES',
            customer: {
                name: user ? user.email : 'coongames8@gmail.com',
                email: user ? user.email : 'coongames8@gmail.com',
            },
            onSuccess: () => handleUpgrade(),
            onFailed: (err) => console.error(err.message),
        };

        const payment = new KoraPayment();
        payment.initialize(paymentOptions);
    };

    return (
        <div className="pay">
            <AppHelmet title="Subscribe" />
            <ScrollToTop />
            {loading && <Loader />}
            {data && (
                <div className="pay-card">
                    <h2>Complete your subscription</h2>
                    <span className="plan">{data.plan} Plan</span>
                    <div className="amount">KSH {data.price}</div>
                    <h4>Billing: {data.billing}</h4>
                    <button onClick={handlePayment} className="btn">
                        Pay Now
                    </button>
                </div>
            )}
        </div>
    );
}
