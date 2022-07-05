export type HasBuilderName<BuilderNameType extends string> = {
  builderName: BuilderNameType;
};

export type HasFilterMetadata<FilterMetadataType> = {
  filterMetadata: FilterMetadataType;
};
