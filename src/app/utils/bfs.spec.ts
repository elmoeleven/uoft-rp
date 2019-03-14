import { SimpleGraph } from './simple-graph';
import { SquareGrid } from './square-grid';
import { WeightedGrid } from './weighted-grid';

import { bfs, bfs2, bfs3, dijkstra, astar } from './bfs';

describe('bfs', () => {
  it('instantiates', () => {
    const g = new SimpleGraph<string>();

    g.add('a', ['b']);
    g.add('b', ['a', 'c', 'd']);
    g.add('c', ['a']);
    g.add('d', ['e', 'a']);
    g.add('e', ['b']);

    expect(bfs<string>(g, 'a')).toBeTruthy();
  });
});

describe('bfs2', () => {
  it('instantiates', () => {
    const g = new SimpleGraph<string>();

    g.add('a', ['b']);
    g.add('b', ['a', 'c', 'd']);
    g.add('c', ['a']);
    g.add('d', ['e', 'a']);
    g.add('e', ['b']);

    expect(bfs2<string>(g, 'a')).toBeTruthy();
  });
});

describe('bfs3', () => {
  it('instantiates', () => {
    const g = new SquareGrid(5, 5);
    expect(bfs3(g, '8:7', '17:2')).toBeTruthy();
  });
});

describe('dijkstra', () => {
  it('instantiates', () => {
    const g = new WeightedGrid(
      5,
      5,
      new Map([
        ['1:1', 5],
        ['2:2', 5],
        ['3:3', 5]
      ]));

    expect(dijkstra(g, '1:2', '4:0').path).toBeTruthy();
  });
});

describe('astar', () => {
  it('instantiates', () => {
    const g = new WeightedGrid(
      5,
      5,
      new Map([
        ['1:1', 5],
        ['2:2', 5],
        ['3:3', 5]
      ]));

    expect(astar(g, '1:2', '4:0').path).toBeTruthy();
  });
});
