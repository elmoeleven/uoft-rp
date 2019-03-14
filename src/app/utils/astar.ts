import { PriorityQueue } from 'typescript-collections';

import { SquareGrid } from './square-grid';
import { WeightedGrid } from './weighted-grid';

import { coordComparator, valuesForCoord } from './coord.helpers';

export function astar(
  graph: WeightedGrid,
  start: string,
  goal: string
): {
  cameFrom: Map<string, string>;
  costSoFar: Map<string, number>;
  path?: string;
} {
  let path;

  const frontier = new PriorityQueue(coordComparator);
  const cameFrom = new Map<string, string>();
  const costSoFar = new Map<string, number>();

  const heuristic = (first: string, second: string) => {
    const [x1, y1] = valuesForCoord(first);
    const [x2, y2] = valuesForCoord(second);

    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  };

  frontier.enqueue(start);
  cameFrom.set(start, null);
  costSoFar.set(start, 0);

  while (!frontier.isEmpty()) {
    const [current] = frontier.dequeue().split(';');

    if (current === goal) {
      path = _pathfinder(cameFrom, goal);
      break;
    }

    graph.neighbours(current).forEach((n) => {
      const newCost = costSoFar.get(current) + graph.cost(current, n);

      if (costSoFar.has(n) || newCost >= costSoFar.get(n)) {
        return;
      }

      costSoFar.set(n, newCost);
      const priority = newCost + heuristic(goal, n);
      frontier.enqueue(`${n};${priority}`);
      cameFrom.set(n, current);
    });
  }

  return { cameFrom, costSoFar, path };
}

function _pathfinder(cameFrom: Map<string, string>, goal: string): string {
  const pathfinder = (path, current) => {
    const origin = cameFrom.get(current);

    if (!origin) {
      return `${path}`;
    }

    return pathfinder(`${origin} => ${path}`, origin);
  };

  return pathfinder(`${goal}`, goal);
}
