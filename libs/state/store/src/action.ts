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
    // TODO: fix the TS and logic here
    payload: options.callback?.(...input) ?? (input[0] as any),
  }),
});
