import { applyWith } from './apply-with';
import * as FC from 'fast-check';
import { pipe } from './pipe';

describe('applyWith', () => {
  it('applies a unary function', () => {
    FC.assert(
      FC.property(FC.anything(), FC.func(FC.anything()), (param, fn) => {
        const result = pipe(fn, applyWith(param));
        expect(result).toEqual(fn(param));
      })
    );
  });
  it('applies a binary function', () => {
    FC.assert(
      FC.property(
        FC.anything(),
        FC.anything(),
        FC.func(FC.anything()),
        (param1, param2, fn) => {
          const result = pipe(fn, applyWith(param1, param2));
          expect(result).toEqual(fn(param1, param2));
        }
      )
    );
  });
  it('applies an n-ary function', () => {
    FC.assert(
      FC.property(
        FC.array(FC.anything()),
        FC.func(FC.anything()),
        (params, fn) => {
          const result = pipe(fn, applyWith(...params));
          expect(result).toEqual(fn(...params));
        }
      )
    );
  });
});
