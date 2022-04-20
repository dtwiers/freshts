import { err, succeed } from './parser';
import { Parser } from './types';

export const matchExact =
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

export const matchIgnoreCase =
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

