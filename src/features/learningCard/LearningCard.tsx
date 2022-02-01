import { Button } from 'features/button/Button';
import { IWord } from 'features/inputForm/inputSlice';
import styles from './LearningCard.module.css';

interface ICardProps {
  word: IWord | undefined;
  array: IWord[];
  guessTranslationHandler: (event: any) => void;
}

export const LearningCard = (props: ICardProps) => {
  const { word, array, guessTranslationHandler } = props;

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
