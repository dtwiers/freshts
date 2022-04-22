import { pipe } from '@freshts/utility-compose';
import { mapErr } from './map';
import { Parser } from './types';

export const withExpected =
  (expected: string) =>
  <Value>(parser: Parser<Value>): Parser<Value> =>
    pipe(
      parser,
      mapErr((err) => ({ ...err, expected }))
    );
