export type HasTypeValue<T extends string> = {
  type: T;
};

export type Action<FilterType extends HasTypeValue<string>, PayloadType> = {
  filter: FilterType;
  payload: PayloadType;
  toString?: () => string;
};

export type AnyAction = Action<HasTypeValue<string>, unknown>;

const PAYLOAD = Symbol('PAYLOAD');

export type ActionToken<FilterType extends HasTypeValue<string>, PayloadType> = {
  filter: FilterType;
  [PAYLOAD]?: PayloadType;
};

export type ActionCreator<
  FilterType extends HasTypeValue<string>,
  PayloadType,
  CallbackInput extends unknown[] = [PayloadType]
> = ActionToken<FilterType, PayloadType> & {
  create: (...input: CallbackInput) => Action<FilterType, PayloadType>;
};

export type ActionOf<ActionTokenType extends ActionToken<HasTypeValue<string>, unknown>> =
  ActionTokenType extends ActionToken<infer FilterType, infer PayloadType> ? Action<FilterType, PayloadType> : never;

export type ActionTokenOf<ActionType extends Action<HasTypeValue<string>, unknown>> = ActionType extends Action<
  infer FilterType,
  infer PayloadType
>
  ? ActionToken<FilterType, PayloadType>
  : never;

export type ActionCreatorOptions<
  FilterType extends HasTypeValue<string>,
  PayloadType,
  CallbackInput extends unknown[] = [PayloadType]
> = {
  filter: FilterType;
  callback?: (...input: CallbackInput) => PayloadType;
};
