import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
// import { wordsMock } from 'helpers/mocks';

export interface IWord {
  id: string;
  value: string;
  translationValue: string;
}

export interface IWordsState {
  word: IWord | null;
  words: IWord[];
}

const initialState: IWordsState = {
  word: null,
  words: [], // wordsMock,
};

export const counterSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    chooseWord: (state, action: PayloadAction<IWord>) => ({
      ...state,
      word: action.payload,
    }),
    updateWordsList: (state, action: PayloadAction<IWord[]>) => ({
      ...state,
      words: action.payload,
    }),
  },
});

export const { chooseWord, updateWordsList } = counterSlice.actions;

export const selectWord = (state: RootState) => state.wordPairs.word;
export const selectWords = (state: RootState) => state.wordPairs.words;

export default counterSlice.reducer;
