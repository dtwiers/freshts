import type { Result } from '@freshts/result';

export type ParseOk<T> = {
  input: string;
  inputCursor: number;
  outputCursor: number;
  value: T;
};

export type ParseErr = {
  input: string;
  failedAtCursorStart: number;
  failedAtCursorEnd: number;
  expected: string;
};

export type ParseResult<OkType> = Result<ParseOk<OkType>, ParseErr>;

export type Parser<OkType> = (
  input: string,
  cursor?: number
) => ParseResult<OkType>;
