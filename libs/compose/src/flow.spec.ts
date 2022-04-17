import * as FC from 'fast-check';
import { flow } from './flow';

describe('flow', () => {
  it('should return the same function if 1 function was given to it', () => {
    FC.assert(
      FC.property(FC.anything(), FC.func(FC.anything()), (input, fn) => {
        const result = flow(fn);
        expect(result(input)).toBe(fn(input));
      })
    );
  });
  it('should compose 2 functions', () => {
    FC.assert(
      FC.property(
        FC.anything(),
        FC.func(FC.anything()),
        FC.func(FC.anything()),
        (input, fn1, fn2) => {
          const result = flow(fn1, fn2);
          const expected = (i: unknown) => fn2(fn1(i));
          expect(result(input)).toEqual(expected(input));
        }
      )
    );
  });
});
