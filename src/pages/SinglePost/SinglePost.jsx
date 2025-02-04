import { useEffect, useState } from 'react';
import Image from '../../assets/logo.png';
import NewsItem from '../../components/NewsItem/NewsItem';
import Newsletter from '../../components/Newsletter/Newsletter';
import { useLocation, NavLink } from 'react-router-dom';
import './SinglePost.scss';
import ScrollToTop from '../ScrollToTop';
import AppHelmet from '../AppHelmet';
import { formatDate, readingTime, truncateTitle } from '../../utils/textUtils';
import { getNews, getNewsItem } from '../../firebase';
import { notificationState } from '../../recoil/atoms';
import { useSetRecoilState } from 'recoil';
import Loader from '../../components/Loader/Loader';

export default function SinglePost() {
  const [scroll, setScroll] = useState(0);
  const [loading, setLoading] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  let location = useLocation();
  const [news, setNews] = useState(null);
  const setNotification = useSetRecoilState(notificationState);
  
  useEffect(() => {
    window.onscroll = () => {
      var windowTop = document.documentElement.scrollTop;
      var documentHeight = window.document.body.offsetHeight;//document.documentElement.clientHeight;
      var windowHeight = window.innerHeight;
      setScroll((windowTop / (documentHeight - windowHeight))*100);
    }
    if(location.state) {
      setNews(location.state);
    } else {
      getNewsItem(window.location.pathname.split('/news/')[1], setNews, setLoading);
    }
  }, [location]);


  useEffect(() => {
    news && getNews(3, setRelatedNews, setNotification, news.category);
  }, [news])
  
  return (
    <div className='single-news'>
          <ScrollToTop />
          <div className="scroll-line" style={{width: scroll + '%'}}></div>
          {news && <div className="wrapper">
            <AppHelmet title={news.title}/>
            <img src={news.imageUrl ? news.imageUrl : Image} alt={truncateTitle(news.title, 5)} />
            <h2>{news.title}</h2>
            <h4>
                <NavLink to={`/news?category=${news.category}`} className="category">{news.category}</NavLink>
                <span className="article-pre__aut date">{formatDate(news.timestamp)}</span> 
                <span className="read">{readingTime(news.description)} min read</span>
            </h4>
            <p style={{ whiteSpace: 'pre-wrap' }}>{news.description}</p>
          </div>}
          
          <div className="sidebar">
            <Newsletter />
            {relatedNews.length > 0 &&<h3>Related News:</h3>}
            {relatedNews.length > 0 &&<div className="news-items">
              {relatedNews.filter(doc => doc.id !== news.id).map(news => {
                return <NewsItem key={news.id} data={news}/>
              })}
            </div>}
          </div>

          {loading && <Loader />}
    </div>
  )
}