import { pipe } from '@freshts/compose';
import { mapErr } from './map';
import { Parser } from './types';

export const withExpected =
  (expected: string) =>
  <Value>(parser: Parser<Value>): Parser<Value> =>
    pipe(
      parser,
      mapErr((err) => ({ ...err, expected }))
    );
