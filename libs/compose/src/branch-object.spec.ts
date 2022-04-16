import { branchObject } from './branch-object';
import { pipe } from './pipe';
import * as FC from 'fast-check';

describe('branchObject', () => {
  it('branches objects', () => {
    FC.assert(
      FC.property(
        FC.anything(),
        // TODO: make unique
        FC.array(FC.tuple(FC.string(), FC.func(FC.anything()))),
        (param, branchEntries) => {
          const obj = Object.fromEntries(branchEntries);
          const result = pipe(param, branchObject(obj));
          expect(Object.keys(result)).toHaveLength(branchEntries.length);
        }
      )
    );
  });
});
