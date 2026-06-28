const NOTIFICATION_PROMPT_KEY = 'goalwise-notification-prompted';

export const isStandalone = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

export const notificationsSupported = () =>
    'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;

export const getNotificationPermission = () => {
    if (!('Notification' in window)) return 'unsupported';
    return Notification.permission;
};

export const requestNotificationPermission = async () => {
    if (!('Notification' in window)) return 'unsupported';
    const permission = await Notification.requestPermission();
    return permission;
};

export const subscribeToPush = async () => {
    if (!notificationsSupported()) return null;
    try {
        const reg = await navigator.serviceWorker.ready;
        const existing = await reg.pushManager.getSubscription();
        if (existing) return existing;
        return null;
    } catch {
        return null;
    }
};

export const showLocalNotification = async (title, body, url = '/') => {
    if (!notificationsSupported()) return false;
    if (Notification.permission !== 'granted') return false;
    try {
        const reg = await navigator.serviceWorker.ready;
        await reg.showNotification(title, {
            body,
            icon: '/logo.svg',
            badge: '/favicon.svg',
            data: { url },
            vibrate: [80, 40, 80],
        });
        return true;
    } catch {
        return false;
    }
};

export const promptNotificationsIfEligible = async () => {
    if (!notificationsSupported()) return false;
    if (!isStandalone()) return false;
    if (Notification.permission === 'granted') {
        return true;
    }
    if (Notification.permission === 'denied') return false;

    const alreadyPrompted = localStorage.getItem(NOTIFICATION_PROMPT_KEY);
    if (alreadyPrompted) return false;

    localStorage.setItem(NOTIFICATION_PROMPT_KEY, '1');
    const permission = await requestNotificationPermission();
    return permission === 'granted';
};
