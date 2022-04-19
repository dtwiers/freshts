import { brandObject, isBrandedObject } from '@freshts/utility-branded';
import { None, Option, Some } from './types';

const asSome = brandObject('Some');
const asNone = brandObject('None');

export const some = <T>(val: T): Some<T> => asSome({ some: val });
export const none = asNone({});

export const isSome: <T>(val: Option<T>) => val is Some<T> =
  isBrandedObject('Some');

export const isNone: <T>(val: Option<T>) => val is None =
  isBrandedObject('None');
