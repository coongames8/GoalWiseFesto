import { useEffect, useState } from 'react';
import './Contact.scss';
import ScrollToTop from '../ScrollToTop';
import { notificationState, userState } from '../../recoil/atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { addContact } from '../../firebase';
import AppHelmet from '../AppHelmet';

const Contact = () => {
  const user = useRecoilValue(userState);
  const [notification, setNotification] = useRecoilState(notificationState);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    addContact({name, email, message}, setNotification);
  };
  
  useEffect(() => {
    notification.type === "success" && setTimeout(() => {
      setEmail('');
      setName('');
      setMessage('');
    }, 3000);
  }, [notification]);


  useEffect(() => {
    user && setEmail(user.email)
  }, [user])

    return (
        <div className="contact">
          <ScrollToTop />
          <AppHelmet title={"Contact"}/>
          <h1>Get Connected</h1>
          <h2>Feel free to ask any questions</h2>
          <form onSubmit={handleSubmit}>
              <div>
                <input type="text"  placeholder="NAME"  required value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="email"  placeholder="EMAIL"  required value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <textarea placeholder="MESSAGE" required value={message} onChange={(e) => setMessage(e.target.value)}/>
              <button className='btn' type="submit" >SEND</button>
          </form>

     </div>
    );
}
export default Contact;