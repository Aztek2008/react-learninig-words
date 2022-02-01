import styles from './LearningCard.module.css';

type MesgProps = {
  missedPairs: number;
};

export const NotEnoughPairsMessage = ({ missedPairs }: MesgProps) => (
  <p className={styles.notEnoughTitle}>
    For better experience please add at least {missedPairs} more word pairs to
    dictionary
  </p>
);
