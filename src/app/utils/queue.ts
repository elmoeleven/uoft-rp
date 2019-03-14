export class Queue<T> {
  private _collection: T[];

  constructor() {
    this._collection = [];
  }

  public peek(): T {
    return this._collection[this._collection.length - 1];
  }

  public enqueue(value: T): void {
    this._collection.push(value);
  }

  public dequeue(): T {
    return this._collection.shift();
  }

  public get size(): number {
    return this._collection.length;
  }

  public get empty(): boolean {
    return this.size === 0;
  }

  public toString(): string {
    return JSON.stringify(this._collection);
  }
}
