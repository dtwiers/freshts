import { pipe } from '@freshts/utility-compose';
import { mapOk } from '@freshts/utility-result';
import { ParseErr, Parser } from './types';

export const runParser =
  <Value>(parser: Parser<Value>) =>
  (input: string) =>
    pipe(
      parser(input, 0),
      mapOk(({ value }) => value)
    );

export const showError = (error: ParseErr): string => {
  const lines = error.input.split('\n');
  const errorLines = error.input.slice(0, error.failedAtCursor).split('\n');
  const errorRow = errorLines.length;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const errorColumn = errorLines[errorLines.length - 1]?.length ?? 0;
  return [
    lines[errorRow - 1],
    `${' '.repeat(errorColumn)}^`,
    `expected: ${error.expected}`,
  ].join('\n');
};
