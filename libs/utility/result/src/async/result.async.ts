import { fail, ok } from '../result';
import { isPromise } from '../util.internal';
import type { AsyncFailure, AsyncOk } from './types';

export const asyncOk = <T>(input: T | Promise<T>): AsyncOk<T> =>
  isPromise(input) ? input.then(ok) : Promise.resolve(ok(input));

export const asyncFail = <T>(input: T | Promise<T>): AsyncFailure<T> =>
  isPromise(input) ? input.then(fail) : Promise.resolve(fail(input));
