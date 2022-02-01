import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import styles from './InputForm.module.css';
import { updateWordsList } from './inputSlice';
import svg from 'assets/icons/free-icon-angle-left-3916912.svg';

export const InputForm = () => {
  const history = window.history;
  const [textValue, setTextValue] = useState<string>('');
  const [textTranslationValue, setTextTranslationValue] = useState<string>('');
  const words = useAppSelector((state) => state.wordPairs.words);
  const dispatch = useAppDispatch();

  const handleInputChange = (event: FormEvent<EventTarget>) => {
    event.preventDefault();
    const { value, name } = event.target as HTMLInputElement;

    if (name === 'textValue' && value.trim()) {
      setTextValue(value);
    }

    if (name === 'textTranslationValue') {
      setTextTranslationValue(value);
    }
  };

  const wipeInputs = () => {
    setTextValue('');
    setTextTranslationValue('');
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      textValue.trim().length <= 0 &&
      textTranslationValue.trim().length <= 0
    ) {
      console.log('You did not enter anything');
      return;
    }

    const existedWord = words.filter((word) => word.value === textValue);
    console.log('existedWord', existedWord);

    if (existedWord.length) {
      console.log('This word already exists, try again');
      wipeInputs();
      return;
    }

    const configuredPair = {
      value: textValue,
      translationValue: textTranslationValue,
    };

    const updatedWords = [...words, configuredPair];

    dispatch(updateWordsList(updatedWords));
    wipeInputs();
  };

  return (
    <form className={styles.formContainer} onSubmit={submitHandler}>
      <button className={styles.backButton} onClick={() => history.back()}>
        <img src={svg} alt='Go back to main page'></img>
      </button>
      <input
        className={styles.input}
        placeholder='Write your word here...'
        name='textValue'
        value={textValue}
        type='text'
        onChange={handleInputChange}
      />

      <input
        className={styles.input}
        placeholder='Translate your word...'
        name='textTranslationValue'
        type='text'
        value={textTranslationValue}
        onChange={handleInputChange}
      />

      <button className={styles.button} type='submit'>
        Save it
      </button>
    </form>
  );
};
