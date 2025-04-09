import React from 'react';
import s from './MainButton.module.css';
import classNames from 'classnames';

const MainButton = ({ children, onClick, className, style, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(s.button, className)}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default MainButton;
