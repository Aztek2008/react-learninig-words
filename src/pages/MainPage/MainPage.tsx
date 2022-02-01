import { useAppSelector } from 'app/hooks';
import { Layout } from 'features/layout/Layout';
import { NavBar } from 'features/navBar/NavBar';
import styles from './MainPage.module.css';

export const MainPage = () => {
  const words = useAppSelector((state) => state.wordPairs.words);

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
