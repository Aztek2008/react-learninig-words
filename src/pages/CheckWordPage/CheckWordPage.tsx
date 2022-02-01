import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout } from 'features/layout';
import { Button } from 'features/buttons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FinishModal, ReportModal } from 'features/modal';
import { selectWords } from 'features/inputForm/inputSlice';
import { randomItemsPicker } from 'helpers/randomItemsPicker';
import { LearningCard, NotEnoughPairsMessage } from 'features/learningCard';
import {
  ICheck,
  setWordToLearn,
  updateChecksList,
  setIsFinishModalOpen,
  setIsLearnStarted,
  selectLearnStarted,
  selectWord,
  selectCorrectAnswers,
  setCorrectAnswers,
  selectWordsToLearn,
  setWordsToLearn,
  selectSuggestedFour,
  setSuggestedFour,
} from 'features/inputForm/inputSlice';

import linkStyles from 'features/buttons/Button.module.css';

export const CheckWordPage = () => {
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectWords);
  const theWord = useAppSelector(selectWord);
  const wordsToLearn = useAppSelector(selectWordsToLearn);
  const isLearnStarted = useAppSelector(selectLearnStarted);
  const correctAnswers = useAppSelector(selectCorrectAnswers);
  const suggestedFour = useAppSelector(selectSuggestedFour);

  const minPairs = 10;
  const missedPairs = minPairs - words.length;

  useEffect(() => {
    let idx = Math.round(Math.random() * wordsToLearn.length - 1);
    const choosenWord = wordsToLearn[idx];
    dispatch(setWordToLearn(choosenWord));

    if (isLearnStarted && !wordsToLearn.length) {
      dispatch(setIsLearnStarted(false));
      dispatch(setIsFinishModalOpen(true));
    }

    dispatch(setWordToLearn(idx >= 0 ? choosenWord : wordsToLearn[0]));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordsToLearn]);

  useEffect(() => {
    theWord && chooseNewValuesSet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theWord]);

  const chooseNewValuesSet = () => {
    let translationValues = randomItemsPicker(words, 4, theWord);
    dispatch(setSuggestedFour(translationValues));
  };

  const guessTranslationHandler = (event: string) => {
    const optionId = event;
    const checkedWord: ICheck = {
      ...theWord,
      isCorrect: theWord?.id === optionId,
    };

    dispatch(updateChecksList(checkedWord));

    if (optionId === theWord?.id) {
      dispatch(setCorrectAnswers(correctAnswers + 1));
      deleteLearnedWord(optionId);
      return console.log('Correcto!');
    } else {
      deleteLearnedWord(optionId);
      return console.log('Wrong answer!');
    }
  };

  const deleteLearnedWord = (itemId: string) => {
    const newSetForLearning = wordsToLearn.filter((item) => item.id !== itemId);
    dispatch(setWordsToLearn(newSetForLearning));
  };

  const startLearn = () => {
    const choosenWords = randomItemsPicker(words, 10);
    dispatch(setWordsToLearn(choosenWords));
    dispatch(setIsLearnStarted(true));
  };

  const learningCardProps = {
    array: suggestedFour,
    guessTranslationHandler,
  };

  const buttonProps = {
    isLearnStarted,
    handlerFn: startLearn,
    title: 'Ready?',
  };

  return (
    <Layout>
      {words.length < minPairs ? (
        <Layout>
          <NotEnoughPairsMessage missedPairs={missedPairs} />
          <NavLink className={linkStyles.optionButton} to='/add'>
            Go add words
          </NavLink>
        </Layout>
      ) : (
        <Button {...buttonProps} />
      )}
      {theWord?.translationValue.length && suggestedFour.length && (
        <LearningCard {...learningCardProps} />
      )}
      <FinishModal startLearn={startLearn} />
      <ReportModal startLearn={startLearn} />
    </Layout>
  );
};
