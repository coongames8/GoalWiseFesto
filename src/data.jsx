import { IoLogoFacebook, IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";
import Image1 from './assets/10.jpg';
import Image2 from './assets/3.jpg';
import Image3 from './assets/4.jpg';
import { FaTelegram} from "react-icons/fa";
import {PiXLogo} from "react-icons/pi";

export const pricings = [
  {
    id: "1",
    plan: "Basic",
    billing: "Day",
    title: "Daily insights for casual fans",
    price: 7,
    features: [
      "Daily match predictions",
      "Limited league coverage",
      "5-10 odds",
    ],
    color: "#2196f3",
  },
  {
    id: "2",
    plan: "Standard",
    billing: "Day",
    title: "Comprehensive daily insights",
    price: 10,
    features: [
      "All Basic features +",
      "Expanded league coverage",
      "10-20 odds",
    ],
    color: "#3498db",
  },
  {
    id: "3",
    plan: "Pro", //Pro, Ultimate, Elite, Platinum
    billing: "Day",
    title: "Full access to daily predictions",
    price: 20,
    features: [
      "All Advanced features +",
      "Fixed Correct Score",
      "20+ odd",
    ],
    color: "#1f4568",
  },
  {
    id: "4",
    plan: "Basic",
    billing: "Week",
    title: "Weekly predictions for dedicated fans",
    price: 25,
    features: [
      "5 days Tips",
      "5+ odds per day",
      "Priority Customer Support",
    ],
    color: "#2196f3",
  },
  {
    id: "5",
    plan: "Standard",
    billing: "Week",
    title: "Enhanced weekly insights and stats",
    price: 40,
    features: [
      "All Standard Weekly features +",
      "20+ odds per day",
      "6 Days Tips",
    ],
    color: "#3498db",
  },
  {
    id: "6",
    plan: "Pro",
    billing: "Week",
    title: "Exclusive weekly access to expert insights",
    price: 60,
    features: [
      "All Pro Weekly features +",
      "7 Days Tips",
      "VIP Correct Score",
    ],
    color: "#1f4568",
  }
];

export const faqs = [
  {
    id: 1,
    question: "What is the accuracy of your football predictions?",
    answer: "Our predictions are based on a combination of historical data, expert analysis, and advanced algorithms. While no prediction is 100% guaranteed, we strive to provide highly accurate and data-driven insights to help you make informed decisions."
  },
  {
    id: 2,
    question: "How can I subscribe to your services?",
    answer: "You can easily subscribe through our website. We offer several tiered subscription plans that suit different needs, from basic insights to premium, detailed predictions. Simply choose your plan and proceed with payment through secure method we have provided."
  },
  {
    id: 3,
    question: "Can I cancel or change my subscription?",
    answer: "No, you cannot terminate your subscription. Make sure to be certain about making a subscription so that you will not be charged against your will."
  },
  {
    id: 4,
    question: "What kind of football matches do you provide predictions for?",
    answer: "We provide predictions for major leagues, international tournaments, and high-profile football matches. This includes competitions like the Premier League, La Liga, Serie A, Champions League, World Cup, and more."
  },
  {
    id: 6,
    question: "How do you calculate your predictions?",
    answer: "Our predictions are based on a combination of factors, including team performance, player statistics, historical match data, and even current form. We also incorporate machine learning models to continuously improve the accuracy of our predictions."
  },
  {
    id: 7,
    question: "Can I trust your predictions for betting?",
    answer: "While our predictions are based on solid data and analysis, betting should always be done responsibly, and we cannot be held accountable for any losses."
  },
  {
    id: 8,
    question: "Do you provide live updates during matches?",
    answer: "Yes, we offer live updates during key matches. These updates provide additional insights, such as in-game performance metrics, injury reports, and tactical changes that may affect match outcomes."
  },
  {
    id: 9,
    question: "What is the best subscription plan for me?",
    answer: "It depends on your needs. Our basic plan offers essential predictions, while our premium plans provide more detailed analysis, advanced stats, and expert insights. Review the plans and choose the one that best fits your level of interest."
  },
  {
    id: 10,
    question: "How secure is my payment information?",
    answer: "We take security seriously. All payment transactions are processed through secure, encrypted payment gateway. Your payment information is never stored on our servers."
  }
];

export const featured = [
  {
    emoji: "🤝",
    title: "100% Guaranteed"
  },
  {
    emoji: "🏆",
    title: "Expert Analysis"
  },
  {
    emoji: "🚀",
    title: "Live Updates"
  },
  {
    emoji: "✅",
    title: "Secure Payments"
  }
]

export const socialUrls = [
  { id: 1, icon: <IoLogoFacebook />, url: "https://www.facebook.com/profile.php?id=61570224237201", title: "Facebook" },
  { id: 2, icon: <FaTelegram />, url: "https://t.me/bet365gurus", title: "Telegram" },
  { id: 3, icon: <IoLogoWhatsapp />, url: "https://whatsapp.com/channel/0029VayjRf71t90afonqcy0b", title: "WhatsApp" },
  { id: 4, icon: <PiXLogo />, url: "https://x.com/goalgeniusvip", title: "X(Twitter)" },
  { id: 5, icon: <IoLogoInstagram />, url: "https://instagram.com/goalgenius.vip", title: "Instagram" },
];

export const slides = [
  {
    id: 1,
    img: Image1,
    title: "Expert Football Predictions for Major Leagues",
    link: "/tips"
  },
  {
    id: 2,
    img: Image2,
    title: "Subscribe To Detailed and Real-Time Match Predictions and Insights",
    link: "/pricing"
  },
  {
    id: 3,
    img: Image3,
    title: "Stay Updated with the Latest Football News and Trends",
    link: "/news"
  },
]

export const testimonials = [
  {
    id: 1,
    name: "James Smith",
    title: "Starter Plan",
    description: "The predictions helped me make smarter decisions. Great for casual bettors like me!"
  },
  {
    id: 2,
    name: "Tommy Lee",
    title: "Premium Plan",
    description: "The expert analysis and detailed stats are game-changers. Highly recommend the Premium plan!"
  },
  {
    id: 3,
    name: "Alicia Brown",
    title: "Platinum Plan",
    description: "As a serious football fan, the Platinum plan provides unmatched predictions!"
  },
  {
    id: 4,
    name: "Mark Johnson",
    title: "Premium Plan",
    description: "The real-time updates and in-depth stats are fantastic. Helped me stay ahead of the game!"
  },
  {
    id: 5,
    name: "Sarah Jane",
    title: "Platinum Plan",
    description: "Worth every penny! The predictions are accurate, and the insights are top-notch."
  }
]