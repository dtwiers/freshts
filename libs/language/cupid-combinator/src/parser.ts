import { fail, Failure, ok } from '@freshts/utility-result';
import type { ParseErr, ParseOk, ParseResult } from './types';

export const succeed: <OkType>(input: ParseOk<OkType>) => ParseResult<OkType> =
  ok;

export const err: (input: ParseErr) => Failure<ParseErr> = fail;
