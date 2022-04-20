import { flow } from '@freshts/utility-compose';
import { flatMapOk } from '@freshts/utility-result';
import type { Parser } from './types';

export const flatMapSuccess =
  <OldValue, NewValue>(flatMapFn: (input: OldValue) => Parser<NewValue>) =>
  (parser: Parser<OldValue>): Parser<NewValue> =>
    flow(
      parser,
      flatMapOk(({ value, input, outputCursor }) =>
        flatMapFn(value)(input, outputCursor)
      )
    );
