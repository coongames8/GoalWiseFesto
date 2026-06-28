import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import TipCard from '../TipCard/TipCard';
import './Tips.scss';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppHelmet from '../../pages/AppHelmet';
import ScrollToTop from '../../pages/ScrollToTop';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms';
import Loader from '../Loader/Loader';
import { getTips } from '../../firebase';

const ADMIN_EMAILS = ['kkibetkkoir@gmail.com', 'charleykibet254@gmail.com', 'coongames8@gmail.com'];

const GAME_TYPES = [
  { value: 'ALL', label: 'All Games' },
  { value: '1X2', label: 'WDW (1X2)' },
  { value: 'CS', label: 'Goals (CS)' },
  { value: 'GG', label: 'GG/NG' },
  { value: 'OV_UN', label: 'OV/UN' },
];

const SLOT_LABELS = {
  Morning: 'Morning (12AM - 6AM)',
  Afternoon: 'Afternoon (6AM - 12PM)',
  Evening: 'Evening (12PM - 6PM)',
  Night: 'Night (6PM - 12AM)',
};

export default function Tips() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [firstIcon, setFirstIcon] = useState('flex');
  const [lastIcon, setLastIcon] = useState('flex');

  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [user, setUser] = useRecoilState(userState);
  const [isAdmin, setAdmin] = useState(false);
  const [filteredTips, setFilteredTips] = useState(null);
  const [gamesType, setGamesType] = useState('ALL');
  const [tips, setTips] = useState(null);

  const tabBoxRef = useRef(null);

  const handleIcons = () => {
    if (!tabBoxRef.current) return;
    const scrollVal = Math.round(tabBoxRef.current.scrollLeft);
    const maxScrollableWidth = tabBoxRef.current.scrollWidth - tabBoxRef.current.clientWidth;
    setFirstIcon(scrollVal >= 1 ? 'flex' : 'none');
    setLastIcon(maxScrollableWidth > scrollVal + 1 ? 'flex' : 'none');
  };

  const handleClick = (direction) => {
    if (!tabBoxRef.current) return;
    tabBoxRef.current.scrollLeft += direction === 'left' ? -350 : 350;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const returnDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return 'Invalid Date';

    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return isToday ? `${weekday}, Today` : `${weekday} ${monthDay}`;
  };

  useEffect(() => {
    const tabBox = tabBoxRef.current;
    if (!tabBox) return;

    const mouseDownHandler = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - tabBox.offsetLeft);
      setScrollLeft(tabBox.scrollLeft);
    };

    const mouseMoveHandler = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - tabBox.offsetLeft;
      const walk = (x - startX) * 5;
      tabBox.scrollLeft = scrollLeft - walk;
    };

    const mouseUpHandler = () => setIsDragging(false);

    tabBox.addEventListener('mousedown', mouseDownHandler);
    tabBox.addEventListener('mousemove', mouseMoveHandler);
    tabBox.addEventListener('mouseup', mouseUpHandler);
    tabBox.addEventListener('mouseleave', mouseUpHandler);
    tabBox.addEventListener('scroll', handleIcons);

    return () => {
      tabBox.removeEventListener('mousedown', mouseDownHandler);
      tabBox.removeEventListener('mousemove', mouseMoveHandler);
      tabBox.removeEventListener('mouseup', mouseUpHandler);
      tabBox.removeEventListener('mouseleave', mouseUpHandler);
      tabBox.removeEventListener('scroll', handleIcons);
    };
  }, [isDragging, startX, scrollLeft]);

  useEffect(() => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      dates.push(`${year}-${month}-${day}`);
    }
    setDays(dates.reverse());
  }, []);

  useEffect(() => {
    if (days) setCurrentDate(days[days.length - 1]);
  }, [days]);

  useEffect(() => {
    if (!tabBoxRef.current) return;
    const tabBox = tabBoxRef.current;
    tabBox.scrollLeft = tabBox.scrollWidth - tabBox.clientWidth;
    handleIcons();
  }, [days]);

  useEffect(() => {
    if (currentDate) getTips(setTips, setLoading, formatDate(currentDate));
  }, [currentDate]);

  useEffect(() => {
    if (tips === null) return;
    const grouped = tips.reduce((acc, item) => {
      const [hours] = item.time.split(':').map(Number);
      let slot = 'Night';
      if (hours >= 0 && hours < 6) slot = 'Morning';
      else if (hours < 12) slot = 'Afternoon';
      else if (hours < 18) slot = 'Evening';
      (acc[slot] = acc[slot] || []).push(item);
      return acc;
    }, {});

    const result = Object.keys(grouped)
      .map((slot) => ({ timeSlot: slot, items: grouped[slot] }))
      .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));

    setFilteredTips(result);
  }, [tips]);

  useEffect(() => {
    setAdmin(Boolean(user && ADMIN_EMAILS.includes(user.email)));
  }, [user]);

  const filterByType = (items) =>
    items.filter((doc) => gamesType === 'ALL' || doc.type === gamesType);

  return (
    <div className="tips">
      <AppHelmet title="Tips" />
      <ScrollToTop />

      <div className="date-wrapper">
        <div className="icon left" style={{ display: firstIcon }} onClick={() => handleClick('left')}>
          <MdArrowBackIos />
        </div>
        <ul className={`tabs-box ${isDragging ? 'dragging' : ''}`} ref={tabBoxRef}>
          {days &&
            days.map((day) => {
              const parts = returnDate(day).split(' ');
              return (
                <li
                  className={`tab ${currentDate === day ? 'active' : ''}`}
                  onClick={() => setCurrentDate(day)}
                  key={day}
                >
                  <span className="weekday">{parts[0]}</span>
                  <span className="date">{parts[1]} {parts[2] || ''}</span>
                </li>
              );
            })}
        </ul>
        <div className="icon right" style={{ display: lastIcon }} onClick={() => handleClick('right')}>
          <MdArrowForwardIos />
        </div>
      </div>

      <NavLink to="pricing" className="subscribe-btn">
        Subscribe to view all tips
      </NavLink>

      <form className="type">
        {GAME_TYPES.map((gt) => (
          <fieldset key={gt.value}>
            <input
              name="games-type"
              type="radio"
              value={gt.value}
              id={gt.value}
              checked={gamesType === gt.value}
              onChange={(e) => setGamesType(e.target.value)}
            />
            <label htmlFor={gt.value}>{gt.label}</label>
          </fieldset>
        ))}
      </form>

      {loading && <Loader />}

      {!loading && filteredTips && (
        <div className="tips-groups">
          {filteredTips.map((filteredTip) => {
            const visible = filterByType(filteredTip.items);
            if (visible.length === 0) return null;
            return (
              <div className="group" key={filteredTip.timeSlot}>
                <h2 className="group-title">{SLOT_LABELS[filteredTip.timeSlot]}</h2>
                <div className="group-items">
                  {visible.map((tip, index) => (
                    <TipCard
                      key={index}
                      tip={tip}
                      isAdmin={isAdmin}
                      today={formatDate(days[days.length - 1])}
                    />
                  ))}
                </div>
              </div>
            );
          })}
          {filteredTips.every((g) => filterByType(g.items).length === 0) && (
            <p className="empty-state">No tips available for this date.</p>
          )}
        </div>
      )}
    </div>
  );
}
