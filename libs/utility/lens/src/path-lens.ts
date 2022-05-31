import { Lens } from './types';

const untypedWithPath = <StructureType, TargetType>(...path: PropertyKey[]): Lens<StructureType, TargetType> => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- the typescript is worthless here.
  // @ts-ignore
  get: (structure) => path.reduce((accum, curr) => accum?.[curr], structure),
  set: (value) => (structure) => {
    if (path.length === 0 || path[0] === undefined) {
      return value as unknown as StructureType;
    }
    // TODO: rethink this mess. It's atrocious.
    // TODO: if it's an array, and path[0] is a number....
    // TODO: restrict (or don't?) prototype methods
    return {
      ...structure,
      [path[0]]: untypedWithPath(...path.slice(1)).set(value)((structure as any)[path[0]]),
    } as StructureType;
  },
});

export const createWithPath = <BaseType>(_exampleItem?: BaseType) => ({});
