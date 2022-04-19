export type EmptyBrandedObject<Brand extends PropertyKey> = {
  __type: Brand;
};

export type BrandedObject<
  T extends Record<string, unknown>,
  Brand extends PropertyKey
> = T & EmptyBrandedObject<Brand>;

export const brandObject =
  <Brand extends PropertyKey>(brand: Brand) =>
  <T extends Record<string, unknown>>(obj: T) => ({
    ...obj,
    __type: brand,
  });

export const isBrandedObject =
  <Brand extends PropertyKey>(brand: Brand) =>
  <T extends Record<string, unknown>>(obj: T): obj is BrandedObject<T, Brand> =>
    !!obj &&
    typeof obj === 'object' &&
    '__type' in obj &&
    obj['__type'] === brand;
