import { useLocation } from 'react-router-dom';
import './Pay.scss';
import { useEffect, useState } from 'react';
import AppHelmet from '../AppHelmet';
import ScrollToTop from '../ScrollToTop';
import Loader from '../../components/Loader/Loader';
import { pricings } from '../../data';
import {useRecoilState, useSetRecoilState} from 'recoil';
import { notificationState, subscriptionState, userState } from '../../recoil/atoms';
import { handlePayment } from '../../utils/handlePayments';


export default function Subscription() {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] =useState("mpesa");
  const location = useLocation();
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const setNotification = useSetRecoilState(notificationState);
  const [subscription, setSubscription] = useRecoilState(subscriptionState);

  useEffect(() => {
      if(location.state) {
        setData(location.state.subscription)
        setSubscription(location.state.subscription)
      } else {
        setData(pricings[0])
        setSubscription(pricings[0])
      }
  }, [location]);

  const handlePay = () => {
    data && handlePayment( data.price || subscription.price,user ? user.email : "coongames8@gmail.com", `${data.plan} Plan For A ${data.billing}`, '/plans', setLoading, setNotification, setUrl)
  }

  return (
    <div className='pay'>
      <AppHelmet title={"Booking"}/>
      <ScrollToTop />

      {url && <iframe src={url} style={{
        width: "100vw",
        minHeight: "100vh",
        position: 'absolute',
        zIndex: "6"
      }}></iframe>}

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
      <button className='btn'  onClick={handlePay}>PAY NOW</button>
    </div>
  )
}
