import { NavLink } from 'react-router-dom'
import './AlertAction.scss'
import Image from '../../assets/1xbet.jpg';
import { useEffect, useState } from 'react';

export default function AlertAction() {
  const [state, setState] = useState(true);
  useEffect(() => {
      const timer = setTimeout(() => setState(!state), 10000);
      return () => clearTimeout(timer);
  }, [])

  return (
  <div className='alert-action' style={{display: state ? "flex" : "none"}}>
    <img src={Image} />
    <p>Get Upto 200% Bonus</p>
    <NavLink to={"https://refpa4219945.top/L?tag=d_3951731m_1573c_&site=3951731&ad=1573"} target='_blank'>GET NOW</NavLink>
  </div>
  )
}
