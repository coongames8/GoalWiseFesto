import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Auth.scss';
import { registerUser } from '../../firebase';
import AppHelmet from '../AppHelmet';
import ScrollToTop from '../ScrollToTop';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '../../recoil/atoms';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setNotification = useSetRecoilState(notificationState);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (email && password) {
          registerUser(username, email, password, setNotification, navigate); // Pass navigate
        } else {
          setNotification({
            isVisible: true,
            type: 'warning',
            message: "You have entered an invalid email address!",
          });
        };
    }

    return (
        <div className="auth">
            <AppHelmet title="Register" />
            <ScrollToTop />
            <form onSubmit={handleRegister}>
                <h1>Get Started</h1>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="example@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <span className="hint">
                    4-15 characters: letters, numbers, underscores, periods, or hyphens.
                </span>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn">
                    Sign Up
                </button>
            </form>
            <span>
                Already registered? <NavLink to="/login">Login here</NavLink>
            </span>
        </div>
    );
};
