import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import s from './Header.module.css';
import MainButton from '../../components/MainButton/MainButton';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const openAddModal = () => {
    navigate('/requests/new', { state: { backgroundLocation: location } });
  };

  return (
    <header className={s.header}>
      <div className={s.left}>
        <Link to="/" className={s.logoLink}>
          <div className={s.logoContainer}>
            <img src="/logo.svg" alt="Logo" className={s.logo} />
          </div>
        </Link>
        <span className={s.headerText}>Welcome to your delivery requests</span>
      </div>
      <div className={s.right}>
        <MainButton onClick={openAddModal} className={s.addButton}>
          Create Request
        </MainButton>
      </div>
    </header>
  );
};

export default Header;
