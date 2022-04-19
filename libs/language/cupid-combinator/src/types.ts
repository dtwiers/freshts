import type { Result } from '@freshts/utility-result';

export type ParseOk<T> = {
  input: string;
  inputCursor: number;
  outputCursor: number;
  value: T;
};

export type ParseErr = {
  input: string;
  failedAtCursor: number;
  expected: string;
};

export type ParseResult<OkType> = Result<ParseOk<OkType>, ParseErr>;

export type Parser<OkType> = (
  input: string,
  cursor: number
) => ParseResult<OkType>;
