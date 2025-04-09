import React from 'react';
import s from './LogoComponent.module.css';

const LogoComponent = () => {
  return (
    <div>
      <img
        src="/src/assets/logo.svg"
        alt="Box Icon"
        className={s.boxIcon}
        width={100}
        height={100}
      />
    </div>
  );
};

export default LogoComponent;
