import { IWord } from 'features/inputForm/inputSlice';

export const randomItemsPicker = (
  array: IWord[],
  num: number = 1,
  choosed?: IWord
) => {
  const result: IWord[] = [];

  if (choosed) {
    result.push(choosed);
  }

  while (result.length < num) {
    let idx = Math.round(Math.random() * num);
    let item = array[idx];
    const itemExisted = result.indexOf(item) !== -1;

    if (!itemExisted) {
      result.push(item);
    }
  }

  return result;
};
