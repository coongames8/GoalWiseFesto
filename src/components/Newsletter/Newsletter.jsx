import { useState } from 'react';
import './Newsletter.scss';
import { addMailList } from '../../firebase';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '../../recoil/atoms';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const setNotification = useSetRecoilState(notificationState);

    const handleSubmit = (event) => {
        event.preventDefault();
        addMailList({ email }, setNotification, setEmail);
    };

    return (
        <div className="newsletter" id="subscribe">
            <h3>Subscribe to our newsletter</h3>
            <p>Get the latest tips and predictions delivered to your inbox.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="example@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Subscribe</button>
            </form>
        </div>
    );
};

export default Newsletter;
