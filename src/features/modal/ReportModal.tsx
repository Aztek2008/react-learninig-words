import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Button } from 'features/buttons/Button';
import { NavLink } from 'react-router-dom';
import {
  selectChecks,
  selectResultModal,
  setIsReportModalOpen,
  updateWordsList,
} from 'features/inputForm/inputSlice';

import styles from './Modal.module.css';

type modalProps = {
  startLearn: () => void;
};

export const ReportModal = ({ startLearn }: modalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectResultModal);
  const checks = useAppSelector(selectChecks);

  const startNewLearn = () => {
    dispatch(updateWordsList([]));
    dispatch(setIsReportModalOpen(false));
  };

  const learnAgainTheSame = () => {
    dispatch(setIsReportModalOpen(false));
    startLearn();
  };

  const goHomeButtonProps = {
    handlerFn: startNewLearn,
    title: 'Start New Learn',
  };

  const learnSameAgainButtonProps = {
    handlerFn: learnAgainTheSame,
    title: 'Learn Same Again',
  };

  return (
    <div className={isOpen ? styles.content : styles.isHide}>
      <p>Check your attempts!</p>
      <br />
      <ul className={styles.reportList}>
        {checks.map((check) => (
          <li key={check.id} className={styles.itemText}>
            For <b>{check.value}</b> you guess <b>{check.translationValue}</b>,
            this is
            {check.isCorrect ? (
              <span className={styles.correct}> correct</span>
            ) : (
              <span className={styles.wrong}> wrong</span>
            )}
          </li>
        ))}
      </ul>
      <br />
      <div className={styles.buttonContainer}>
        <NavLink style={{ textDecoration: 'none' }} to='/'>
          <Button {...goHomeButtonProps} />
        </NavLink>
        <Button {...learnSameAgainButtonProps} />
      </div>
    </div>
  );
};
