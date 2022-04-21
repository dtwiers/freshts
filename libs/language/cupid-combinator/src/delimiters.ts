import { flow } from '@freshts/utility-compose';
import { mapOk } from '@freshts/utility-result';
import { err, succeed } from './parser';
import { Parser } from './types';

export const peek = <Value>(parser: Parser<Value>): Parser<Value> =>
  flow(
    parser,
    mapOk((success) => ({
      ...success,
      outputCursor: success.inputCursor,
    }))
  );

export const takeUntil =
  (predicate: (slicedString: string) => boolean): Parser<string> =>
  (input, cursor) => {
    for (let c = cursor; c < input.length; c++) {
      if (predicate(input.slice(c))) {
        return succeed({
          input,
          inputCursor: cursor,
          outputCursor: c,
          value: input.slice(cursor, c),
        });
      }
      // TODO: fix expected here
      return err({ input, failedAtCursor: input.length - 1, expected: '' });
    }
  };
