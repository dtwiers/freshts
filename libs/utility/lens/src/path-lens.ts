import { Lens } from './types';

export const untypedWithPath = <StructureType, TargetType>(...path: PropertyKey[]): Lens<StructureType, TargetType> => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- the typescript is worthless here.
  // @ts-ignore
  get: (structure) => path.reduce((accum, curr) => accum?.[curr], structure),
  set: (value) => (structure) => {
    if (path.length === 0 || path[0] === undefined) {
      return value as unknown as StructureType;
    }
    if (Array.isArray(structure) && typeof path[0] === 'number') {
      return [...structure.slice(0, path[0]), untypedWithPath(...path.slice(1)).set(value)(structure[path[0]])]
    }
  },
});

export const createWithPath = <BaseType>(_exampleItem?: BaseType) => ({});
