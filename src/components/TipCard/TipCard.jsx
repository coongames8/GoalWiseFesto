import './TipCard.scss';
import { truncateTitle } from "../../utils/textUtils";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { userNameSelector } from "../../recoil/selectors";
import { useRecoilValue } from "recoil";

export default function TipCard({ tip, isAdmin, today }) {
    const [hidden, setHidden] = useState(true);
    const isPremiumUser = useRecoilValue(userNameSelector);

    useEffect(() => {
        if (isAdmin || isPremiumUser) {
            setHidden(false);
        } else if (tip.date === today && tip.premium) {
            setHidden(tip.status !== "finished");
        } else {
            setHidden(false);
        }
    }, [isPremiumUser, isAdmin, tip, today]);

    function getTipStatus(tip) {
        if (tip.status === "pending") {
            return <span className="status pending">PEND</span>;
        } else if (tip.won === "won") {
            return <span className="status won">WON</span>;
        } else {
            return <span className="status lost">LOST</span>;
        }
    }

    return (
        <div className={`tip-card ${tip.premium ? "premium" : "free"}`}>
            <div className="top">
                <span className="odd">ODD {tip.odd}</span>
                <div className="tag">{tip.premium ? "VIP" : "FREE"}</div>
                {isAdmin && (
                    <NavLink to="/edit-tip" state={tip} className="edit" title="Edit tip">
                        <BiEdit />
                    </NavLink>
                )}
            </div>

            <div className="center">
                <div className="time">
                    <span>{tip.time}</span>
                </div>
                <div className="teams">
                    <p className={`name ${hidden ? "hidden" : ""}`}>
                        {!hidden ? truncateTitle(tip.home, 28) : "CLOSED"}
                    </p>
                    <div className="pick">{tip.pick}</div>
                    <p className={`name ${hidden ? "hidden" : ""}`}>
                        {!hidden ? truncateTitle(tip.away, 28) : "CLOSED"}
                    </p>
                </div>
                <div className="meta">
                    <span className="result">{tip.results || "?-?"}</span>
                    {getTipStatus(tip)}
                </div>
            </div>
        </div>
    );
}
