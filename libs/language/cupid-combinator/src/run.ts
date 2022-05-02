import { mapArray, mapHead, mapLast } from '@freshts/utility-array';
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

export const formatLineNumber = (maxWidth: number) => (lineNumber?: number) =>
  `${(lineNumber?.toString() ?? '').padStart(maxWidth + 1, ' ')} | `;

export const formatCodeFrame = ({
  input,
  linesBefore = 3,
  linesAfter = 2,
  errorEnd,
  errorStart,
  message,
}: FormatCodeFrameOptions) => {
  const lines = input.split('\n');
  const modifiedErrorEnd = Math.max(errorEnd, errorStart + 1);
  const start = locateCursor(input, errorStart);
  const end = locateCursor(input, modifiedErrorEnd);
  const before = lines.slice(
    Math.max(0, start.line - 1 - linesBefore),
    start.line - 1
  );
  const after = lines.slice(end.line, end.line + linesAfter);
  const affectedLines = lines.slice(start.line - 1, end.line);
  const caretLines = pipe(
    affectedLines,
    mapArray((line) => line.replace(/./g, '^')),
    mapHead((head) => ' '.repeat(start.column) + head.slice(start.column)),
    mapLast((last) => last.slice(0, end.column) + ' ' + message)
  );
  const maxLineNumber = Math.min(end.line + linesAfter, lines.length);
  const lineNumberWidth = `${maxLineNumber}`.length;
  const lineFormatter = formatLineNumber(lineNumberWidth);
  const preformattedAffectedLines = affectedLines.flatMap((line, idx) => [
    lineFormatter(idx + start.line) + line,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    lineFormatter() + caretLines[idx]!,
  ]);

  const newBefore = before.map(
    (line, idx) =>
      lineFormatter(Math.max(0, start.line - linesBefore) + 1 + idx) + line
  );
  const newAfter = after.map(
    (line, idx) => lineFormatter(end.line + 1 + idx) + line
  );
  const result = [...newBefore, ...preformattedAffectedLines, ...newAfter].join(
    '\n'
  );
  return result;
};

const defaultShowErrorOptions: Required<ShowErrorOptions> = {
  linesBefore: 3,
  linesAfter: 2,
};

export const showError =
  (options: ShowErrorOptions = defaultShowErrorOptions) =>
  (error: ParseErr): string =>
    formatCodeFrame({
      ...defaultShowErrorOptions,
      ...options,
      message: `expected: ${error.expected}`,
      errorStart: error.failedAtCursorStart,
      errorEnd: error.failedAtCursorEnd,
      input: error.input,
    });
