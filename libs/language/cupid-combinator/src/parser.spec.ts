import { succeedParser } from './parser';
import { runParser } from './run';
import * as FC from 'fast-check';
import { ok } from '@freshts/result';

describe('succeedParser', () => {
  it('parses as a success', () => {
    FC.assert(
      FC.property(
        FC.string(),
        FC.string(),
        FC.integer({ min: 0 }),
        (inputString, resolveWith, width) => {
          expect(
            runParser(succeedParser(resolveWith, width))(inputString)
          ).toEqual(ok(resolveWith));
        }
      )
    );
  });
});
