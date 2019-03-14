import { Queue } from './queue';

describe('a simple queue', () => {
  it('instantiates', () => {
    expect(new Queue<number>()).toBeTruthy();
  });

  it('supports enqueueing', () => {
    const q = new Queue<number>();

    q.enqueue(1);

    expect(q.size).toBe(1);
  });

  it('supports dequeueing', () => {
    const q = new Queue<number>();

    q.enqueue(1);
    q.enqueue(2);

    expect(q.dequeue()).toBe(1);
    expect(q.size).toBe(1);

    expect(q.dequeue()).toBe(2);
    expect(q.size).toBe(0);
  });

  it('supports peeking', () => {
    const q = new Queue<number>();

    q.enqueue(1);

    expect(q.peek()).toEqual(1);
  });
});
