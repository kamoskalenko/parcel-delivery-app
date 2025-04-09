import { Link } from 'react-router-dom';
import s from './WelcomePage.module.css';

const WelcomePage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Welcome to Parcels Manager App</h1>
      <p className={s.subtitle}>Manage your parcels delivery easily</p>
      <Link to="/requests" className={s.button}>
        Get Started
      </Link>
    </div>
  );
};

export default WelcomePage;
