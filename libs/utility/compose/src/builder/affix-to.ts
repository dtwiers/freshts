export const affixTo =
  <Key extends PropertyKey>(key: Key) =>
  <InputType>(input: InputType): { [K in Key]: InputType } =>
    ({ [key]: input } as { [K in Key]: InputType });
