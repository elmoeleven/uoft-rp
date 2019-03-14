import { cloneDeep } from 'lodash';

import { Block } from 'app/utils/block';
import { WeightedGrid } from 'app/utils/weighted-grid';

import {
  GameBoardAction,
  GameBoardActions,
  GameBoardInitializeAction,
  GameBoardSelectBlockAction
} from './game-board.actions';
import { IGameBoardState } from './game-board.state';

import { astar } from 'app/utils/astar';

const levelMap = new Map<number, { x: number; y: number }>([
  [0, { x: 6, y: 6 }],
  [1, { x: 6, y: 8 }],
  [2, { x: 8, y: 8 }],
  [3, { x: 8, y: 10 }],
  [4, { x: 10, y: 10 }]
]);

const contentList = [
  '六',
  '円',
  '手',
  '文',
  '日',
  '月',
  '木',
  '水',
  '火',
  '犬',
  '王',
  '正',
  '出',
  '本',
  '右',
  '四',
  '左',
  '玉',
  '生',
  '田',
  '白',
  '目',
  '石',
  '立',
  '百',
  '年',
  '休',
  '先',
  '名',
  '字',
  '早',
  '気',
  '竹',
  '糸',
  '耳',
  '虫',
  '村',
  '男',
  '町',
  '花',
  '見',
  '貝',
  '赤',
  '足',
  '車',
  '学',
  '林',
  '空',
  '金',
  '雨'
];

const DEFAULT_STATE: IGameBoardState = {
  score: 0,
  level: 0,
  hintCount: 5,
  addTimeCount: 3,
  timeRemaining: 3600,
  selectedCoords: []
};

const gameBoardMap = new Map<GameBoardActions, (state: IGameBoardState, action: GameBoardAction) => IGameBoardState>([
  [GameBoardActions.Initialize, _initialize],
  [GameBoardActions.SelectBlock, _selectBlock]
]);

export function gameBoardReducer(state: IGameBoardState = DEFAULT_STATE, action: GameBoardAction): IGameBoardState {
  const handler = gameBoardMap.get(action.type);

  if (!handler) {
    return state;
  }

  return handler(state, action);
}

function _initialize(state: IGameBoardState, action: GameBoardInitializeAction): IGameBoardState {
  const gridData = levelMap.get(0);
  const width = gridData.x;
  const height = gridData.y;
  const grid = new WeightedGrid(width, height);

  const blocks = grid.blocks.reduce((acc, curr) => acc.concat(curr), []);

  const { empties, nonEmpties } = blocks.reduce(
    (acc, block) => {
      block.coordinate.x === 0 ||
      block.coordinate.y === 0 ||
      block.coordinate.x === gridData.x - 1 ||
      block.coordinate.y === gridData.y - 1
        ? acc.empties.push(block)
        : acc.nonEmpties.push(block);
      return acc;
    },
    { empties: [], nonEmpties: [] }
  );

  const s = contentList.slice(0, nonEmpties.length / 2);
  const selectables = [...s, ...s];

  nonEmpties.forEach((block) => {
    const [content] = selectables.splice(Math.floor((Math.random() * 100) % selectables.length), 1);
    block.content = content;
  });

  const corners = empties.filter(
    ({ coordinate }) =>
      (coordinate.x === 0 && coordinate.y === 0) ||
      (coordinate.x === 0 && coordinate.y === gridData.x - 1) ||
      (coordinate.y === 0 && coordinate.x === gridData.y - 1) ||
      (coordinate.y === gridData.x - 1 && coordinate.x === gridData.y - 1)
  );

  empties.forEach((empty) => empty.empty());

  nonEmpties.forEach((block) => (block.isWall = true));
  grid.walls = [...nonEmpties, ...corners].map((block) => block.coord);

  return {
    ...state,
    grid
  };
}

function _selectBlock(state: IGameBoardState, { coord }: GameBoardSelectBlockAction): IGameBoardState {
  const grid: WeightedGrid = cloneDeep(state.grid);
  const block = grid.blockByCoord(coord);

  if (block.isEmpty) {
    return state;
  }

  let selectedCoords = [...state.selectedCoords];

  if (selectedCoords.length === 0) {
    block.select();
    selectedCoords.push(coord);
  } else if (selectedCoords.length === 1) {
    const [selectedCoord] = selectedCoords;
    const blockForSelected = grid.blockByCoord(selectedCoord);
    const matchingContent = block.content === blockForSelected.content;
    const areAdjacent = grid.surrounding(selectedCoord).includes(block.coord);

    const originalWalls = [...grid.walls];
    grid.walls = grid.walls.filter((wall) => wall !== selectedCoord && wall !== coord);
    const pathfinder = astar(grid, selectedCoord, block.coord);

    if (block.isSelected) {
      block.select();
      selectedCoords = selectedCoords.filter((sCoord) => sCoord !== coord);
      grid.walls = originalWalls;
    } else if ((areAdjacent && matchingContent) || (!!pathfinder.path && matchingContent)) {
      blockForSelected.empty();
      block.empty();
      selectedCoords = [];
    } else {
      blockForSelected.select();
      grid.walls = originalWalls;
      selectedCoords = [];
    }
  }

  return {
    ...state,
    grid,
    selectedCoords
  };
}
