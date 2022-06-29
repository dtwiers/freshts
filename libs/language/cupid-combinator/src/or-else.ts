import { pipe } from '@freshts/compose';
import { orElseResult as orElseResult } from '@freshts/result';
import { Parser } from './types';

export const orElse =
  <Value>(alternativeParser: () => Parser<Value>) =>
  (parser: Parser<Value>): Parser<Value> =>
  (input, cursor = 0) =>
    pipe(
      parser(input, cursor),
      orElseResult(() => alternativeParser()(input, cursor))
    );
