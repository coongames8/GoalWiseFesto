import './UserCard.scss';
import { MdOutlineEmail, MdStars } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const suffix = (d) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    };
    return `${day}${suffix(day)} ${date.toLocaleString('en-GB', { month: 'long', year: 'numeric' })}`;
};

const UserCard = ({ user }) => {
    return (
        <NavLink
            className={`user-card ${user.isPremium ? 'premium' : ''}`}
            to={`/users/${user.username ? '@' + user.username : user.email}`}
            state={user}
        >
            <div className="card-header">
                <span className="plan-badge">
                    {user.isPremium && <MdStars className="badge-icon" />}
                    {user.subscription?.billing|| 'Free'} Plan
                </span>
            </div>
            <div className="card-body">
                <div className="username">@{user.username || user.email}</div>
                <div className="email">
                    <MdOutlineEmail className="mail" />
                    <span>{user.email}</span>
                </div>
                {user.subscription && user.subscription.subDate && (
                    <div className="sub-date">Subscribed {formatDate(user.subscription.subDate)}</div>
                )}
            </div>
        </NavLink>
    );
};

export default UserCard;
