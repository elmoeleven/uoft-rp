import { WeightedGrid } from './weighted-grid';

describe('weighted grid', () => {
  it('blah', () => {
    const g = new WeightedGrid(
      5,
      5,
      new Map([
        ['1:1', 5],
        ['2:2', 5],
        ['3:3', 5]
      ]));

    console.log(g.cost('0:0', '1:1'));
  })
});
