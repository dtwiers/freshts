import {
  fail,
  Failure,
  isFailure,
  isOk,
  Ok,
  ok,
} from '@freshts/result';
import type { ParseErr, ParseOk, Parser, ParseResult } from './types';

export const succeed: <Value>(input: ParseOk<Value>) => Ok<ParseOk<Value>> = ok;

export const succeedParser =
  <Value>(value: Value, width = 0): Parser<Value> =>
  (input, cursor = 0) =>
    succeed({
      input,
      inputCursor: cursor,
      outputCursor: cursor + width,
      value,
    });

export const err: (input: ParseErr) => Failure<ParseErr> = fail;

export const isSuccess = <Value>(
  parseResult: ParseResult<Value>
): parseResult is Ok<ParseOk<Value>> => isOk(parseResult);

export const isErr = <Value>(
  parseResult: ParseResult<Value>
): parseResult is Failure<ParseErr> => isFailure(parseResult);

export const isEnd = (input: string, cursor = 0): boolean =>
  cursor >= input.length;
