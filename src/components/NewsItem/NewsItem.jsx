import { formatDate, readingTime, truncateTitle } from '../../utils/textUtils';
import './NewsItem.scss'
import { NavLink } from 'react-router-dom';

export default function NewsItem({data}) {
  return (
  <div className="news-item">
    <NavLink to={`/news/${data.id.trim().split(' ').join("_")}`}  state={data}>
      <div className="image-container" style={{
        backgroundImage: `url(${data.imageUrl})`
      }}></div>
      <h4>
        <span>{data.category} • </span><span> {formatDate(data.timestamp)}</span> <span className="date"> - {readingTime(data.description)} min read</span>
      </h4>
      <h3>{truncateTitle(data.title, 50)} <span> →</span></h3>
    </NavLink>
  </div>
  )
}