import {
  fail,
  Failure,
  isFailure,
  isOk,
  Ok,
  ok,
} from '@freshts/utility-result';
import type { ParseErr, ParseOk, ParseResult } from './types';

export const succeed: <Value>(input: ParseOk<Value>) => ParseResult<Value> = ok;

export const err: (input: ParseErr) => Failure<ParseErr> = fail;

export const isSuccess = <Value>(
  parseResult: ParseResult<Value>
): parseResult is Ok<ParseOk<Value>> => isOk(parseResult);

export const isErr = <Value>(
  parseResult: ParseResult<Value>
): parseResult is Failure<ParseErr> => isFailure(parseResult);

export const isEnd = (input: string, cursor: number): boolean =>
  cursor >= input.length;
