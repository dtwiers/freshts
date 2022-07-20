import { LoadBehavior } from './actions.types';

export type HasBuilderName<BuilderNameType extends string> = {
  builderName: BuilderNameType;
};

export type HasFilterMetadata<FilterMetadataType> = {
  filterMetadata: FilterMetadataType;
};

export type HasLoadBehavior = {
  loadBehavior: LoadBehavior;
};

export type HasOptimisticPrediction<CallbackParamType, IdleType, SuccessType> = {
  prediction: (params: CallbackParamType) => (state: IdleType | SuccessType) => SuccessType;
};
