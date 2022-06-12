import { ReadLens } from './types';

export function createPathReadLens<Structure>(): ReadLens<Structure, Structure>;
export function createPathReadLens<Structure, Key1Type extends keyof Structure>(
  key1: Key1Type
): ReadLens<Structure, Structure[Key1Type]>;
export function createPathReadLens<
  Structure,
  Key1Type extends keyof Structure,
  Key2Type extends keyof Structure[Key1Type]
>(key1: Key1Type, key2: Key2Type): ReadLens<Structure, Structure[Key1Type][Key2Type]>;
export function createPathReadLens<
  Structure,
  Key1Type extends keyof Structure,
  Key2Type extends keyof Structure[Key1Type],
  Key3Type extends keyof Structure[Key1Type][Key2Type]
>(key1: Key1Type, key2: Key2Type, key3: Key3Type): ReadLens<Structure, Structure[Key1Type][Key2Type][Key3Type]>;
export function createPathReadLens<
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
): ReadLens<Structure, Structure[Key1Type][Key2Type][Key3Type][Key4Type]>;
export function createPathReadLens<
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
): ReadLens<Structure, Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type]>;
export function createPathReadLens<
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
): ReadLens<Structure, Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type]>;
export function createPathReadLens<
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
): ReadLens<Structure, Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type]>;
export function createPathReadLens<
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
): ReadLens<Structure, Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type]>;
export function createPathReadLens<
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
): ReadLens<
  Structure,
  Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type][Key9Type]
>;
export function createPathReadLens<
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
): ReadLens<
  Structure,
  Structure[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type][Key9Type][Key10Type]
>;
export function createPathReadLens<Structure, KeyTypes extends PropertyKey[]>(
  ...keys: KeyTypes
): ReadLens<Structure, unknown> {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get: (structure) => keys.reduce((accum, curr) => (accum as any)?.[curr], structure),
  };
}
