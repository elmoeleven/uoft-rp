import { Block } from './block';
import { SquareGrid } from './square-grid';
import { fillArray } from './coord.helpers';

export class WeightedGrid extends SquareGrid {
  private _blocks: Block[][];
  private _blocksByCoord: Map<string, Block>;

  constructor(
    _width: number,
    _height: number,
    _walls: string[] = [],
    private _weights: Map<string, number> = new Map()
  ) {
    super(_width, _height, _walls);
    this._blocksByCoord = new Map();
    this._blocks = this._createGrid(_width, _height);
  }

  cost(from: string, to: string): number {
    return this._weights.get(to) ? 5 : 1;
  }

  blockByCoord(coord: string): Block {
    return this._blocksByCoord.get(coord);
  }

  get blocks(): Block[][] {
    return this._blocks;
  }

  private _createGrid(width: number, height: number): Block[][] {
    return fillArray(width).map((arr, i) => [
      ...fillArray(height).map((g, j) => {
        const block = new Block(i, j);

        this._blocksByCoord.set(block.coord, block);

        return block;
      })
    ]);
  }
}
