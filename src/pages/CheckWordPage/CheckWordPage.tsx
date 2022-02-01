import { useEffect, useState } from 'react';
import { useAppSelector } from 'app/hooks';
import { Layout } from 'features/layout/Layout';
import { IWord } from 'features/inputForm/inputSlice';
import { randomItemsPicker } from 'helpers/randomItemsPicker';
import { LearningCard } from 'features/learningCard/LearningCard';
import { NotEnoughPairsMessage } from 'features/learningCard/NotEnoughPairsMessage';
import { Button } from 'features/button/Button';
import { Modal } from 'features/modal/Modal';

export const CheckWordPage = () => {
  const words = useAppSelector((state) => state.wordPairs.words);

  const [isEnoughWords, setIsEnoughWords] = useState(false);
  const [learnIsStarted, setLearnIsStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wordsToLearn, setWordsToLearn] = useState<IWord[]>([]);
  const [suggestedFour, setSuggestedFour] = useState<IWord[]>([]);
  const [wordToLearn, setWordToLearn] = useState<IWord>();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const missedPairs = 10 - words.length;

  useEffect(() => {
    if (words.length >= 10) {
      setIsEnoughWords(true);
    }

    return () => {
      setIsEnoughWords(false);
      setLearnIsStarted(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let idx = Math.round(Math.random() * wordsToLearn.length);
    const choosenWord = wordsToLearn[idx];

    if (learnIsStarted && !wordsToLearn.length) {
      setLearnIsStarted(false);
      setIsModalOpen(true);
    }

    setTimeout(() => {
      setWordToLearn(choosenWord);
    }, 300);
    // setWordToLearn(choosenWord); // SET&SAVE 1 WORD FROM 10 CHOOSED
  }, [wordsToLearn]);

  useEffect(() => {
    wordToLearn !== undefined && chooseNewValuesSet();
  }, [wordToLearn]);

  const chooseNewValuesSet = () => {
    let translationValues = randomItemsPicker(words, 4, wordToLearn);
    setSuggestedFour(translationValues);
  };

  const guessTranslationHandler = (event: number) => {
    const optionId = event;

    if (optionId === wordToLearn?.id) {
      setCorrectAnswers((prev) => prev + 1);
      deleteLearnedWord(optionId);
      return console.log('Correcto!');
    } else {
      deleteLearnedWord(optionId);
      return console.log('Wrong answer!');
    }
  };

  const deleteLearnedWord = (itemId: number) => {
    const newSetForLearning = wordsToLearn.filter((item) => item.id !== itemId);
    setWordsToLearn(newSetForLearning);
  };

  const startLearn = () => {
    const choosenWords = randomItemsPicker(words, 10);
    setWordsToLearn(choosenWords);
    setLearnIsStarted(true);
  };

  const learningCardProps = {
    word: wordToLearn,
    array: suggestedFour,
    guessTranslationHandler,
  };

  const buttonProps = {
    learnIsStarted,
    handlerFn: startLearn,
    title: 'Ready?',
  };

  return (
    <Layout>
      {!isEnoughWords ? (
        <NotEnoughPairsMessage missedPairs={missedPairs} />
      ) : (
        <Button {...buttonProps} />
      )}
      {wordToLearn?.translationValue.length && suggestedFour.length && (
        <LearningCard {...learningCardProps} />
      )}
      <Modal
        isOpen={isModalOpen}
        stats={correctAnswers * 10}
        startLearn={startLearn}
        setIsOpen={setIsModalOpen}
      />
    </Layout>
  );
};
