import styles from './Button.module.css';

interface ButtonProps {
  learnIsStarted?: boolean;
  handlerFn: (event: any) => void;
  title: string;
}

export const Button = (props: ButtonProps) => {
  const { learnIsStarted, handlerFn, title } = props;
  return (
    <button
      className={learnIsStarted ? styles.buttonHide : styles.optionButton}
      onClick={handlerFn}
    >
      {title}
    </button>
  );
};
