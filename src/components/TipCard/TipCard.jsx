import { IoCheckmarkCircleOutline, IoTimeOutline, IoWarningOutline } from "react-icons/io5";
import './TipCard.scss';
import { truncateTitle } from "../../utils/textUtils";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";

export default function TipCard({tip, isAdmin, timeSlot, plan}) {
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (plan === null || (plan.timeSlot !== timeSlot)) {
            setHidden(true);
        } else {
            if (plan.type !== tip.type) {
                setHidden(true);
            } else {
                setHidden(false);
            }
        }
    }, [plan, timeSlot, tip.type]);

    return (
    <div className="tip-card" style={{borderLeft: tip.premium ? "2px solid #1f4568" : "2px solid #2196f3"}}>
        <div className="center">
            <div className="teams">
                <p className="name"  style={{
                           color: hidden  && 'transparent',
                           textShadow: hidden && '0 0 5px rgba(0,0,0,.2)'}}>{ !hidden ? `${truncateTitle(tip.home , 60)}` : "CLOSED"}</p>
                <div className="results">{"OV 2.5"}</div>
                <p className="name"  style={{
                           color: hidden  && 'transparent',
                           textShadow: hidden && '0 0 5px rgba(0,0,0,.2)'}}> { !hidden ? `${truncateTitle(tip.away , 60)}` : "CLOSED"}</p>
            </div>
            <div className='info'>
                <p><IoTimeOutline className='icon'/>{"22:00"}</p>
                {isAdmin && <NavLink to={"/edit-tip"} state={tip}><BiEdit /></NavLink>}
                <p>{tip.won ? <>{tip.odd} <span className='won'>won<IoCheckmarkCircleOutline className='icon won'/></span></> : <>{tip.odd}  <span className='lost'> lost<IoWarningOutline className='icon lost'/></span></>  }</p>
            </div>
        </div>
    </div>)
}
