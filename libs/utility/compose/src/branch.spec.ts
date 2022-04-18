import { branch } from './branch';
import { pipe } from './pipe';
import * as FC from 'fast-check';

describe('branch', () => {
  it('branches 0 functions', () => {
    FC.assert(
      FC.property(FC.anything(), (input) => {
        const result = pipe(input, branch());
        expect(result).toEqual([]);
      })
    );
  });
  it('branches 1 function', () => {
    FC.assert(
      FC.property(FC.anything(), FC.func(FC.anything()), (input, func) => {
        const result = pipe(input, branch(func));
        expect(result).toEqual([func(input)]);
      })
    );
  });
  it('branches n functions', () => {
    FC.assert(
      FC.property(
        FC.anything(),
        FC.array(FC.func(FC.anything())),
        (input, fns) => {
          const result = pipe(input, branch(...fns));
          expect(result).toEqual(fns.map((fn) => fn(input)));
        }
      )
    );
  });
});
