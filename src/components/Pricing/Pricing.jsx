import './Pricing.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { pricings } from '../../data';

export default function Pricing() {
  const location = useLocation();
  return (
    <div className='pricing' id='pricing'>
        <h1>Pricing</h1>
        <h2>What fits you the best?</h2>
        <div className="wrapper"> 
        {
            pricings.map(pricing =>{
                return (
                    <div key={pricing.id}>
                        <h1>{pricing.plan}</h1>
                        <p>{pricing.title}</p>
                        <h2>${pricing.price}/{pricing.billing}</h2>
                        <h3>Features</h3>
                        <ul>
                          {
                            pricing.features.map(feature => {
                                return <li>{feature}</li>
                            })
                          }
                        </ul>
                        <NavLink className="btn" style={{backgroundColor: pricing.color}} state={{ from: location, subscription: pricing}} to={"/subscribe"}>Start now</NavLink>
                    </div>
                );
            })
        }  
      
      </div>
    </div>
  )
}
