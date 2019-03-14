import { Action } from '@ngrx/store';

import { Block } from 'app/utils/block';

export enum GameBoardActions {
  Initialize = '[GAMEBOARD] Initialize',

  SelectBlock = '[GAMEBOARD] Select Block',

  AddTime = '[GAMEBOARD] Add Time',
  ShowHint = '[GAMEBOARD] Show Hint',
  Quit = '[GAMEBOARD] Quit'
}

export class GameBoardInitializeAction implements Action {
  readonly type: typeof GameBoardActions.Initialize = GameBoardActions.Initialize;
}

export class GameBoardAddTimeAction implements Action {
  readonly type: typeof GameBoardActions.AddTime = GameBoardActions.AddTime;
}

export class GameBoardShowHintAction implements Action {
  readonly type: typeof GameBoardActions.ShowHint = GameBoardActions.ShowHint;
}

export class GameBoardQuitAction implements Action {
  readonly type: typeof GameBoardActions.Quit = GameBoardActions.Quit;
}

export class GameBoardSelectBlockAction implements Action {
  readonly type: typeof GameBoardActions.SelectBlock = GameBoardActions.SelectBlock;

  constructor(readonly coord: string) {}
}

export type GameBoardAction =
  | GameBoardInitializeAction
  | GameBoardAddTimeAction
  | GameBoardShowHintAction
  | GameBoardQuitAction
  | GameBoardSelectBlockAction;
