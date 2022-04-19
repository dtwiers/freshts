import { isSome } from './option';
import type { Option } from './types';

export const orElse =
  <T>(alternativeOption: () => Option<T>) =>
  (input: Option<T>): Option<T> => {
    if (isSome(input)) {
      return input;
    }
    return alternativeOption();
  };
