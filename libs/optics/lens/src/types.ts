export type Lens<StructureType, TargetType> = {
  get: (structure: StructureType) => TargetType;
  set: (value: TargetType) => (structure: StructureType) => StructureType;
};
