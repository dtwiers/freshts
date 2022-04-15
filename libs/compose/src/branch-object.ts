import { pipe } from './pipe';

export const branchObject =
  <InputType, Output extends Record<string, unknown>>(fnObject: {
    [K in keyof Output]: (input: InputType) => Output[K];
  }) =>
  (input: InputType): Output =>
    pipe(
      fnObject,
      Object.entries,
      (entries) =>
        (entries as [string, (input: InputType) => unknown][]).map(
          ([key, fn]) => [key, fn(input)]
        ),
      Object.fromEntries
    ) as Output;
