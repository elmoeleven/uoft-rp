import { Action } from '@ngrx/store';

export enum AppActions {
  Initialize = '[APP] Initialize'
}

export class AppInitializeAction implements Action {
  readonly type: typeof AppActions.Initialize = AppActions.Initialize
}

export type AppAction = AppActions.Initialize;
