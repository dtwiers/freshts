import { Action, ActionCreator, ActionCreatorOptions, HasTypeValue } from './action.types';

export const createActionCreator = <
  FilterType extends HasTypeValue<string>,
  PayloadType,
  CallbackInput extends unknown[] = [PayloadType]
>(
  options: ActionCreatorOptions<FilterType, PayloadType, CallbackInput>,
  makeToString?: (action: Action<FilterType, PayloadType>) => string
): ActionCreator<FilterType, PayloadType, CallbackInput> => ({
  filter: options.filter,
  create: (...input) => ({
    filter: options.filter,
    payload: options.callback ? options.callback(...input) : (input[0] as PayloadType),
    toString() {
      return makeToString ? makeToString(this) : this.filter.type;
    },
  }),
});
