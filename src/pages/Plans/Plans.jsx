import './Plans.scss';
import Product from '../../components/Product/Product';
import AppHelmet from '../AppHelmet';
import ScrollToTop from '../ScrollToTop';
import { useEffect, useState } from 'react';
import { notificationState, subscriptionState, userState } from '../../recoil/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { getTips, getUser } from '../../firebase';

export default function Plans() {
    const [filteredTips, setFilteredTips] = useState(null);
    const [user, setUser] = useRecoilState(userState);
    const [isPremium, setIsPremium] = useState(false);
    const [orderTrackingId, setOrderTrackingId] = useState(null);
    const [orderMerchantReference, setOrderMerchantReference] = useState(null);
    const [statusData, setStatusData] = useState(null);
    const navigate = useNavigate();
    const setNotification = useSetRecoilState(notificationState);
    const [tips, setTips] = useState(null);
    const [loading, setLoading] = useState(false);
    const [subscription, setSubscription] = useRecoilState(subscriptionState);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US');
    };

    const today = new Date().toISOString().split('T')[0];

    useEffect(() =>{
      getTips(setTips, setLoading, formatDate(today));
    }, []);

    const getQueryParam = (param) => {
      const searchParams = new URLSearchParams(location.search);
      return searchParams.get(param);
    };

    // Fetch orderTrackingId and orderMerchantReference from query params
useEffect(() => {
  const trackingId = getQueryParam('OrderTrackingId');
  const merchantReference = getQueryParam('OrderMerchantReference');
  
  if (trackingId) {
    setOrderTrackingId(trackingId);
  }
  
  if (merchantReference) {
    setOrderMerchantReference(merchantReference);
  }
}, [location.search]);


const callbackFunction = async(status) => {

  if(status !== "Completed") return;
  const currentDate = new Date().toISOString();
  await updateUser(user.email, true, {
    subDate: currentDate,
    billing: subscription.billing,
    plan: subscription.plan,
  }, setNotification).then(() => {
    getUser(user.email, setUser);
  }).then(() => {
    navigate("/tips", { replace: true });
  });
}

// Fetch status data when orderTrackingId is available
useEffect(() => {
  if (orderTrackingId) {
    trackPayment(orderTrackingId, setNotification, setStatusData, setLoading);
  }
}, [orderTrackingId]);

useEffect(() => {
  statusData && callbackFunction(statusData.payment_status_description)
}, [statusData]);


    useEffect(() => {
      if (tips !== null) {
        const groupedData = tips.reduce((acc, item) => {
          const time = item.time;
          const [hours, minutes] = time.split(':').map(Number);
          
          let timeSlot = '';
          if (hours >= 0 && hours < 6) {
            timeSlot = 'Morning (12AM-6AM)';
          } else if (hours >= 6 && hours < 12) {
            timeSlot = 'Afternoon (6AM-12PM)';
          } else if (hours >= 12 && hours < 18) {
            timeSlot = 'Evening (12PM-6PM)';
          } else if (hours >= 18 && hours <= 23) {
            timeSlot = 'Night (6PM-12AM)';
          }

          if (!acc[timeSlot]) {
            acc[timeSlot] = [];
          }
          
          acc[timeSlot].push(item);
          
          return acc;
        }, {});
        
        const typeTitles = {
          "1X2": "Win Draw Win",
          "CS": "Correct Score",
          "GG": "Goal/No Goal",
          "OV_UN": "OVER/UNDER",
          "DC": "Double Chance"
        };
        
        const result = Object.keys(groupedData).map(timeSlot => {
          const typeGroupedData = groupedData[timeSlot].reduce((acc, item) => {
            const type = item.type;
            if (!acc[type]) {
              acc[type] = { totalOdds: 0, games: [], type };
            }
            
            acc[type].totalOdds += parseFloat(item.odd);
            acc[type].games.push(item);
            
            return acc;
          }, {});
    
          return {
            timeSlot,
            types: Object.keys(typeGroupedData).map(type => {
              const totalOdds = typeGroupedData[type].totalOdds;
              const numberOfGames = typeGroupedData[type].games.length;
              const price = Math.round(totalOdds * 1.5); // Calculate price
              
              // Create the features array
              const features = [
                `${numberOfGames} Games`,
                `${totalOdds.toFixed(0)}+ Total Odds`,
                "100% Guaranteed"
              ];
    
              return {
                type: typeGroupedData[type].type,
                title: typeTitles[type] || "Unknown Type",
                totalOdds,
                numberOfGames,
                price,
                features, // Add features to the subgroup
                games: typeGroupedData[type].games,
                timeSlot
              };
            })
          };
        }).sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
        
        setFilteredTips(result);
      }
    }, [tips]);
    
  return (
    <div className='plans'> 
        <ScrollToTop />
        <AppHelmet title={"Plans"}/>
        {
          filteredTips && filteredTips.map(filteredTip => {
            return (<>
                <h2 className='title'>{filteredTip.timeSlot}</h2>
                <div className='post-container'>
                  {filteredTip.types && filteredTip.types.map((type, index) => {
                    return <Product item={type} key={index}/>
                  })}
                </div>
            </>)
          })
        }
    </div>
  )
}
