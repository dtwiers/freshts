import { flow } from '@freshts/utility-compose';
import { mapOk } from '@freshts/utility-result';
import { Parser } from './types';

export const mapSuccess =
  <OldValue, NewValue>(mapFn: (input: OldValue) => NewValue) =>
  (parser: Parser<OldValue>): Parser<NewValue> =>
    flow(
      parser,
      mapOk((val) => ({ ...val, value: mapFn(val.value) }))
    );
