import { pipe } from '@freshts/utility-compose';
import { orElse } from './or-else';
import { err, isEnd, succeed, succeedParser } from './parser';
import { Parser } from './types';

export const matchString =
  <Value extends string>(value: Value): Parser<Value> =>
  (input, cursor) => {
    if (input.substring(cursor, cursor + value.length) === value) {
      return succeed({
        input,
        inputCursor: cursor,
        outputCursor: cursor + value.length,
        value,
      });
    }
    return err({
      input,
      expected: value,
      failedAtCursor: cursor,
    });
  };

export const matchStringIgnoreCase =
  (value: string): Parser<string> =>
  (input, cursor) => {
    if (
      input.substring(cursor, cursor + value.length).toLocaleLowerCase() ===
      value.toLocaleLowerCase()
    ) {
      return succeed({
        input,
        inputCursor: cursor,
        outputCursor: cursor + value.length,
        value,
      });
    }
    return err({
      input,
      failedAtCursor: cursor,
      expected: value,
    });
  };

export const matchRegex =
  (value: RegExp, expected: string): Parser<string> =>
  (input, cursor) => {
    const matches = input.substring(cursor).match(value);
    if (matches) {
      return succeed({
        input,
        inputCursor: cursor,
        outputCursor: cursor + (matches[0]?.length ?? 0),
        value: matches[0] as string,
      });
    }
    return err({
      input,
      failedAtCursor: cursor,
      expected,
    });
  };

export const anyCharacter =
  (onEOF: () => string): Parser<string> =>
  (input, cursor) => {
    if (isEnd(input, cursor)) {
      return err({ expected: onEOF(), failedAtCursor: cursor, input });
    }
    return succeed({
      input,
      inputCursor: cursor,
      outputCursor: cursor + 1,
      value: input.charAt(cursor),
    });
  };

export const oneOf = (
  firstValue: string,
  ...values: string[]
): Parser<string> => {
  const parsers = values.map(matchString);
  return parsers.reduce(
    (prev, curr) => orElse(() => curr)(prev),
    matchString(firstValue)
  );
};

export const notMatchChar =
  (value: string): Parser<string> =>
  (input, cursor) => {
    if (input.substring(cursor, cursor + 1) !== value) {
      return succeed({
        input,
        inputCursor: cursor,
        outputCursor: cursor + 1,
        value: input.substring(cursor, cursor + 1),
      });
    }
    return err({
      expected: `not ${value}`,
      failedAtCursor: cursor,
      input,
    });
  };
