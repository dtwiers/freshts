import { pipe } from '@freshts/utility-compose';
import { orElse as orElseResult } from '@freshts/utility-result';
import { Parser } from './types';

export const orElse =
  <Value>(alternativeParser: () => Parser<Value>) =>
  (parser: Parser<Value>): Parser<Value> =>
  (input, cursor) =>
    pipe(
      parser(input, cursor),
      orElseResult(() => alternativeParser()(input, cursor))
    );
