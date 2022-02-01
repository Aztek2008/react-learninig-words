import { useAppSelector } from 'app/hooks';
import { Button } from 'features/buttons/Button';
import { IWord, selectWord } from 'features/inputForm/inputSlice';

import styles from './LearningCard.module.css';

interface ICardProps {
  array: IWord[];
  guessTranslationHandler: (event: string) => void;
}

export const LearningCard = (props: ICardProps) => {
  const { array, guessTranslationHandler } = props;
  const word = useAppSelector(selectWord);

  return (
    <div>
      <p className={styles.learnedWord}>{word?.value}</p>
      <div>
        {array?.map((item) => (
          <Button
            key={item.id}
            handlerFn={() => guessTranslationHandler(item.id)}
            title={item.translationValue}
          />
        ))}
      </div>
    </div>
  );
};
