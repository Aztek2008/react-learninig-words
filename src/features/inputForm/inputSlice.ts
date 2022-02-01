import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { wordsMock } from 'helpers/mocks';

export interface IWord {
  id: string;
  value: string;
  translationValue: string;
}

export interface ICheck {
  id?: string | undefined;
  value?: string | undefined;
  translationValue?: string | undefined;
  isCorrect: boolean | undefined;
}

export interface IWordsState {
  words: IWord[];
  checks: ICheck[];
  wordsToLearn: IWord[];
  suggestedFour: IWord[];
  word: IWord | undefined;
  isFinishModalOpen: boolean;
  isReportModalOpen: boolean;
  isLearnStarted: boolean;
  correctAnswers: number;
}

const initialState: IWordsState = {
  words: wordsMock, // REPLACE MOCK WITH [] TO ADD WORDS BY HANDS
  checks: [],
  wordsToLearn: [],
  suggestedFour: [],
  word: undefined,
  isFinishModalOpen: false,
  isReportModalOpen: false,
  isLearnStarted: false,
  correctAnswers: 0,
};

export const counterSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWordToLearn: (state, action: PayloadAction<IWord>) => ({
      ...state,
      word: action.payload,
    }),
    updateWordsList: (state, action: PayloadAction<IWord[]>) => ({
      ...state,
      words: action.payload,
    }),
    setWordsToLearn: (state, action: PayloadAction<IWord[]>) => ({
      ...state,
      wordsToLearn: action.payload,
    }),
    setSuggestedFour: (state, action: PayloadAction<IWord[]>) => ({
      ...state,
      suggestedFour: action.payload,
    }),
    updateChecksList: (state, action: PayloadAction<ICheck>) => ({
      ...state,
      checks: [...state.checks, action.payload],
    }),
    setIsFinishModalOpen: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isFinishModalOpen: action.payload,
    }),
    setIsReportModalOpen: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isReportModalOpen: action.payload,
    }),
    setIsLearnStarted: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLearnStarted: action.payload,
    }),
    setCorrectAnswers: (state, action: PayloadAction<number>) => ({
      ...state,
      correctAnswers: action.payload,
    }),
  },
});

export const {
  setWordToLearn,
  updateWordsList,
  updateChecksList,
  setWordsToLearn,
  setIsFinishModalOpen,
  setIsReportModalOpen,
  setIsLearnStarted,
  setCorrectAnswers,
  setSuggestedFour,
} = counterSlice.actions;

export const selectWord = (state: RootState) => state.wordPairs.word;
export const selectWords = (state: RootState) => state.wordPairs.words;
export const selectWordsToLearn = (state: RootState) =>
  state.wordPairs.wordsToLearn;
export const selectChecks = (state: RootState) => state.wordPairs.checks;
export const selectFinalModal = (state: RootState) =>
  state.wordPairs.isFinishModalOpen;
export const selectResultModal = (state: RootState) =>
  state.wordPairs.isReportModalOpen;
export const selectLearnStarted = (state: RootState) =>
  state.wordPairs.isLearnStarted;
export const selectCorrectAnswers = (state: RootState) =>
  state.wordPairs.correctAnswers;
export const selectSuggestedFour = (state: RootState) =>
  state.wordPairs.suggestedFour;

export default counterSlice.reducer;
