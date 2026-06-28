import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'GOAL WISE';
const DEFAULT_DESCRIPTION =
    'Get expert football tips, VIP predictions, correct scores, live scores and betting odds for top leagues worldwide.';
const DEFAULT_KEYWORDS =
    'football tips, football predictions, VIP tips, correct score, live football scores, football betting odds, football results, soccer predictions, betting tips, league standings';

const PAGE_META = {
    '': { title: 'Expert Football Tips & VIP Predictions', description: DEFAULT_DESCRIPTION },
    Login: { title: 'Login', description: 'Sign in to your GOAL WISE account to access VIP football tips and predictions.' },
    Register: { title: 'Create Account', description: 'Register on GOAL WISE to unlock VIP football tips, predictions and expert analysis.' },
    About: { title: 'About Us', description: 'Learn about GOAL WISE — your home for expert football predictions, VIP tips and real-time match insights.' },
    Tips: { title: 'Today\'s Football Tips & Predictions', description: 'Browse today\'s football tips and VIP predictions across major leagues. Filter by game type and date.' },
    Pricing: { title: 'Pricing Plans', description: 'Choose a GOAL WISE subscription plan — daily, weekly or monthly — for VIP football tips and predictions.' },
    Subscribe: { title: 'Subscribe', description: 'Complete your subscription to unlock GOAL WISE VIP football tips and predictions.' },
    'Add Tip': { title: 'Add Tip', description: 'Admin: add a new football tip to GOAL WISE.' },
    'Edit Tip': { title: 'Edit Tip', description: 'Admin: update an existing football tip on GOAL WISE.' },
    'Edit User': { title: 'Edit User', description: 'Admin: update a user subscription on GOAL WISE.' },
    'All Users': { title: 'All Users', description: 'Admin: view all registered GOAL WISE users.' },
    '404 Error': { title: 'Page Not Found', description: 'The page you are looking for does not exist.' },
};

export default function AppHelmet({ title }) {
    const location = useLocation();
    const canonicalUrl = `${window.location.origin}${location.pathname}`;
    const meta = PAGE_META[title] || { title: title || SITE_NAME, description: DEFAULT_DESCRIPTION };
    const fullTitle = title ? `${meta.title} | ${SITE_NAME}` : `${SITE_NAME} — ${meta.title}`;
    const origin = window.location.origin;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={meta.description} />
            <meta name="keywords" content={DEFAULT_KEYWORDS} />
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:image" content={`${origin}/logo.svg`} />
            <meta property="og:url" content={canonicalUrl} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={meta.description} />
            <meta name="twitter:image" content={`${origin}/logo.svg`} />
        </Helmet>
    );
}
