import { Block } from './block';

export function valuesForCoord(coordinate: string): [number, number] {
  return coordinate.split(':').map((s) => Number(s)) as [number, number];
}

export function coordForValues(x: number, y: number): string {
  return `${x}:${y}`;
}

export function priorityForCoord(coord: string): number {
  const [, ...[priority]] = coord.split(';');

  return Number(priority) || 0;
}

export function coordComparator(coordA: string, coordB: string): number {
  return priorityForCoord(coordA) > priorityForCoord(coordB) ? -1 : 1
}

export function fillArray(size: number): null[] {
  return Array(size).fill(null);
}
