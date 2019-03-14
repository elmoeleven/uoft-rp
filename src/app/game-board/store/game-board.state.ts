import { WeightedGrid } from 'app/utils/weighted-grid';

export const GAMEBOARD_STATE_KEY = 'gameBoard';

export interface IGameBoardState {
  score: number;
  hintCount: number;
  addTimeCount: number;
  timeRemaining: number;
  level: number;
  grid?: WeightedGrid;
  selectedCoords?: string[];
}
