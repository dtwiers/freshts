export type ReadLens<StructureType, TargetType> = {
  get: (structure: StructureType) => TargetType;
};

export type WriteLens<StructureType, TargetType> = {
  set: (value: TargetType) => (structure: StructureType) => StructureType;
};

export type Lens<StructureType, TargetType> = ReadLens<StructureType, TargetType> &
  WriteLens<StructureType, TargetType>;
