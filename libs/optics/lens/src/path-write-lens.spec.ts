import { createPathWriteLens } from './path-write-lens';
import * as FC from 'fast-check';

describe('createPathWriteLens', () => {
  it('creates a no-op lens', () => {
    const writeLens = createPathWriteLens();
    FC.assert(
      FC.property(FC.anything(), FC.anything(), (newVal, oldVal) => {
        expect(writeLens.set(newVal)(oldVal)).toBe(newVal);
      })
    );
  });

  it('sets a top-level key', () => {
    const writeLens = createPathWriteLens<{ foo: string; baz: string }, 'foo'>('foo');

    FC.assert(
      FC.property(FC.string(), FC.record({ foo: FC.string(), baz: FC.string() }), (value, structure) => {
        expect(writeLens.set(value)(structure)).toStrictEqual({ ...structure, foo: value });
      })
    );
  });
});
