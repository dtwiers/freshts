import { createLensCreator } from './prop-lens';

describe('createPropLensCreator', () => {
  it('gets array values', () => {
    const lens = createLensCreator<number[]>().fromProp(4);

    expect(lens.get([0, 0, 0, 1, 2, 3])).toBe(2);
  });

  it('sets array values', () => {
    const lens = createLensCreator<number[]>().fromProp(4);
    const result = lens.set(17)([0, 0, 0, 1, 2, 3]);

    expect(Array.isArray(result)).toBeTruthy();
    expect(result).toHaveLength(6);
    expect(result).toStrictEqual([0, 0, 0, 1, 17, 3]);
  });

  it('gets object values', () => {
    const lens = createLensCreator<{ foo: string; bar: number }>().fromProp('foo');
    expect(lens.get({ foo: 'baz', bar: 8 })).toBe('baz');
  });

  it('sets object values', () => {
    const lens = createLensCreator<{ foo: string; bar: number }>().fromProp('foo');
    const result = lens.set('quux')({ foo: 'baz', bar: 8 });

    expect(result).toBeInstanceOf(Object);
    expect(Array.isArray(result)).toBeFalsy();
    expect(result).toStrictEqual({ foo: 'quux', bar: 8 });
  });
});
