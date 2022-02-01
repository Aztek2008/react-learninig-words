import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NavLink } from 'react-router-dom';
import { Button } from 'features/buttons';
import {
  selectCorrectAnswers,
  selectFinalModal,
  setIsFinishModalOpen,
  setIsReportModalOpen,
  updateWordsList,
} from 'features/inputForm/inputSlice';

import styles from './Modal.module.css';

type modalProps = {
  startLearn: () => void;
};

export const FinishModal = ({ startLearn }: modalProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectFinalModal);
  const correctAnswers = useAppSelector(selectCorrectAnswers);

  const startNewLearn = () => {
    dispatch(updateWordsList([]));
    dispatch(setIsFinishModalOpen(false));
    window.history.back();
  };

  const learnAgainTheSame = () => {
    dispatch(setIsFinishModalOpen(false));
    startLearn();
  };

  const checkResults = () => {
    dispatch(setIsFinishModalOpen(false));
    dispatch(setIsReportModalOpen(true));
  };

  const goHomeButtonProps = {
    handlerFn: startNewLearn,
    title: 'Start New Learn',
  };

  const learnSameAgainButtonProps = {
    handlerFn: learnAgainTheSame,
    title: 'Learn Same Again',
  };

  const checkResultsButtonProps = {
    handlerFn: checkResults,
    title: 'Check Results',
  };

  return (
    <div className={isOpen ? styles.content : styles.isHide}>
      <p>Quizz is finished!</p>
      <br />
      <p>You was correct in {correctAnswers}0% cases</p>
      <br />
      <div className={styles.buttonContainer}>
        <NavLink style={{ textDecoration: 'none' }} to='/'>
          <Button {...goHomeButtonProps} />
        </NavLink>
        <Button {...learnSameAgainButtonProps} />
        <Button {...checkResultsButtonProps} />
      </div>
    </div>
  );
};
