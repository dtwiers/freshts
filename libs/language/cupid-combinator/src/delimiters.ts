import { flow, pipe } from '@freshts/compose';
import { NonEmptyArray } from '@freshts/nonempty-array';
import { flatMapOk, flatMapOkIgnore, mapOk } from '@freshts/result';
import { flatMapSuccess } from './flat-map';
import { minMaxTimes } from './many';
import { mapSuccess } from './map';
import { orElse } from './or-else';
import { err, isErr, isSuccess, succeed, succeedParser } from './parser';
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
  (input, cursor = 0) => {
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
    return err({
      input,
      failedAtCursorStart: input.length - 1,
      failedAtCursorEnd: input.length,
      expected: onErr(),
    });
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
  (input, cursor = 0) => {
    const mappedParser = pipe(
      parser,
      mapSuccess((value) => [value] as NonEmptyArray<Value>)
    );

    const result = mappedParser(input, cursor);

    if (isSuccess(result)) {
      let currentCursor = result.ok.outputCursor;
      while (currentCursor < input.length) {
        const terminatorResult = terminator(input, currentCursor);
        if (isSuccess(terminatorResult)) {
          return pipe(
            result,
            mapOk(({ value }) => ({
              input,
              inputCursor: cursor,
              outputCursor: terminatorResult.ok.outputCursor,
              value,
            }))
          );
        }
        const nextParserResult = parser(input, currentCursor);
        if (isErr(nextParserResult)) {
          return nextParserResult;
        }
        result.ok.value.push(nextParserResult.ok.value);
        currentCursor = nextParserResult.ok.outputCursor;
      }
    }
    return result;
  };

export const untilTerminator = <Value>(
  parser: Parser<Value>,
  terminator: Parser<unknown>
): Parser<Value[]> =>
  pipe(
    terminator,
    mapSuccess(() => [] as Value[]),
    orElse<Value[]>(() => atLeastOneUntilTerminator(parser, terminator))
  );

export const atLeastOneSeparatedBy = <Value>(
  separator: Parser<unknown>,
  parser: Parser<Value>
): Parser<NonEmptyArray<Value>> => {
  const mappedParser = pipe(
    parser,
    mapSuccess((value) => [value] as NonEmptyArray<Value>)
  );
  const chainedParser = pipe(
    separator,
    flatMapSuccess(() => parser)
  );
  return (input, cursor = 0) => {
    const result = mappedParser(input, cursor);
    if (isSuccess(result)) {
      return pipe(
        minMaxTimes(0)(chainedParser)(input, result.ok.outputCursor),
        mapOk(({ value, outputCursor }) => ({
          input,
          inputCursor: cursor,
          outputCursor,
          value: [...result.ok.value, ...value] as NonEmptyArray<Value>,
        }))
      );
    }
    return result;
  };
};

export const separatedBy = <Value>(
  separator: Parser<unknown>,
  parser: Parser<Value>
): Parser<Value[]> =>
  pipe(
    atLeastOneSeparatedBy(separator, parser),
    orElse<Value[]>(() => succeedParser([], 0))
  );
