import { useEffect } from 'react';
import './Product.scss';
import { IoCheckmarkCircle } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { planState } from '../../recoil/atoms';


export default function Product({item}) {
const setPlan = useSetRecoilState(planState);

    const handleSetPlan = () => {
        setPlan(item)
    }
  return (
            <div className="product" id={item.id}>
                <span className="odds">
                    <IoCheckmarkCircle className='rate'/>
                    {item.totalOdds} odds
                </span>
                <h1 className='title'>{item.title}</h1>
                <div className="content">
                    <p>
                        <ul>
                            {item.features.map(feature => {
                                return <li key={feature}>{feature}</li>
                            })}
                        </ul>
                    </p>
                </div>
                
                <div className='btn-container'>
                    <div className="span">${item.price}</div>
                    <NavLink to={"/pay"} className="btn" state={item} onClick={handleSetPlan}>BUY NOW &raquo;</NavLink>
                </div>
                
            </div>
  )
}