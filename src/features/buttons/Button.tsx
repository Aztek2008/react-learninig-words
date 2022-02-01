import styles from './Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  learnIsStarted?: boolean;
  handlerFn?: (event: any) => void;
  title: string;
}

export const Button = (props: ButtonProps) => {
  const { type = 'button', learnIsStarted, handlerFn, title } = props;
  return (
    <button
      type={type}
      className={learnIsStarted ? styles.buttonHide : styles.optionButton}
      onClick={handlerFn}
    >
      {title}
    </button>
  );
};
