import { NonEmptyArray } from '@freshts/utility-nonempty-array';
import { Failure, Ok } from '@freshts/utility-result';
import { isErr, isSuccess, succeed } from './parser';
import { ParseErr, ParseOk, Parser, ParseResult } from './types';

export const minMaxTimes =
  (min: number, max?: number) =>
  <Value>(parser: Parser<Value>): Parser<Value[]> =>
  (input, cursor) => {
    const results: NonEmptyArray<ParseResult<Value>> = [parser(input, cursor)];
    while (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      isSuccess(results[results.length - 1]!) &&
      (max === undefined || results.length < max)
    ) {
      results.push(
        parser(
          input,
          (results[results.length - 1] as Ok<ParseOk<Value>>).ok.outputCursor
        )
      );
    }
    if (results.length < min && results.some(isErr)) {
      return results[results.length - 1] as Failure<ParseErr>;
    }
    // take out the failure
    if (results.some(isErr)) {
      results.splice(-1, 1);
    }
    const values = (results as Ok<ParseOk<Value>>[]).map((val) => val.ok.value);
    return succeed({
      input,
      inputCursor: cursor,
      outputCursor: (results[results.length - 1] as Ok<ParseOk<Value>>).ok
        .outputCursor,
      value: values,
    });
  };
