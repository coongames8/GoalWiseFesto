import { useLocation, useNavigate } from 'react-router-dom';
import './Pay.scss';
import { useEffect, useState } from 'react';
import AppHelmet from '../AppHelmet';
import ScrollToTop from '../ScrollToTop';
import Loader from '../../components/Loader/Loader';
import { pricings } from '../../data';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import { notificationState, planState, userState } from '../../recoil/atoms';
import { getUser, updateUserPlan } from '../../firebase';
import { PaystackButton } from 'react-paystack';

export default function Pay() {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] =useState("mpesa");
  const location = useLocation();
  const [data, setData] = useState(null);
  const setNotification = useSetRecoilState(notificationState);
  const plan = useRecoilValue(planState)
  const navigate = useNavigate();

  useEffect(() => {
      if(location.state) {
        setData(location.state)
      } else {
        setData(pricings[0])
      }
  }, [location]);


  const handleUpgrade = async () => {
    await updateUserPlan(user.email, {
      type: plan.type,
      timeSlot: plan.timeSlot
    }, setNotification).then(() => {
      getUser(user.email, setUser);
    }).then(() => {
      navigate("/tips", { replace: true });
    })
  };


  const componentProps = {
    reference: (new Date()).getTime().toString(),
    email: user ? user.email : "coongames8@gmail.com",
    amount: (paymentType === "mpesa") ? ((data && data.price * 100 * 129) || (plan.price * 100 * 129)) : ((data && data.price * 100) || (plan.price * 100)),
    publicKey: 'pk_live_362b1c5a898c1cbcc3997049f738136211f625bf',
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
      {data && <h4>You Are About To Claim {data.type} Tips At {data.timeSlot} With {data.totalOdds} Odds For Only ${data.price}</h4>}
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
