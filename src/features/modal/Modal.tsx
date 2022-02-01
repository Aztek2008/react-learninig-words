import { useAppDispatch } from 'app/hooks';
import { Button } from 'features/buttons/Button';
import { updateWordsList } from 'features/inputForm/inputSlice';
import styles from './Modal.module.css';

type modalProps = {
  stats: number;
  isOpen: boolean;
  startLearn: () => void;
  setIsOpen: (arg0: boolean) => void;
};

export const Modal = ({ stats, isOpen, startLearn, setIsOpen }: modalProps) => {
  const dispatch = useAppDispatch();
  const startNewLearn = () => {
    dispatch(updateWordsList([]));
    setIsOpen(false);
    window.history.back();
  };

  const learnAgainTheSame = () => {
    setIsOpen(false);
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
      <p>Quizz is finished!</p>
      <br />
      <p>You was correct in {stats}% cases</p>
      <br />
      <div className={styles.buttonContainer}>
        <Button {...goHomeButtonProps} />
        <Button {...learnSameAgainButtonProps} />
      </div>
    </div>
  );
};
