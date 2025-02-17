import './Pricing.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { pricings } from '../../data';
import {useState } from 'react';

export default function Pricing() {
  const [billing, setBilling] = useState("Day");
  const location = useLocation();
  return (
    <div className='pricing' id='pricing'>
        <h1 className='head'>Pricing</h1>
        <div className="pricing-header">
            <h2>What fits you the best?</h2>
            <div className="plans-switch-container">
                <input type="checkbox" className="plans-switch" onChange={(e) => {
                  e.target.checked ? setBilling("Week") : setBilling("Day")
                }}/>
                <span className="daily">Daily</span>
                <span className="weekly">Weekly</span>
            </div>
        </div>
        <div className="wrapper"> 
        {
            pricings.filter(item => item.billing === billing).map(pricing =>{
                return (
                    <div key={pricing.id}>
                        <h1>{pricing.plan}</h1>
                        <h2><span>${pricing.price}</span>/{pricing.billing}</h2>
                        <p>{pricing.title}</p>
                        <h3>Features</h3>
                        <ul>
                          {
                            pricing.features.map(feature => {
                                return <li key={feature.split(" ").join("_")}>{feature}</li>
                            })
                          }
                        </ul>
                        <img src="https://i.postimg.cc/2jV99bKc/Vector-1.png" alt="bg" className="table-bg"/>
                        <NavLink className="btn" style={{backgroundColor: pricing.color}} state={{ from: location, subscription: pricing}} to={"/subscribe"}>Subscribe now</NavLink>
                    </div>
                );
            })
        }  
      
      </div>
    </div>
  )
}
