import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import { gameBoardReducer } from 'app/game-board/store/game-board.reducer';
import { GAMEBOARD_STATE_KEY, IGameBoardState } from 'app/game-board/store/game-board.state';

export interface IAppState {
  gameBoard: IGameBoardState;
}

export const reducers: ActionReducerMap<IAppState> = {
  [GAMEBOARD_STATE_KEY]: gameBoardReducer
};


export const metaReducers: MetaReducer<IAppState>[] = !environment.production ? [] : [];
