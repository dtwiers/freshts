import { ActionCreator, ActionCreatorOptions, HasTypeValue } from './action.types';

export const createActionCreator = <
  FilterType extends HasTypeValue<string>,
  PayloadType,
  CallbackInput extends unknown[] = [PayloadType]
>(
  options: ActionCreatorOptions<FilterType, PayloadType, CallbackInput>
): ActionCreator<FilterType, PayloadType, CallbackInput> => ({
  filter: options.filter,
  create: (...input) => ({
    filter: options.filter,
    payload: options.callback ? options.callback(...input) : (input[0] as PayloadType),
  }),
});
