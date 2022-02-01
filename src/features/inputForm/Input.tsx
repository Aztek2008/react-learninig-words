import { FormEvent } from 'react';
import styles from './InputForm.module.css';

interface IInputProps {
  placeholder: string;
  name: string;
  value: string;
  onChange: (event: FormEvent<EventTarget>) => void;
}

export const Input = (props: IInputProps) => {
  const { placeholder, name, value, onChange } = props;
  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      name={name}
      value={value}
      type='text'
      onChange={onChange}
    />
  );
};
