import { isSome } from './option';
import type { Option } from './types';

export const flatMapSome =
  <InputT, OutputT>(flatMapFn: (input: InputT) => Option<OutputT>) =>
  (input: Option<InputT>): Option<OutputT> => {
    if (isSome(input)) {
      return flatMapFn(input.some);
    }
    return input;
  };
