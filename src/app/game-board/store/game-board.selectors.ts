import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GAMEBOARD_STATE_KEY, IGameBoardState } from './game-board.state';

export const selectGameBoardState = createFeatureSelector<IGameBoardState>(GAMEBOARD_STATE_KEY);

export const selectGameBoardScore =
  createSelector(selectGameBoardState, (state: IGameBoardState) => state.score);

export const selectGameBoardHintCount =
  createSelector(selectGameBoardState, (state: IGameBoardState) => state.hintCount);

export const selectGameBoardAddTimeCount =
  createSelector(selectGameBoardState, (state: IGameBoardState) => state.addTimeCount);

export const selectGameBoardTimeRemaining =
  createSelector(selectGameBoardState, (state: IGameBoardState) => state.timeRemaining);

export const selectGameBoardGrid =
  createSelector(selectGameBoardState, (state: IGameBoardState) => state.grid);
