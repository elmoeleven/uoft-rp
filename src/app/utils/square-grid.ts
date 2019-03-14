import { coordForValues, valuesForCoord } from './coord.helpers';

export class SquareGrid {
  constructor(private _width: number, private _height: number, private _walls: string[] = []) {}

  neighbours(coord: string): string[] {
    return this._getSurrounding(coord)
      .filter((c) => this.inBounds(valuesForCoord(c)))
      .filter((c) => this.passable(valuesForCoord(c)));
  }

  surrounding(coord: string): string[] {
    return this._getSurrounding(coord).filter((c) => this.inBounds(valuesForCoord(c)));
  }

  inBounds([x, y]: [number, number]): boolean {
    return x >= 0 && y >= 0 && x < this._width && y < this._height;
  }

  passable([x, y]: [number, number]): boolean {
    return !this._walls.find((coordinate) => {
      const [cx, cy] = valuesForCoord(coordinate);

      return cx === x && cy === y;
    });
  }

  set walls(walls: string[]) {
    this._walls = walls;
  }

  get walls(): string[] {
    return this._walls;
  }

  protected width(): number {
    return this._width;
  }

  protected height(): number {
    return this._height;
  }

  private _getSurrounding(coord: string): string[] {
    const [x, y] = valuesForCoord(coord);
    const results = [
      coordForValues(x + 1, y),
      coordForValues(x, y - 1),
      coordForValues(x - 1, y),
      coordForValues(x, y + 1)
    ];

    if ((x + y) % 2 === 0) {
      results.reverse();
    }

    return results;
  }
}
