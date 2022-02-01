import styles from './Button.module.css';

export const GoBackButton = () => {
  return (
    <div className={styles.optionButton} onClick={() => window.history.back()}>
      Go to Main
    </div>
  );
};
