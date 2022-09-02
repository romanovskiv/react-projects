import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className="container">
      <div className={styles.root}>
        <h1>
          <span>😕</span>
          <br />
          Ничего не найдено
        </h1>
        <p className={styles.descripton}>К сожалению такой страницы нет</p>
      </div>{' '}
    </div>
  );
};

export default NotFoundBlock;
