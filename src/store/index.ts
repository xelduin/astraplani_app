import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './reducer/gameSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
  },
  devTools: true,
});
