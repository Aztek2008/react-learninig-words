import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { wordsMock } from 'helpers/mocks';

export interface IWord {
  id: number;
  value: string;
  translationValue: string;
}

export interface IWordsState {
  word: IWord | null;
  words: IWord[];
}

const initialState: IWordsState = {
  word: null,
  words: wordsMock,
};

export const counterSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    chooseWord: (state, action) => ({
      ...state,
      word: action.payload,
    }),
    updateWordsList: (state, action) => ({
      ...state,
      words: action.payload,
    }),
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { chooseWord, updateWordsList } = counterSlice.actions;

export const selectWord = (state: RootState) => state.wordPairs.word;
export const selectWords = (state: RootState) => state.wordPairs.words;

export default counterSlice.reducer;
