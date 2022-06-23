import { withInnerLens } from './compose';
import { PathLensCreator } from './path-lens';
import { Lens } from './types';

export function extendPath<StructureType, OriginalTargetType>(
  lens: Lens<StructureType, OriginalTargetType>
): Lens<StructureType, OriginalTargetType>;
export function extendPath<StructureType, OriginalTargetType, Key1Type extends keyof OriginalTargetType>(
  lens: Lens<StructureType, OriginalTargetType>,
  key1: Key1Type
): Lens<StructureType, OriginalTargetType[Key1Type]>;
export function extendPath<
  StructureType,
  OriginalTargetType,
  Key1Type extends keyof OriginalTargetType,
  Key2Type extends keyof OriginalTargetType[Key1Type]
>(
  lens: Lens<StructureType, OriginalTargetType>,
  key1: Key1Type,
  key2: Key2Type
): Lens<StructureType, OriginalTargetType[Key1Type][Key2Type]>;
export function extendPath<
  StructureType,
  OriginalTargetType,
  Key1Type extends keyof OriginalTargetType,
  Key2Type extends keyof OriginalTargetType[Key1Type],
  Key3Type extends keyof OriginalTargetType[Key1Type][Key2Type]
>(
  lens: Lens<StructureType, OriginalTargetType>,
  key1: Key1Type,
  key2: Key2Type,
  key3: Key3Type
): Lens<StructureType, OriginalTargetType[Key1Type][Key2Type][Key3Type]>;
export function extendPath<
  StructureType,
  OriginalTargetType,
  Key1Type extends keyof OriginalTargetType,
  Key2Type extends keyof OriginalTargetType[Key1Type],
  Key3Type extends keyof OriginalTargetType[Key1Type][Key2Type],
  Key4Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type]
>(
  lens: Lens<StructureType, OriginalTargetType>,
  key1: Key1Type,
  key2: Key2Type,
  key3: Key3Type,
  key4: Key4Type
): Lens<StructureType, OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type]>;
export function extendPath<
  StructureType,
  OriginalTargetType,
  Key1Type extends keyof OriginalTargetType,
  Key2Type extends keyof OriginalTargetType[Key1Type],
  Key3Type extends keyof OriginalTargetType[Key1Type][Key2Type],
  Key4Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type],
  Key5Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type]
>(
  lens: Lens<StructureType, OriginalTargetType>,
  key1: Key1Type,
  key2: Key2Type,
  key3: Key3Type,
  key4: Key4Type,
  key5: Key5Type
): Lens<StructureType, OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type]>;
export function extendPath<
  StructureType,
  OriginalTargetType,
  Key1Type extends keyof OriginalTargetType,
  Key2Type extends keyof OriginalTargetType[Key1Type],
  Key3Type extends keyof OriginalTargetType[Key1Type][Key2Type],
  Key4Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type],
  Key5Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type],
  Key6Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type]
>(
  lens: Lens<StructureType, OriginalTargetType>,
  key1: Key1Type,
  key2: Key2Type,
  key3: Key3Type,
  key4: Key4Type,
  key5: Key5Type,
  key6: Key6Type
): Lens<StructureType, OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type]>;
export function extendPath<
  StructureType,
  OriginalTargetType,
  Key1Type extends keyof OriginalTargetType,
  Key2Type extends keyof OriginalTargetType[Key1Type],
  Key3Type extends keyof OriginalTargetType[Key1Type][Key2Type],
  Key4Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type],
  Key5Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type],
  Key6Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type],
  Key7Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type]
>(
  lens: Lens<StructureType, OriginalTargetType>,
  key1: Key1Type,
  key2: Key2Type,
  key3: Key3Type,
  key4: Key4Type,
  key5: Key5Type,
  key6: Key6Type,
  key7: Key7Type
): Lens<StructureType, OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type]>;
export function extendPath<
  StructureType,
  OriginalTargetType,
  Key1Type extends keyof OriginalTargetType,
  Key2Type extends keyof OriginalTargetType[Key1Type],
  Key3Type extends keyof OriginalTargetType[Key1Type][Key2Type],
  Key4Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type],
  Key5Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type],
  Key6Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type],
  Key7Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type],
  Key8Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type]
>(
  lens: Lens<StructureType, OriginalTargetType>,
  key1: Key1Type,
  key2: Key2Type,
  key3: Key3Type,
  key4: Key4Type,
  key5: Key5Type,
  key6: Key6Type,
  key7: Key7Type,
  key8: Key8Type
): Lens<
  StructureType,
  OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type]
>;
export function extendPath<
  StructureType,
  OriginalTargetType,
  Key1Type extends keyof OriginalTargetType,
  Key2Type extends keyof OriginalTargetType[Key1Type],
  Key3Type extends keyof OriginalTargetType[Key1Type][Key2Type],
  Key4Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type],
  Key5Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type],
  Key6Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type],
  Key7Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type],
  Key8Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type],
  Key9Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type]
>(
  lens: Lens<StructureType, OriginalTargetType>,
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
  StructureType,
  OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type][Key9Type]
>;
export function extendPath<
  StructureType,
  OriginalTargetType,
  Key1Type extends keyof OriginalTargetType,
  Key2Type extends keyof OriginalTargetType[Key1Type],
  Key3Type extends keyof OriginalTargetType[Key1Type][Key2Type],
  Key4Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type],
  Key5Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type],
  Key6Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type],
  Key7Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type],
  Key8Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type],
  Key9Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type],
  Key10Type extends keyof OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type][Key9Type]
>(
  lens: Lens<StructureType, OriginalTargetType>,
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
  StructureType,
  OriginalTargetType[Key1Type][Key2Type][Key3Type][Key4Type][Key5Type][Key6Type][Key7Type][Key8Type][Key9Type][Key10Type]
>;
export function extendPath<StructureType, OriginalTargetType, KeysType extends PropertyKey[]>(
  lens: Lens<StructureType, OriginalTargetType>,
  ...keys: KeysType[]
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
Lens<StructureType, any> {
  const creator = new PathLensCreator<OriginalTargetType>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return withInnerLens((creator.fromPath as any)(...keys) as Lens<OriginalTargetType, unknown>)(lens);
}
