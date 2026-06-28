import { useEffect, useMemo, useState } from 'react';
import { getAllusers } from '../../firebase';
import Loader from '../../components/Loader/Loader';
import UserCard from '../../components/UserCard/UserCard';
import { IoSearchOutline, IoCloseCircle } from 'react-icons/io5';
import { MdSort } from 'react-icons/md';
import './ListUsers.scss';
import ScrollToTop from '../../pages/ScrollToTop';
import AppHelmet from '../../pages/AppHelmet';

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'name-asc', label: 'Name (A–Z)' },
    { value: 'name-desc', label: 'Name (Z–A)' },
    { value: 'premium-first', label: 'Premium first' },
];

export default function ListUsers() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [sortOpen, setSortOpen] = useState(false);

    useEffect(() => {
        getAllusers(setUsers, setLoading);
    }, []);

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase();
        let list = users;
        if (term) {
            list = list.filter((u) => {
                const name = (u.username || '').toLowerCase();
                const email = (u.email || '').toLowerCase();
                return name.includes(term) || email.includes(term);
            });
        }
        const sorted = [...list];
        switch (sortBy) {
            case 'newest':
                sorted.sort((a, b) => (b.subDate || 0) - (a.subDate || 0));
                break;
            case 'oldest':
                sorted.sort((a, b) => (a.subDate || 0) - (b.subDate || 0));
                break;
            case 'name-asc':
                sorted.sort((a, b) => (a.username || a.email).localeCompare(b.username || b.email));
                break;
            case 'name-desc':
                sorted.sort((a, b) => (b.username || b.email).localeCompare(a.username || a.email));
                break;
            case 'premium-first':
                sorted.sort((a, b) => (b.isPremium ? 1 : 0) - (a.isPremium ? 1 : 0));
                break;
            default:
                break;
        }
        return sorted;
    }, [users, search, sortBy]);

    const activeSort = SORT_OPTIONS.find((o) => o.value === sortBy);

    return (
        <div className='list-users'>
            <ScrollToTop />
            <AppHelmet title={"All Users"} />
            <div className="list-users__header">
                <h1>All Users</h1>
                <span className="list-users__count">{filtered.length} {filtered.length === 1 ? 'user' : 'users'}</span>
            </div>

            <div className="list-users__controls">
                <div className="search-box">
                    <IoSearchOutline className="search-box__icon" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button className="search-box__clear" onClick={() => setSearch('')} aria-label="Clear search">
                            <IoCloseCircle />
                        </button>
                    )}
                </div>

                <div className="sort-dropdown">
                    <button className="sort-dropdown__trigger" onClick={() => setSortOpen((v) => !v)}>
                        <MdSort />
                        <span>{activeSort?.label}</span>
                    </button>
                    {sortOpen && (
                        <>
                            <div className="sort-dropdown__backdrop" onClick={() => setSortOpen(false)} />
                            <div className="sort-dropdown__menu">
                                {SORT_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        className={`sort-dropdown__item ${sortBy === opt.value ? 'active' : ''}`}
                                        onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {loading && <Loader />}
            {!loading && filtered.length === 0 && (
                <div className="list-users__empty">
                    {users.length === 0 ? 'No users found.' : 'No users match your search.'}
                </div>
            )}
            {!loading && filtered.length > 0 && (
                <div className="list-users__grid">
                    {filtered.map(user => (
                        <UserCard key={user.email} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
}
