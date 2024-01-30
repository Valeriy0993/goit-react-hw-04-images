import React from 'react';
import styles from './button.module.css';

const Button = ({ onClick, type = 'button', children }) => {
  return (
    <button onClick={onClick} type={type} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
