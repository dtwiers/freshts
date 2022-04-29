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

export type ShowErrorOptions = {
  linesBefore?: number;
  linesAfter?: number;
};

type FormatCodeFrameOptions = ShowErrorOptions & {
  input: string;
  errorStart: number;
  errorEnd: number;
  message: string;
};

const locateCursor = (input: string, cursor: number) => {
  const errorLines = input.slice(0, cursor).split('\n');
  const line = errorLines.length;
  const column = errorLines[line - 1]?.length ?? 0;
  return { line, column };
};

const defaultShowErrorOptions: Required<ShowErrorOptions> = {
  linesBefore: 3,
  linesAfter: 2,
};

const formatCodeFrame = ({
  input,
  linesBefore = 3,
  linesAfter = 2,
  errorEnd,
  errorStart,
  message,
}: FormatCodeFrameOptions) => {
  const lines = input.split('\n');
  const start = locateCursor(input, errorStart);
  const end = locateCursor(input, errorEnd);
  const before = lines.splice(
    Math.max(0, start.line - 1 - linesBefore),
    start.line - 1
  );
  const after = lines.splice(end.line, end.line + linesAfter);
  const affectedLines = lines.splice(start.line, end.line);
  // TODO: intersperse lines with caret lines
  const caretLines = affectedLines.map((line, idx, arr) => {
    const rawCarets = line.replace(/./g, '^');
    if (idx === 0) [
      rawCarets.replace()
    ]
  });
};

export const showError =
  (options: ShowErrorOptions) =>
  (error: ParseErr): string => {
    const lines = error.input.split('\n');
    const errorLines = error.input
      .slice(0, error.failedAtCursorStart)
      .split('\n');
    const errorRow = errorLines.length;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const errorColumn = errorLines[errorLines.length - 1]?.length ?? 0;

    // const;
    return [
      lines[errorRow - 1],
      `${' '.repeat(errorColumn)}^`,
      `expected: ${error.expected}`,
    ].join('\n');
  };
