import { applyWith } from './apply-to';

export const branch =
  <InputType, Outputs extends unknown[]>(
    ...fns: { [K in keyof Outputs]: (input: InputType) => Outputs[K] }
  ) =>
  (input: InputType): Outputs =>
    fns.map(applyWith(input)) as Outputs;
