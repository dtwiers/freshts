import { WriteLens } from './types';

export function createPathWriteLens<Structure>(): WriteLens<Structure, Structure>;
export function createPathWriteLens<Structure, Key1Type extends keyof Structure>(
  key1: Key1Type
): WriteLens<Structure, Structure[Key1Type]>;
export function createPathWriteLens<
  Structure,
  Key1Type extends keyof Structure,
  Key2Type extends keyof Structure[Key1Type]
>(key1: Key1Type, key2: Key2Type): WriteLens<Structure, Structure[Key1Type][Key2Type]>;
export function createPathWriteLens<
  Structure,
  Key1Type extends keyof Structure,
  Key2Type extends keyof Structure[Key1Type],
  Key3Type extends keyof Structure[Key1Type][Key2Type]
>(key1: Key1Type, key2: Key2Type, key3: Key3Type): WriteLens<Structure, Structure[Key1Type][Key2Type][Key3Type]>;
export function createPathWriteLens<
  Structure,
  Key1Type extends keyof Structure,
  Key2Type extends keyof Structure[Key1Type],
  Key3Type extends keyof Structure[Key1Type][Key2Type],
  Key4Type extends keyof Structure[Key1Type][Key2Type][Key3Type]
>(
  key1: Key1Type,
  key2: Key2Type,
  key3: Key3Type,
  key4: Key4Type
): WriteLens<Structure, Structure[Key1Type][Key2Type][Key3Type][Key4Type]>;
export function createPathWriteLens<
  Structure,
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
): WriteLens<Structure, Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type]>;
export function createPathWriteLens<
  Structure,
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
): WriteLens<Structure, Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type]>;
export function createPathWriteLens<
  Structure,
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
): WriteLens<Structure, Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type]>;
export function createPathWriteLens<
  Structure,
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
): WriteLens<Structure, Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type]>;
export function createPathWriteLens<
  Structure,
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
): WriteLens<
  Structure,
  Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type][Key9Type]
>;
export function createPathWriteLens<
  Structure,
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
): WriteLens<
  Structure,
  Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type][Key9Type][Key10Type]
>;
export function createPathWriteLens<Structure, KeyTypes extends PropertyKey[]>(
  ...keys: KeyTypes
): WriteLens<Structure, unknown> {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set: (value) => (structure) => {
      if (!keys.length) {
        return value as Structure;
      }
      if (Array.isArray(structure) && typeof keys[0] === 'number') {
        return [...structure.slice(0, keys[0]), value, ...structure.slice(keys[0] + 1)];
      }
      return {
        ...structure,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [keys[0] as any]: createPathWriteLens(...keys.slice(1)).set(value)(structure[key[0]]),
      } as Structure;
    },
  };
}
