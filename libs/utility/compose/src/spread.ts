export const spread =
  <ParamsType extends unknown[], OutputType>(fn: (...params: ParamsType) => OutputType) =>
  (unspreadValues: ParamsType): OutputType =>
    fn(...unspreadValues);
