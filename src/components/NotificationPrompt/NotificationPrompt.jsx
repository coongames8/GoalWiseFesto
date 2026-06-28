import { useEffect, useState } from 'react';
import { IoNotificationsOutline, IoCloseOutline } from 'react-icons/io5';
import {
    isStandalone,
    notificationsSupported,
    getNotificationPermission,
    requestNotificationPermission,
    showLocalNotification,
} from '../../utils/pushNotifications';
import './NotificationPrompt.scss';

const DISMISS_KEY = 'goalwise-notification-prompt-dismissed';

export default function NotificationPrompt() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!notificationsSupported()) return;
        if (!isStandalone()) return;
        if (localStorage.getItem(DISMISS_KEY)) return;
        if (getNotificationPermission() !== 'default') return;

        const timer = setTimeout(() => setVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleEnable = async () => {
        const permission = await requestNotificationPermission();
        if (permission === 'granted') {
            await showLocalNotification(
                'GOAL WISE',
                'Notifications are on! You will get alerts for new tips and predictions.',
                '/tips'
            );
        }
        setVisible(false);
        localStorage.setItem(DISMISS_KEY, '1');
    };

    const handleDismiss = () => {
        setVisible(false);
        localStorage.setItem(DISMISS_KEY, '1');
    };

    if (!visible) return null;

    return (
        <div className="notif-prompt">
            <div className="notif-prompt__icon">
                <IoNotificationsOutline />
            </div>
            <div className="notif-prompt__content">
                <span className="notif-prompt__title">Enable Notifications</span>
                <span className="notif-prompt__text">Get alerts for new VIP tips and predictions.</span>
            </div>
            <button className="notif-prompt__btn" onClick={handleEnable}>
                Enable
            </button>
            <button className="notif-prompt__close" onClick={handleDismiss} aria-label="Dismiss">
                <IoCloseOutline />
            </button>
        </div>
    );
}
