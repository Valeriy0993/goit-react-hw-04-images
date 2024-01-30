import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import styles from './loader.module.css';

const Loader = () => (
  <div className={styles.loaderContainer}>
    <div className={styles.loader}>
      <RotatingLines
        height={80}
        width={80}
        radius={9}
        color="green"
        ariaLabel="loading"
      />
    </div>
  </div>
);

export default Loader;
