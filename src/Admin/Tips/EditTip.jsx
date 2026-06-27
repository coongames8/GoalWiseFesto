import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import AppHelmet from '../../pages/AppHelmet';
import '../AdminAdd.scss';
import { updateTip } from '../../firebase';
import ScrollToTop from '../../pages/ScrollToTop';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '../../recoil/atoms';

const GAME_TYPES = [
    { value: '1X2', label: 'WDW (1X2)' },
    { value: 'CS', label: 'Goals (CS)' },
    { value: 'GG', label: 'BTTS (GG/NG)' },
    { value: 'OV_UN', label: 'TOTAL (OV/UN)' },
    { value: 'DC', label: 'DC 1X2' },
];

const formatDateTimeForInput = (date, time) => {
    const [month, day, year] = date.split('/').map((part) => parseInt(part, 10));
    const formattedDate = new Date(year, month - 1, day);
    const yearStr = formattedDate.getFullYear();
    const monthStr = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(formattedDate.getDate()).padStart(2, '0');
    return `${yearStr}-${monthStr}-${dayStr}T${time}`;
};

export default function EditTip() {
    const [home, setHome] = useState('');
    const [away, setAway] = useState('');
    const [odd, setOdd] = useState('');
    const [pick, setPick] = useState('');
    const [status, setStatus] = useState('');
    const [time, setTime] = useState('');
    const [won, setWon] = useState('');
    const [premium, setPremium] = useState(false);
    const [gamesType, setGamesType] = useState('1X2');
    const [results, setResults] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const setNotification = useSetRecoilState(notificationState);
    const location = useLocation();

    useEffect(() => {
        setData(location.state);
    }, [location]);

    useEffect(() => {
        if (!data) return;
        setHome(data.home);
        setAway(data.away);
        setOdd(data.odd);
        setPick(data.pick);
        setStatus(data.status);
        setResults(data.results);
        setWon(data.won);
        setPremium(data.premium);
        setGamesType(data.type);
        setTime(formatDateTimeForInput(data.date, data.time));
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const d = new Date(time);
        const date = new Intl.DateTimeFormat('en-US').format(d);
        const timeOnly = d.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
        updateTip(
            data.id,
            { home, away, odd, pick, status, won, premium, type: gamesType, results, date, time: timeOnly },
            setNotification,
            setLoading,
            setData
        );
    };

    return (
        <div className="admin-tips">
            <AppHelmet title="Edit Tip" />
            <ScrollToTop />
            <h1>Update Tip</h1>
            {!loading && (
                <form onSubmit={handleSubmit}>
                    <div className="input-container vertical">
                        <label htmlFor="home">Home Team</label>
                        <input type="text" id="home" value={home} onChange={(e) => setHome(e.target.value)} required />
                    </div>
                    <div className="input-container vertical">
                        <label htmlFor="away">Away Team</label>
                        <input type="text" id="away" value={away} onChange={(e) => setAway(e.target.value)} required />
                    </div>
                    <div className="input-container">
                        <label htmlFor="odds">Odds</label>
                        <input type="text" id="odds" value={odd} onChange={(e) => setOdd(e.target.value)} required />
                    </div>
                    <div className="input-container">
                        <label htmlFor="pick">Pick</label>
                        <input type="text" id="pick" value={pick} onChange={(e) => setPick(e.target.value)} required />
                    </div>
                    <div className="input-container">
                        <label htmlFor="status">Status</label>
                        <input type="text" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required />
                    </div>
                    <div className="input-container">
                        <label htmlFor="time">Date / Time</label>
                        <input type="datetime-local" id="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                    </div>
                    <div className="input-container">
                        <label htmlFor="results">Results</label>
                        <input type="text" id="results" value={results} onChange={(e) => setResults(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="won">Outcome</label>
                        <input type="text" id="won" value={won} onChange={(e) => setWon(e.target.value)} required />
                    </div>
                    <div className="input-container">
                        <label htmlFor="premium">Premium</label>
                        <input type="checkbox" id="premium" onChange={(e) => setPremium(e.target.checked)} checked={premium} />
                    </div>
                    <div className="input-container radio-group">
                        <label>Game Type</label>
                        {GAME_TYPES.map((gt) => (
                            <label key={gt.value}>
                                <input
                                    type="radio"
                                    name="games-type"
                                    value={gt.value}
                                    checked={gamesType === gt.value}
                                    onChange={(e) => setGamesType(e.target.value)}
                                />
                                {gt.label}
                            </label>
                        ))}
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
            {loading && <Loader />}
        </div>
    );
}
