import { Adapter } from './types';

export const createAdapter = <FromType, ToType>(
  encode: (from: FromType) => ToType,
  decode: (from: ToType) => FromType
): Adapter<FromType, ToType> => ({
  encode,
  decode,
});
