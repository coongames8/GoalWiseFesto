import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Auth.scss';
import { getUser, signInUser, resetPassword } from '../../firebase';
import AppHelmet from '../AppHelmet';
import ScrollToTop from '../ScrollToTop';
import { notificationState, userState } from '../../recoil/atoms';
import { useSetRecoilState , useRecoilState } from 'recoil'; // Add useRecoilState

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetOpen, setResetOpen] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [sending, setSending] = useState(false);
    const setNotification = useSetRecoilState(notificationState);
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState); // Add this to get setUser

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            const refreshUser = async (email) => {
                await getUser(email, setUser); // You'll need access to setUser
            };
            signInUser(email, password, setNotification, navigate, refreshUser);
        } else {
            setNotification({
                isVisible: true,
                type: 'warning',
                message: 'Please enter both email and password.',
            });
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        if (!resetEmail) {
            setNotification({
                isVisible: true,
                type: 'warning',
                message: 'Enter your email to receive a reset link.',
            });
            return;
        }
        setSending(true);
        const ok = await resetPassword(resetEmail, setNotification);
        setSending(false);
        if (ok) {
            setResetOpen(false);
            setResetEmail('');
        }
    };

    return (
        <div className="auth">
            <AppHelmet title="Login" />
            <ScrollToTop />
            <form onSubmit={handleLogin}>
                <h1>Welcome Back</h1>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="example@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="button" className="forgot-link" onClick={() => setResetOpen(true)}>
                    Forgot password?
                </button>
                <button type="submit" className="btn">
                    Sign In
                </button>
            </form>
            <span>
                Don&apos;t have an account? <NavLink to="/register">Register here</NavLink>
            </span>

            {resetOpen && (
                <div className="reset-overlay" onClick={() => setResetOpen(false)}>
                    <div className="reset-modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Reset Password</h2>
                        <p>Enter your email and we&apos;ll send you a link to reset your password.</p>
                        <form onSubmit={handleReset}>
                            <input
                                type="email"
                                placeholder="example@company.com"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn" disabled={sending}>
                                {sending ? 'Sending...' : 'Send Reset Link'}
                            </button>
                            <button type="button" className="btn ghost" onClick={() => setResetOpen(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
