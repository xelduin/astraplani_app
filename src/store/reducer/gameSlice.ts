import { createSlice } from '@reduxjs/toolkit';

import { generateMockStars, getAnimaData } from '../../utils';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    animaList: getAnimaData(),
    starList: generateMockStars(),
    focusedEntity: undefined,
    modal: undefined,
    gameView: 'galaxy',
  },
  reducers: {
    setFocusedEntity: (state, action) => {
      const anima = state.animaList.find((e) => e.id === action.payload);
      const star = state.starList.find((e) => e.id === action.payload);

      state.focusedEntity = Object.assign(anima, star);
    },
    showModal: (state, action) => {
      state.modal = action.payload;
    },
    hideModal: (state) => {
      state.modal = undefined;
    },
    setGameView: (state, action) => {
      state.gameView = action.payload;
    },
  },
});

export const selectFocusedEntity = (state) => state.game.focusedEntity;
export const selectModal = (state) => state.game.modal;
export const selectStarList = (state) => state.game.starList;
export const selectAnimaList = (state) => state.game.animaList;
export const selectGameView = (state) => state.game.gameView;

export const { setFocusedEntity, showModal, hideModal, setGameView } =
  gameSlice.actions;

export default gameSlice.reducer;
