import { branchObject } from './branch-object';
import { pipe } from './pipe';
import * as FC from 'fast-check';

describe('branchObject', () => {
  it('branches objects', () => {
    FC.assert(
      FC.property(
        FC.anything(),
        FC.uniqueArray(FC.tuple(FC.string(), FC.func(FC.anything())), {
          comparator: (a, b) => a[0] === b[0],
        }),
        (param, branchEntries) => {
          const obj = Object.fromEntries(branchEntries);
          const result = pipe(param, branchObject(obj));
          expect(Object.keys(result)).toHaveLength(branchEntries.length);
          branchEntries.forEach(([key, fn]) => {
            expect(result[key] === fn(param));
          });
        }
      )
    );
  });
});
