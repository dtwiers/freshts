import { createPathReadLens } from './path-read-lens';
import { createPathWriteLens } from './path-write-lens';
import { Lens } from './types';

export class PathLensCreator<Structure> {
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

  public fromPath(): Lens<Structure, Structure>;
  public fromPath<Key1Type extends keyof Structure>(key1: Key1Type): Lens<Structure, Structure[Key1Type]>;
  public fromPath<Key1Type extends keyof Structure, Key2Type extends keyof Structure[Key1Type]>(
    key1: Key1Type,
    key2: Key2Type
  ): Lens<Structure, Structure[Key1Type][Key2Type]>;
  public fromPath<
    Key1Type extends keyof Structure,
    Key2Type extends keyof Structure[Key1Type],
    Key3Type extends keyof Structure[Key1Type][Key2Type]
  >(key1: Key1Type, key2: Key2Type, key3: Key3Type): Lens<Structure, Structure[Key1Type][Key2Type][Key3Type]>;
  public fromPath<
    Key1Type extends keyof Structure,
    Key2Type extends keyof Structure[Key1Type],
    Key3Type extends keyof Structure[Key1Type][Key2Type],
    Key4Type extends keyof Structure[Key1Type][Key2Type][Key3Type]
  >(
    key1: Key1Type,
    key2: Key2Type,
    key3: Key3Type,
    key4: Key4Type
  ): Lens<Structure, Structure[Key1Type][Key2Type][Key3Type][Key4Type]>;
  public fromPath<
    Key1Type extends keyof Structure,
    Key2Type extends keyof Structure[Key1Type],
    Key3Type extends keyof Structure[Key1Type][Key2Type],
    Key4Type extends keyof Structure[Key1Type][Key2Type][Key3Type],
    Key5Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type]
  >(
    key1: Key1Type,
    key2: Key2Type,
    key3: Key3Type,
    key4: Key4Type,
    key5: Key5Type
  ): Lens<Structure, Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type]>;
  public fromPath<
    Key1Type extends keyof Structure,
    Key2Type extends keyof Structure[Key1Type],
    Key3Type extends keyof Structure[Key1Type][Key2Type],
    Key4Type extends keyof Structure[Key1Type][Key2Type][Key3Type],
    Key5Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type],
    Key6Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type]
  >(
    key1: Key1Type,
    key2: Key2Type,
    key3: Key3Type,
    key4: Key4Type,
    key5: Key5Type,
    key6: Key6Type
  ): Lens<Structure, Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type]>;
  public fromPath<
    Key1Type extends keyof Structure,
    Key2Type extends keyof Structure[Key1Type],
    Key3Type extends keyof Structure[Key1Type][Key2Type],
    Key4Type extends keyof Structure[Key1Type][Key2Type][Key3Type],
    Key5Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type],
    Key6Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type],
    Key7Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type]
  >(
    key1: Key1Type,
    key2: Key2Type,
    key3: Key3Type,
    key4: Key4Type,
    key5: Key5Type,
    key6: Key6Type,
    key7: Key7Type
  ): Lens<Structure, Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type]>;
  public fromPath<
    Key1Type extends keyof Structure,
    Key2Type extends keyof Structure[Key1Type],
    Key3Type extends keyof Structure[Key1Type][Key2Type],
    Key4Type extends keyof Structure[Key1Type][Key2Type][Key3Type],
    Key5Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type],
    Key6Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type],
    Key7Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type],
    Key8Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type]
  >(
    key1: Key1Type,
    key2: Key2Type,
    key3: Key3Type,
    key4: Key4Type,
    key5: Key5Type,
    key6: Key6Type,
    key7: Key7Type,
    key8: Key8Type
  ): Lens<Structure, Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type]>;
  public fromPath<
    Key1Type extends keyof Structure,
    Key2Type extends keyof Structure[Key1Type],
    Key3Type extends keyof Structure[Key1Type][Key2Type],
    Key4Type extends keyof Structure[Key1Type][Key2Type][Key3Type],
    Key5Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type],
    Key6Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type],
    Key7Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type],
    Key8Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type],
    Key9Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type]
  >(
    key1: Key1Type,
    key2: Key2Type,
    key3: Key3Type,
    key4: Key4Type,
    key5: Key5Type,
    key6: Key6Type,
    key7: Key7Type,
    key8: Key8Type,
    key9: Key9Type
  ): Lens<
    Structure,
    Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type][Key9Type]
  >;
  public fromPath<
    Key1Type extends keyof Structure,
    Key2Type extends keyof Structure[Key1Type],
    Key3Type extends keyof Structure[Key1Type][Key2Type],
    Key4Type extends keyof Structure[Key1Type][Key2Type][Key3Type],
    Key5Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type],
    Key6Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type],
    Key7Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type],
    Key8Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type],
    Key9Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type],
    Key10Type extends keyof Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type][Key9Type]
  >(
    key1: Key1Type,
    key2: Key2Type,
    key3: Key3Type,
    key4: Key4Type,
    key5: Key5Type,
    key6: Key6Type,
    key7: Key7Type,
    key8: Key8Type,
    key9: Key9Type,
    key10: Key10Type
  ): Lens<
    Structure,
    Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type][Key9Type][Key10Type]
  >;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public fromPath<Keys extends PropertyKey[]>(...keys: Keys[]): Lens<Structure, any> {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      get: (createPathReadLens as any)(...keys).get,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set: (createPathWriteLens as any)(...keys).set,
    };
  }
}
