import { useEffect, useState } from 'react'
import Newsletter from '../../components/Newsletter/Newsletter';
import Featured from '../../components/Featured/Featured';
import Slider from '../../components/Slider/Slider';
import './Home.scss';
import Pricing from '../../components/Pricing/Pricing';
import NewsItem from '../../components/NewsItem/NewsItem';
import Testimonials from '../../components/Testimonials/Testimonials';
import Flyer from '../../components/Flyer.jsx/Flyer';
import ScrollToTop from '../ScrollToTop';
import { getNews } from '../../firebase';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '../../recoil/atoms';
import AppHelmet from '../AppHelmet';
import AlertAction from '../../components/AlertAction/AlertAction';

export default function Home() {
  const [news, setNews] = useState([]);

  const setNotification = useSetRecoilState(notificationState);

  useEffect(() => {
    // Call getNews only after the component is fully mounted
    const fetchData = () => {
      getNews(4, setNews, setNotification);
    };

    fetchData(); // Fetch news when component mounts

  }, []); // Empty dependency array ensures it runs only once, after mounting

  return (
    <div className='Home'>
      <ScrollToTop />
      <AppHelmet title={""} />
      <AlertAction />
      <Slider />
      <Featured />
      <Pricing />
      {news.length > 0 && <>
        <h1>News Feed</h1>
        <h2>Explore Popular Posts 🔥</h2>
        <div className='post-container'>
          {news.map((blog) => <NewsItem key={blog.id} data={blog} />)}
        </div>
      </>}
      <Flyer />
      <h1>Testimonials</h1>
      <h2>What clients say</h2>
      <Testimonials />
      <Newsletter />
    </div>
  )
}
