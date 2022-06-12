import { Lens } from './types';

export class LensCreator<Structure> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  constructor(_dataTemplate?: Structure) {}

  public fromProp = <PropType extends keyof Structure>(prop: PropType): Lens<Structure, Structure[PropType]> => ({
    get: (structure) => structure[prop],
    set: (value) => (structure) => {
      if (Array.isArray(structure) && typeof prop === 'number') {
        return [...structure.slice(0, prop), value, ...structure.slice(prop + 1)] as unknown as Structure;
      }
      return {
        ...structure,
        [prop]: value,
      };
    },
  });
  public fromPropNullable = <PropType extends keyof Structure>(
    prop: PropType
  ): Lens<Structure | null | undefined, Structure[PropType] | null | undefined> => ({
    get: (structure) => structure?.[prop],
    set: (value) => (structure) => {
      if (structure === null || structure === undefined) {
        return structure;
      }
      if (Array.isArray(structure) && typeof prop === 'number') {
        if (structure.length < prop) {
          return structure;
        }
        return [...structure.slice(0, prop), value, ...structure.slice(prop + 1)] as unknown as Structure;
      }
      return {
        ...structure,
        [prop]: value,
      };
    },
  });
}
