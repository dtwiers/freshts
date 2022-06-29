import { flow } from '@freshts/compose';
import { flatMapOk } from '@freshts/result';
import { isSuccess, succeed } from './parser';
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

export const flatMapSuccessIgnore =
  <OldValue, NewValue>(flatMapFn: (input: OldValue) => Parser<NewValue>) =>
  (parser: Parser<OldValue>): Parser<OldValue> =>
  (input, cursor = 0) => {
    const firstResult = parser(input, cursor);
    if (isSuccess(firstResult)) {
      const secondResult = flatMapFn(firstResult.ok.value)(
        input,
        firstResult.ok.outputCursor
      );
      if (isSuccess(secondResult)) {
        return succeed({
          ...firstResult.ok,
          outputCursor: secondResult.ok.outputCursor,
        });
      }
      return secondResult;
    }
    return firstResult;
  };
