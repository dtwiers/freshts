export const applyWith =
  <Params extends unknown[]>(...params: Params) =>
  <Output>(fn: (...params: Params) => Output) =>
    fn(...params);
