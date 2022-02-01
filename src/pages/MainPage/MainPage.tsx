import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { updateWordsList } from 'features/inputForm/inputSlice';
import { Layout } from 'features/layout/Layout';
import { NavBar } from 'features/navBar/NavBar';
import styles from './MainPage.module.css';
import { wordsMock } from 'helpers/mocks';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const words = useAppSelector((state) => state.wordPairs.words);

  // useEffect(() => {
  //   dispatch(updateWordsList(wordsMock));
  // }, []);

  return (
    <Layout>
      <NavBar />
      <span className={styles.title}>Your learned words: </span>
      {words.map((word) => (
        <li key={word.value} className={styles.listItem}>
          <span className={styles.value}>{word.value}</span>
          <span className={styles.translationValue}>
            {word.translationValue}
          </span>
        </li>
      ))}
    </Layout>
  );
};
