export class SimpleGraph<T> {
  private _edges: Map<T, T[]>;

  constructor() {
    this._edges = new Map();
  }

  public neighbours(id: T): T[] {
    return this._edges.get(id);
  }

  public add(id: T, edges: T[]): void {
    this._edges.set(id, [...edges]);
  }
}
