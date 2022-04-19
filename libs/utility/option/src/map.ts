import { isSome, none, some } from './option';
import { Option } from './types';

export const mapSome =
  <T, OutputT>(mapFn: (input: T) => OutputT) =>
  (input: Option<T>): Option<OutputT> => {
    if (isSome(input)) {
      return some(mapFn(input.some));
    }
    return none;
  };
