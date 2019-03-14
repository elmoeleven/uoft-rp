import { WeightedGrid } from 'app/utils/weighted-grid';

export const GAMEBOARD_STATE_KEY = 'gameBoard';

export interface IGameBoardState {
  score: number;
  hintCount: number;
  addTimeCount: number;
  allottedTime: number;
  gameOver: boolean;
  level: number;
  grid?: WeightedGrid;
  selectedCoords?: string[];
}
