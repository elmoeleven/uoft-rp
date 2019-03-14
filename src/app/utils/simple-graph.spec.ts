import { SimpleGraph } from './simple-graph';

describe('a simple graph', () => {
  it('instantiates', () => {
    expect(new SimpleGraph<string>()).toBeTruthy();
  });

  it('allows the adding of edges', () => {
    const g = new SimpleGraph<string>();

    g.add('a', ['b']);
    g.add('b', ['a', 'c', 'd']);
    g.add('c', ['a']);
    g.add('d', ['a', 'e']);
    g.add('e', ['b']);

    console.log(g);

    expect(g).toBeTruthy();
  });
});
