import { isSome } from './option';
import type { Option } from './types';

export const extract =
  <T>(onNone: () => T) =>
  (input: Option<T>): T => {
    if (isSome(input)) {
      return input.some;
    }
    return onNone();
  };
