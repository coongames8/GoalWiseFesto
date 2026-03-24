import { useLocation } from 'react-router-dom';
import './Pay.scss';
import { useEffect, useState } from 'react';
import AppHelmet from '../AppHelmet';
import ScrollToTop from '../ScrollToTop';
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
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
      navigate("/", { replace: true });
    });
  };

  const handlePayment = () => {
    const paymentOptions = {
        key: "pk_live_Gu3aUUGAzWj1zeonHdwBAi4oDD9Vc4AViyHWqALp",
        reference: (new Date()).getTime().toString(),
        amount: data != null ? data.price : subscription.price,
        currency: "KES",
        customer: {
            name: user ? user.email : "coongames8@gmail.com",
            email: user ? user.email : "coongames8@gmail.com",
        },
        onSuccess: () => {
            handleUpgrade();
        },
        onFailed: (err) => {
            console.error(err.message);
        }
    };

    const payment = new KoraPayment();
    payment.initialize(paymentOptions);
};


  return (
    <div className='pay'>
      <AppHelmet title={"Booking"} />
      <ScrollToTop />
      {
        loading && <Loader />
      }

      {data && <h4>Payment Of KSH {data.price}</h4>}
      {data && <h4>You Are About To Claim {data.plan} Plan.</h4>}
      <button onClick={handlePayment} className="btn">
        Pay Now
      </button>
    </div>
  )
}
