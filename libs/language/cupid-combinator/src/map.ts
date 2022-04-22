import { flow } from '@freshts/utility-compose';
import { mapFailure, mapOk } from '@freshts/utility-result';
import { ParseErr, Parser } from './types';

export const mapSuccess =
  <OldValue, NewValue>(mapFn: (input: OldValue) => NewValue) =>
  (parser: Parser<OldValue>): Parser<NewValue> =>
    flow(
      parser,
      mapOk((val) => ({ ...val, value: mapFn(val.value) }))
    );

export const mapErr =
  (mapFn: (input: ParseErr) => ParseErr) =>
  <Value>(parser: Parser<Value>): Parser<Value> =>
    flow(parser, mapFailure(mapFn));
