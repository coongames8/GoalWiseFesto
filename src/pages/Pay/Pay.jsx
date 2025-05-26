import { useLocation, useNavigate } from 'react-router-dom';
import './Pay.scss';
import { useEffect, useState } from 'react';
import AppHelmet from '../AppHelmet';
import ScrollToTop from '../ScrollToTop';
import Loader from '../../components/Loader/Loader';
import { pricings } from '../../data';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { notificationState, planState, userState } from '../../recoil/atoms';
import { getUser, updateUserPlan } from '../../firebase';
import { PaystackButton } from 'react-paystack';

export default function Pay() {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [data, setData] = useState(null);
  const setNotification = useSetRecoilState(notificationState);
  const plan = useRecoilValue(planState)
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
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
    amount: data.price * 100 || (plan.price * 100),
    publicKey: 'pk_live_71bf88a41666c28d7e035b7086eddedda3ba8c47',
    currency: "KES",
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
      <AppHelmet title={"Booking"} />
      <ScrollToTop />
      {
        loading && <Loader />
      }
      {data && <h4>You Are About To Claim {data.type} Tips At {data.timeSlot} With {data.totalOdds} Odds For Only KSH {data.price}</h4>}
      <PaystackButton {...componentProps} className='btn' />
    </div>
  )
}
