import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import AppHelmet from '../../pages/AppHelmet';
import Loader from '../../components/Loader/Loader';
import { db } from '../../firebase';
import ScrollToTop from '../../pages/ScrollToTop';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '../../recoil/atoms';
import '../AdminAdd.scss';

const toDateTimeLocal = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default function EditUser() {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const setNotification = useSetRecoilState(notificationState);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [subscription, setSubscription] = useState('');
    const [subDate, setSubDate] = useState('');
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setUsername(user.username);
            setIsPremium(user.isPremium);
            setSubscription(user.subscription || 'Free');
            if (user.subDate) setSubDate(toDateTimeLocal(user.subDate));
        }
    }, [user]);

    useEffect(() => {
        setUser(location.state);
    }, [location]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const usercollref = doc(db, 'users', user.email);
        updateDoc(usercollref, {
            isPremium,
            subscription: subscription === 'Free' ? '' : subscription,
            subDate,
        })
            .then(() => {
                setNotification({
                    isVisible: true,
                    type: 'success',
                    message: 'User updated successfully',
                });
                setLoading(false);
            })
            .catch((error) => {
                setNotification({
                    isVisible: true,
                    type: 'error',
                    message: error.message,
                });
                setLoading(false);
            });
    };

    return (
        <div className="admin-tips">
            <AppHelmet title="Edit User" />
            <ScrollToTop />
            <h1>Update User</h1>
            {loading && <Loader />}
            {!loading && (
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            placeholder="@someone"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            placeholder="example@gmail.com"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="subscription">Subscription</label>
                        <input
                            type="text"
                            placeholder="subscription"
                            id="subscription"
                            value={subscription}
                            onChange={(e) => setSubscription(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="subDate">Subscribed On</label>
                        <input
                            type="datetime-local"
                            id="subDate"
                            value={subDate}
                            onChange={(e) => setSubDate(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="premium">Premium</label>
                        <input
                            type="checkbox"
                            id="premium"
                            onChange={(e) => setIsPremium(e.target.checked)}
                            checked={isPremium}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn">
                            Update
                        </button>
                        <span className="btn ghost" onClick={() => window.history.back()}>
                            Done
                        </span>
                    </div>
                </form>
            )}
        </div>
    );
}
