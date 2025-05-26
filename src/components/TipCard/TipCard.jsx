import { IoCheckmarkCircleOutline, IoTimeOutline, IoWarningOutline } from "react-icons/io5";
import './TipCard.scss';
import { truncateTitle } from "../../utils/textUtils";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdPending } from "react-icons/md";

export default function TipCard({ tip, isAdmin, timeSlot, plan, today }) {
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (isAdmin) {
            setHidden(false);
        } else if (tip.date === today && tip.premium) {

            if (tip.status !== "finished") {
                if (plan === null || (plan.timeSlot !== timeSlot)) {
                    //
                    setHidden(true);
                } else {
                    if (plan.type !== tip.type) {
                        setHidden(true);
                    } else {
                        setHidden(false);
                    }
                }
            } else {
                setHidden(false);
            }

        } else {
            setHidden(false);
        }

    }, [plan, timeSlot, tip.type, isAdmin]);

    return (
        <div className="tip-card" style={{ borderLeft: hidden ? "2px solid #1f4568" : "2px solid #2196f3" }}>
            <div className="center">
                <div className="teams">
                    <p className="name" style={{
                        color: hidden && 'transparent',
                        textShadow: hidden && '0 0 5px rgba(0,0,0,.2)'
                    }}>{!hidden ? `${truncateTitle(tip.home, 60)}` : "CLOSED"}</p>
                    <div className="results">{tip.pick}</div>
                    <p className="name" style={{
                        color: hidden && 'transparent',
                        textShadow: hidden && '0 0 5px rgba(0,0,0,.2)'
                    }}> {!hidden ? `${truncateTitle(tip.away, 60)}` : "CLOSED"}</p>
                </div>
                <div className='info'>
                    <p><IoTimeOutline className='icon' />{tip.time}</p>
                    {isAdmin && <NavLink to={"/edit-tip"} state={tip}><BiEdit /></NavLink>}
                    {/*<p>  {tip.won ? <>@{tip.odd} <span className='won'>won<IoCheckmarkCircleOutline className='icon won'/></span></> : <>@{tip.odd}  <span className='lost'> lost<IoWarningOutline className='icon lost'/></span></>  }</p>*/}
                    {
                        tip.status === "pending" ? <p>@{tip.odd}<span className='pending'>pending<MdPending className='icon pending' /></span></p> : <p>  {tip.won === "won" ? <>@{tip.odd} <span className='won'>won<IoCheckmarkCircleOutline className='icon won' /></span></> : <>@{tip.odd}  <span className='lost'> lost<IoWarningOutline className='icon lost' /></span></>}</p>
                    }
                </div>
            </div>
        </div>)
}
