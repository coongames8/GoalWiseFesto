import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoDownloadOutline, IoCloseOutline } from 'react-icons/io5';
import './InstallPrompt.scss';

const VISIT_KEY = 'goalwise-page-visits';
const DISMISS_KEY = 'goalwise-install-dismissed';
const DISMISS_TS_KEY = 'goalwise-install-dismissed-ts';
const RE_PROMPT_INTERVAL = 5;

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    const isInstalled = () =>
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;

    const shouldRePrompt = () => {
        const dismissed = localStorage.getItem(DISMISS_KEY);
        if (!dismissed) return true;
        const ts = Number(localStorage.getItem(DISMISS_TS_KEY) || 0);
        const visitsSince = Number(localStorage.getItem(VISIT_KEY) || 0);
        if (dismissed === 'dismissed') {
            return visitsSince - ts >= RE_PROMPT_INTERVAL;
        }
        return false;
    };

    useEffect(() => {
        if (isInstalled()) return;

        const visits = Number(localStorage.getItem(VISIT_KEY) || 0) + 1;
        localStorage.setItem(VISIT_KEY, String(visits));

        if (visits >= RE_PROMPT_INTERVAL && shouldRePrompt()) {
            setVisible(true);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (isInstalled()) return;

        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            if (shouldRePrompt()) {
                setVisible(true);
            }
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, [location.pathname]);

    const handleInstall = async () => {
        if (!deferredPrompt) {
            setVisible(false);
            return;
        }
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        setVisible(false);
        if (outcome === 'accepted' || outcome === 'dismissed') {
            localStorage.setItem(DISMISS_KEY, outcome === 'accepted' ? 'installed' : 'dismissed');
            localStorage.setItem(DISMISS_TS_KEY, String(localStorage.getItem(VISIT_KEY) || 0));
        }
    };

    const handleDismiss = () => {
        setVisible(false);
        localStorage.setItem(DISMISS_KEY, 'dismissed');
        localStorage.setItem(DISMISS_TS_KEY, String(localStorage.getItem(VISIT_KEY) || 0));
    };

    useEffect(() => {
        const handler = () => {
            if (isInstalled()) {
                setVisible(false);
                localStorage.setItem(DISMISS_KEY, 'installed');
            }
        };
        window.addEventListener('appinstalled', handler);
        return () => window.removeEventListener('appinstalled', handler);
    }, []);

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
