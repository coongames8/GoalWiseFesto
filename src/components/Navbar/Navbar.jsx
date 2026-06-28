import { useEffect, useState } from 'react';
import Logo from '../../assets/logo.svg';
import './Navbar.scss';

import { IoClose, IoMenu } from 'react-icons/io5';

import { NavLink, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Navbar = () => {
    const [opened, setOpened] = useState(false);
    const [user, setUser] = useRecoilState(userState);
    const location = useLocation();

    const handleLogout = () => {
        signOut(auth);
        setUser(null);
        setOpened(false);
    };

    const handleToggle = () => setOpened((prev) => !prev);

    const closeMenu = () => setOpened(false);

    useEffect(() => {
        const onScroll = () => setOpened(false);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header>
            <NavLink to="/" className="logo" onClick={closeMenu}>
                <img src={Logo} alt="GOAL WISE" />
                <span className="brand">GOAL WISE</span>
            </NavLink>
            <nav className={opened ? 'active' : ''}>
                <div className="btn-container">
                    {user ? (
                        <>
                            <span className="btn ghost" onClick={handleLogout}>
                                Logout
                            </span>
                            <NavLink className="btn" to="pricing" onClick={closeMenu} state={{ from: location }}>
                                Pricing
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink className="btn ghost" to="login" onClick={closeMenu} state={{ from: location }}>
                                Login
                            </NavLink>
                            <NavLink className="btn" to="register" onClick={closeMenu} state={{ from: location }}>
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>

            <div className="icon" id="menu-bars" onClick={handleToggle} aria-label="Toggle menu">
                {opened ? <IoClose /> : <IoMenu />}
            </div>
        </header>
    );
};

export default Navbar;
