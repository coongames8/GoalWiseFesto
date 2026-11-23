import './UserCard.scss';
import { MdOutlineEmail, MdStars, MdLocationPin, MdAndroid } from 'react-icons/md';
import { RiMacbookFill } from "react-icons/ri";
import { FaInternetExplorer } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaWindows } from "react-icons/fa";
import { FaLinux } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const UserCard = ({ user, currentUser}) => {
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

    const getLastVisitedUrl = (visitedWebsites) => {
        if (!visitedWebsites) return null;
      
        const entries = Object.values(visitedWebsites);
      
        const latest = entries.reduce((max, curr) => {
          const currSeconds = curr.lastVisitedAt?.seconds ?? 0;
          const maxSeconds = max?.lastVisitedAt?.seconds ?? 0;
          return currSeconds > maxSeconds ? curr : max;
        }, null);
      
        return latest?.originalUrl ?? null;
    };

    return (
        <NavLink
            className={`user-card ${user.isPremium ? 'premium' : ''}`}
            to={`/users/${user.username ? '@' + user.username : user.email}`}
            state={user}
        >
            <div className="card-header">
                <span className="plan-badge">
                    {user.isPremium && <MdStars className="badge-icon" />}
                    {user.subscription?.plan|| 'Free'} Plan
                </span>
                <span className="plan-badge">
                    {user.locality && <><MdLocationPin className="badge-icon" />{user.locality.city}, {user.locality.region}</>}
                </span>
            </div>
            <div className="card-body">
            <div className="username">
                @{user.username || user.email}
                {user.visitedWebsites && (() => {
                    const firstWithDevice = Object.entries(user.visitedWebsites).find(
                        ([key, value]) => value && value.device
                    );

                    const siteData = firstWithDevice ? firstWithDevice[1] : null;
                    
                    // This is the object: e.g., { device: 'iOS' } or similar
                    const deviceObj = siteData ? siteData.device : null; 

                    // Adjust 'deviceObj.type' or 'deviceObj.name' if the string lives under a different key
                    const deviceName = deviceObj && typeof deviceObj === 'object' 
                        ? (deviceObj.device || deviceObj.type || "").toLowerCase() : "";

                    if (deviceName) {
                        switch (deviceName) {
                            case 'ios':
                            case 'mac':
                                return <FaApple />;
                            case 'android':
                                return <MdAndroid />;
                            case 'windows':
                                return <FaWindows />;
                            case 'linux':
                                return <FaLinux />;
                            default:
                                return <FaInternetExplorer />;
                        }
                    }
                    return null; // Return null if no device match is found
                })()}</div>

                <div className="email">
                    <MdOutlineEmail className="mail" />
                    <span>{user.email}</span>
                </div>                
                {user.subscription && user.subscription.subDate && (
                    <div className="sub-date">Subscribed {formatDate(user.subscription.subDate)}</div>
                )}
                
                {currentUser && currentUser.email === "kkibetkkoir@gmail.com" && user.visitedWebsites &&
                    Object.values(user.visitedWebsites)
                        .sort((a, b) => (b.lastVisitedAt?.seconds ?? 0) - (a.lastVisitedAt?.seconds ?? 0))
                        .map((site) => (
                            <div key={site.originalUrl} className="sub-date">
                              {site.originalUrl} — {site.lastVisitedAt?.seconds
                                ? new Date(site.lastVisitedAt.seconds * 1000).toLocaleString()
                                : 'unknown'}
                            </div>
                        )
                    )
                } 
                {/*user.visitedWebsites && (
                    <div className="sub-date">
                      {getLastVisitedUrl(user.visitedWebsites)}
                    </div>
                )*/}
            </div>
        </NavLink>
    );
};

export default UserCard;
