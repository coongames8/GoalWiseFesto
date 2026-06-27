import { useState } from 'react';
import AppHelmet from '../../pages/AppHelmet';
import Loader from '../../components/Loader/Loader';
import '../AdminAdd.scss';
import { addTip } from '../../firebase';
import ScrollToTop from '../../pages/ScrollToTop';
import { notificationState } from '../../recoil/atoms';
import { useSetRecoilState } from 'recoil';

const GAME_TYPES = [
    { value: '1X2', label: 'WDW (1X2)' },
    { value: 'CS', label: 'Goals (CS)' },
    { value: 'GG', label: 'BTTS (GG/NG)' },
    { value: 'OV_UN', label: 'TOTAL (OV/UN)' },
    { value: 'DC', label: 'DC 1X2' },
];

export default function AddTip() {
    const [home, setHome] = useState('');
    const [away, setAway] = useState('');
    const [odd, setOdd] = useState('');
    const [pick, setPick] = useState('');
    const [status, setStatus] = useState('');
    const [time, setTime] = useState('');
    const [won, setWon] = useState('');
    const [premium, setPremium] = useState(false);
    const [results, setResults] = useState('');
    const [loading, setLoading] = useState(false);
    const [gamesType, setGamesType] = useState('1X2');
    const setNotification = useSetRecoilState(notificationState);

    const handleSubmit = (e) => {
        e.preventDefault();
        const d = new Date(time);
        const date = new Intl.DateTimeFormat('en-US').format(d);
        const timeOnly = d.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });

        addTip(
            { home, away, date, odd, pick, status, time: timeOnly, won, premium, results, type: gamesType },
            setNotification,
            setLoading
        );
    };

    return (
        <div className="admin-tips">
            <AppHelmet title="Add Tip" />
            <ScrollToTop />
            <h1>Add Tip</h1>
            {!loading && (
                <form onSubmit={handleSubmit}>
                    <div className="input-container vertical">
                        <label htmlFor="home">Home Team</label>
                        <input
                            type="text"
                            placeholder="e.g. Arsenal"
                            id="home"
                            value={home}
                            onChange={(e) => setHome(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container vertical">
                        <label htmlFor="away">Away Team</label>
                        <input
                            type="text"
                            placeholder="e.g. Chelsea"
                            id="away"
                            value={away}
                            onChange={(e) => setAway(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="odds">Odds</label>
                        <input
                            type="text"
                            placeholder="e.g. 1.85"
                            id="odds"
                            value={odd}
                            onChange={(e) => setOdd(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="pick">Pick</label>
                        <input
                            type="text"
                            placeholder="e.g. Home Win"
                            id="pick"
                            value={pick}
                            onChange={(e) => setPick(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="status">Status</label>
                        <input
                            type="text"
                            placeholder="pending / live / finished"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="time">Date / Time</label>
                        <input
                            type="datetime-local"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="results">Results</label>
                        <input
                            type="text"
                            placeholder="e.g. 2-1"
                            id="results"
                            value={results}
                            onChange={(e) => setResults(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="won">Outcome</label>
                        <input
                            type="text"
                            placeholder="won / pending / lost"
                            id="won"
                            value={won}
                            onChange={(e) => setWon(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="premium">Premium</label>
                        <input
                            type="checkbox"
                            id="premium"
                            onChange={(e) => setPremium(e.target.checked)}
                            checked={premium}
                        />
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
                        <button type="submit" className="btn" title="Submit">
                            Add Tip
                        </button>
                    </div>
                </form>
            )}
            {loading && <Loader />}
        </div>
    );
}
