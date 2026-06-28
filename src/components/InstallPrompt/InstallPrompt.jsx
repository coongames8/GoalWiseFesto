import { useEffect, useState } from 'react';
import { IoDownloadOutline, IoCloseOutline } from 'react-icons/io5';
import './InstallPrompt.scss';

const DISMISS_KEY = 'goalwise-install-dismissed';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem(DISMISS_KEY);
        if (dismissed) return;

        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        setVisible(false);
        if (outcome === 'accepted') {
            localStorage.setItem(DISMISS_KEY, 'installed');
        }
    };

    const handleDismiss = () => {
        setVisible(false);
        localStorage.setItem(DISMISS_KEY, 'dismissed');
    };

    if (!visible) return null;

    return (
        <div className="install-prompt">
            <div className="install-prompt__icon">
                <IoDownloadOutline />
            </div>
            <div className="install-prompt__content">
                <span className="install-prompt__title">Install GOAL WISE</span>
                <span className="install-prompt__text">Add to your home screen for quick access to tips and predictions.</span>
            </div>
            <button className="install-prompt__btn" onClick={handleInstall}>
                Install
            </button>
            <button className="install-prompt__close" onClick={handleDismiss} aria-label="Dismiss">
                <IoCloseOutline />
            </button>
        </div>
    );
}
