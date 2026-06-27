import './Flyer.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { pricings } from '../../data';

export default function Flyer() {
    const location = useLocation();
    return (
        <div className="flyer">
            <div className="content">
                <h1>Ready to make smarter predictions?</h1>
                <p>Join Goal Wise and unlock expert VIP tips, detailed analysis, and real-time match insights.</p>
                <NavLink
                    to="/subscribe"
                    className="btn"
                    state={{ from: location, subscription: pricings[0] }}
                >
                    Subscribe Now
                </NavLink>
            </div>
        </div>
    );
}
