import './Footer.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { socialUrls } from '../../data';
import { userState } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

const ADMIN_EMAILS = ['kkibetkkoir@gmail.com', 'charleykibet254@gmail.com', 'coongames8@gmail.com'];

const Footer = () => {
    const user = useRecoilValue(userState);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsAdmin(Boolean(user && ADMIN_EMAILS.includes(user.email)));
    }, [user]);

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="brand-col">
                    <h2 className="brand-name">GOAL WISE</h2>
                    <p className="brand-desc">
                        Expert football predictions, VIP tips, and real-time insights for major leagues worldwide.
                    </p>
                    <div className="social">
                        {socialUrls.map((social) => (
                            <Link to={social.url} title={social.title} target="_blank" rel="noreferrer" key={social.id}>
                                {social.icon}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="links-col">
                    <h3>Quick Links</h3>
                    <div className="links">
                        <NavLink to="/" state={{ from: location }}>Home</NavLink>
                        <NavLink to="/pricing" state={{ from: location }}>Pricing</NavLink>
                        <NavLink to="/login" state={{ from: location }}>Sign In</NavLink>
                        <NavLink to="/register" state={{ from: location }}>Get Started</NavLink>
                        <NavLink to="/about" state={{ from: location }}>About Us</NavLink>
                    </div>
                </div>

                {isAdmin && (
                    <div className="links-col">
                        <h3>Admin</h3>
                        <div className="links">
                            <NavLink to="/add-tip" state={{ from: location }}>Add Tip</NavLink>
                            <NavLink to="/users" state={{ from: location }}>All Users</NavLink>
                        </div>
                    </div>
                )}
            </div>

            <hr />

            <div className="footer-bottom">
                <p>&copy; GoalWise {new Date().getFullYear()}</p>
                <NavLink to="/about/#faq" state={{ from: location }}>FAQ</NavLink>
            </div>
        </footer>
    );
};

export default Footer;
