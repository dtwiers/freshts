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

const IDLE_TYPE = Symbol('IDLE_TYPE');
export type HasIdleType<IdleType> = {
  [IDLE_TYPE]?: IdleType;
};

const SUCCESS_TYPE = Symbol('SUCCESS_TYPE');
export type HasSuccessType<SuccessType> = {
  [SUCCESS_TYPE]?: SuccessType;
};

const FAILURE_TYPE = Symbol('FAILURE_TYPE');
export type HasFailureType<FailureType> = {
  [FAILURE_TYPE]?: FailureType;
};
