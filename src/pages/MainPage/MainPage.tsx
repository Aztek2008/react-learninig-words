import { useAppSelector } from 'app/hooks';
import { selectWords } from 'features/inputForm/inputSlice';
import { Layout } from 'features/layout/Layout';
import { NavBar } from 'features/navBar/NavBar';
import styles from './MainPage.module.css';

export const MainPage = () => {
  const words = useAppSelector(selectWords);

  return (
    <Layout>
      <NavBar />
      {words.length ? (
        <span className={styles.title}>Your learned words: </span>
      ) : (
        <span className={styles.title}>You don't have saved words yet</span>
      )}
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
