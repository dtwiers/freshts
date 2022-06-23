export type Adapter<FromType, ToType> = {
  encode: (from: FromType) => ToType;
  decode: (from: ToType) => FromType;
};
