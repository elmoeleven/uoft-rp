import { coordForValues } from './coord.helpers';

export class Block {
  private _selected: boolean;
  private _coord: string;
  private _content: any | null;
  private _isWall: boolean;

  constructor(private _x: number, private _y: number) {
    this._coord = coordForValues(_x, _y);
    this._content = this._coord;
  }

  toggleSelection(): void {
    this._selected = !this._selected;
  }

  empty(): void {
    this._content = null;
    this._isWall = this._selected = false;
  }

  select(): void {
    this._selected = !this._selected;
  }

  get content(): any | null {
    return this._content;
  }

  set content(thing: any | null) {
    this._content = thing;
  }

  get isEmpty(): boolean {
    return this._content === null;
  }

  get isSelected(): boolean {
    return this._selected;
  }

  set isWall(state: boolean) {
    this._isWall = state;
  }

  get isWall(): boolean {
    return this._isWall;
  }

  get coordinate(): { x: number; y: number } {
    return { x: this._x, y: this._y };
  }

  get coord(): string {
    return this._coord;
  }
}
