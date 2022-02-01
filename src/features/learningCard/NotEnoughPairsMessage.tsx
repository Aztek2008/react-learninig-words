import styles from './LearningCard.module.css';

type MesgProps = {
  missedPairs: number;
};

export const NotEnoughPairsMessage = ({ missedPairs }: MesgProps) => (
  <p className={styles.notEnoughTitle}>
    For better experience please add least {missedPairs} more word pairs to
    dictionary
  </p>
);
