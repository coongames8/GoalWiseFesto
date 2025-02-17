import { useLocation } from 'react-router-dom';
import './Pay.scss';
import { useEffect, useState } from 'react';
import AppHelmet from '../AppHelmet';
import ScrollToTop from '../ScrollToTop';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { pricings } from '../../data';
import {useRecoilState, useSetRecoilState} from 'recoil';
import { notificationState, subscriptionState, userState } from '../../recoil/atoms';
import { PaystackButton } from 'react-paystack';
import { getUser, updateUser } from '../../firebase';


export default function Subscription() {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] =useState("mpesa");
  const location = useLocation();
  const [data, setData] = useState(null);
  const setNotification = useSetRecoilState(notificationState);
  const [subscription, setSubscription] = useRecoilState(subscriptionState);
  const navigate = useNavigate();

  useEffect(() => {
      if(location.state) {
        setData(location.state.subscription)
        setSubscription(location.state.subscription)
      } else {
        setData(pricings[0])
        setSubscription(pricings[0])
      }
  }, [location]);

    const handleUpgrade = async () => {
        const currentDate = new Date().toISOString();
        await updateUser(user.email, true, {
          subDate: currentDate,
          billing: subscription.billing,
          plan: subscription.plan,
        }, setNotification).then(() => {
          getUser(user.email, setUser);
        }).then(() => {
          navigate("/plans", { replace: true });
        });
    };

    const componentProps = {
      reference: (new Date()).getTime().toString(),
      email: user ? user.email : "coongames8@gmail.com",
      amount: (paymentType === "mpesa") ? ((data && data.price * 100 * 129) || (subscription.price * 100 * 129)) : ((data && data.price * 100) || (subscription.price * 100)),
      publicKey: 'pk_live_3536854dd4b68716f9d7515d748772e701c04832',
      currency: (paymentType === "mpesa") ? "KES" : "USD",
      metadata: {
        name: user ? user.email : "coongames8@gmail.com",
      },
      text: 'PAY NOW',
      onSuccess: (response) => {
        handleUpgrade();
      },
      onClose: () => {
        //console.log('Payment dialog closed');
        // Handle payment closure here
      },
    };

  return (
    <div className='pay'>
      <AppHelmet title={"Booking"}/>
      <ScrollToTop />
      {
        loading && <Loader />
      }

      {data && <h4>Payment Of ${data.price}</h4>}
      {data && <h4>{data.plan} Plan For A {data.billing}</h4>}
      <form className="method">
        <fieldset>
            <input name="payment-method" type="radio" value={"mpesa"} id="mpesa" checked={paymentType === "mpesa"}   onChange={(e) => setPaymentType(e.target.value)}/>
            <label htmlFor="mpesa">📲 Mobile Payment</label>
        </fieldset>
        <fieldset>
            <input name="payment-method" type="radio" value={"card"} id="card" checked={paymentType === "card"}   onChange={(e) => setPaymentType(e.target.value)}/>
            <label htmlFor="card">💳 Credit Card</label>
        </fieldset>
      </form>
      <PaystackButton {...componentProps} className='btn'/>
    </div>
  )
}
