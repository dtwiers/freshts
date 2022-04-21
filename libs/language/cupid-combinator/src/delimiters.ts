import { flow } from '@freshts/utility-compose';
import { NonEmptyArray } from '@freshts/utility-nonempty-array';
import { flatMapOk, flatMapOkIgnore, mapOk } from '@freshts/utility-result';
import { err, isSuccess, succeed } from './parser';
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
  (
    predicate: (slicedString: string) => boolean,
    onErr: () => string
  ): Parser<string> =>
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
    }
    return err({ input, failedAtCursor: input.length - 1, expected: onErr() });
  };

export const between =
  (left: Parser<unknown>, right: Parser<unknown>) =>
  <Value>(parser: Parser<Value>): Parser<Value> =>
    flow(
      left,
      flatMapOk((result) => parser(result.input, result.outputCursor)),
      flatMapOkIgnore((result) => right(result.input, result.outputCursor))
    );

export const atLeastOneUntilTerminator =
  <Value>(
    parser: Parser<Value>,
    terminator: Parser<unknown>
  ): Parser<NonEmptyArray<Value>> =>
  (input, cursor) => {
    const firstResult = parser(input, cursor);
    if (isSuccess(firstResult)) {
      // TODO: figure this logic out
    }
    return firstResult;
  };
