import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import wordsReducer from 'features/inputForm/inputSlice';

export const store = configureStore({
  reducer: {
    wordPairs: wordsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
