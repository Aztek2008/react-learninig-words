import { FormEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { updateWordsList } from './inputSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Input } from 'features/inputForm/Input';
import { Button } from 'features/buttons';
import { v4 as uuidv4 } from 'uuid';

import styles from 'features/inputForm/InputForm.module.css';
import linkStyles from 'features/buttons/Button.module.css';

export const InputForm = () => {
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

    if (name === 'textTranslationValue' && value.trim()) {
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
      textValue.trim().length <= 0 ||
      textTranslationValue.trim().length <= 0
    ) {
      console.log('You forget to input text');
      return;
    }

    const existedWord = words.filter((word) => word.value === textValue);

    if (existedWord.length) {
      console.log('This word already exists, try again');
      wipeInputs();
      return;
    }

    const configuredPair = {
      id: uuidv4(),
      value: textValue,
      translationValue: textTranslationValue,
    };

    const updatedWords = [...words, configuredPair];

    dispatch(updateWordsList(updatedWords));
    wipeInputs();
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.formContainer} onSubmit={submitHandler}>
        <Input
          placeholder='Write your word here...'
          name='textValue'
          value={textValue}
          onChange={handleInputChange}
        />

        <Input
          placeholder='Translate your word...'
          name='textTranslationValue'
          value={textTranslationValue}
          onChange={handleInputChange}
        />

        <Button type='submit' title={'Save it'} />
        <NavLink className={linkStyles.optionButton} to='/check'>
          Learn it
        </NavLink>
        <NavLink className={linkStyles.optionButton} to='/'>
          Go to Main
        </NavLink>
      </form>
    </div>
  );
};
