import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GAMEBOARD_STATE_KEY, IGameBoardState } from './game-board.state';

export const selectGameBoardState = createFeatureSelector<IGameBoardState>(GAMEBOARD_STATE_KEY);

export const selectGameBoardScore = createSelector(
  selectGameBoardState,
  (state: IGameBoardState) => state.score
);

export const selectGameBoardHintCount = createSelector(
  selectGameBoardState,
  (state: IGameBoardState) => state.hintCount
);

export const selectGameBoardAddTimeCount = createSelector(
  selectGameBoardState,
  (state: IGameBoardState) => state.addTimeCount
);

export const selectGameBoardAllottedTime = createSelector(
  selectGameBoardState,
  (state: IGameBoardState) => state.allottedTime
);

export const selectGameBoardGrid = createSelector(
  selectGameBoardState,
  (state: IGameBoardState) => state.grid
);

export const selectGameBoardGameOver = createSelector(
  selectGameBoardState,
  (state: IGameBoardState) => state.gameOver
);

export const selectGameBoardLevelComplete = createSelector(
  selectGameBoardState,
  (state: IGameBoardState) =>
    state.grid.blocks.reduce((acc, curr) => acc.concat(curr), []).every((block) => block.isEmpty)
);
