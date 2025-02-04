import { useEffect, useState } from 'react';
import './News.scss';
import NewsItem from '../../components/NewsItem/NewsItem';
import ScrollToTop from '../ScrollToTop';
import { fetchData} from '../../firebase';
import Loader from '../../components/Loader/Loader';
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import AppHelmet from '../AppHelmet';
import { notificationState } from '../../recoil/atoms';
import { useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';

export default function News() {
  const [data, setData] = useState([]);
  const [lastDoc, setLastDoc] = useState(null); // To keep track of the last document
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // To check if more data exists
  const setNotification = useSetRecoilState(notificationState);
  const [category, setCategory] = useState('');
  const location = useLocation();

  // Fetch data when component mounts or category changes
  useEffect(() => {
    fetchData(loading, null, setData, setLastDoc, setHasMore, setLoading, setNotification, category);
  }, [category]);

  // Update category when URL changes
  useEffect(() => {
    const newCategory = new URLSearchParams(location.search).get('category');
    setCategory(newCategory || ''); // Use empty string if no category is provided
  }, [location.search]);

  // Load more data
  const loadMore = () => {
    if (hasMore && !loading) {
      fetchData(loading, lastDoc, setData, setLastDoc, setHasMore, setLoading, setNotification, category);
    }
  };

  return (
    <div className="news">
      <ScrollToTop />
      <AppHelmet title={"News"}/>
      {!loading &&
      <div className="banner">
        <h1>Explore Juiciest News</h1>
      </div>}
      <div className="post-container">
        {loading && <Loader />}
        {!loading && data.length > 0 && data.map((blog) => <NewsItem key={blog.id + data[blog]} data={blog} />)}
        {!loading && data.length === 0 && <h1>Nothing Here!</h1>}
      </div>
      {hasMore && !loading &&
      <div className="pagination">
        <ul>
          <li className='btn-prev'><IoArrowBack /> <span>prev</span></li>
          <li className="numb active" onClick={loadMore}><span>1</span></li>
          <li className="numb"><span>2</span></li>
          <li className="numb"><span>3</span></li>
          <li className="dots"><span>...</span></li>
          <li className="numb"><span>8</span></li>
          <li className="numb"><span>9</span></li>
          {hasMore && <li className='btn-next'><span>next</span><IoArrowForward /></li>}
        </ul>
      </div>}
      {loading && <Loader />}
    </div>
  );
}
