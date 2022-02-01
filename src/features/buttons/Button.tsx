import styles from './Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  isLearnStarted?: boolean;
  handlerFn?: (event: any) => void;
  title: string;
}

export const Button = (props: ButtonProps) => {
  const { type = 'button', isLearnStarted, handlerFn, title } = props;
  return (
    <button
      type={type}
      className={isLearnStarted ? styles.buttonHide : styles.optionButton}
      onClick={handlerFn}
    >
      {title}
    </button>
  );
};
