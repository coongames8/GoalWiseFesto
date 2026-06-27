import './Topbar.scss';
import { Link } from 'react-router-dom';
import { socialUrls } from '../../data';

export default function Topbar() {
  return (
    <div className="topbar">
      <span className="tagline">Expert football predictions & VIP tips</span>
      <div className="socials">
        {socialUrls.map((social) => (
          <Link to={social.url} title={social.title} target="_blank" rel="noreferrer" key={social.id}>
            {social.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
