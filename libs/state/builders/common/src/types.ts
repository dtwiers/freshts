import type { Lens } from '@freshts/optics-lens';
import { ActionMatcher, AnyAction } from '@freshts/state';

export type HasLens<GlobalStateType, TargetType> = {
  lens: Lens<GlobalStateType, TargetType>;
};

const IDLE_SYMBOL = Symbol('IdleType');
const SUCCESS_SYMBOL = Symbol('SuccessType');
const FAILURE_SYMBOL = Symbol('FailureType');

export type HasSuccessType<SuccessType> = {
  [SUCCESS_SYMBOL]?: SuccessType;
};

export type HasIdleType<IdleType> = {
  [IDLE_SYMBOL]?: IdleType;
};

export type HasFailureType<FailureType> = {
  [FAILURE_SYMBOL]?: FailureType;
};

export type HasTriggeringAction<ActionType extends AnyAction> = {
  triggeringAction: ActionMatcher<ActionType>;
};

export type HasMapOnSuccess<InputType, InputStateType, OutputStateType> = {
  mapOnSuccess: (input: InputType) => (state: InputStateType) => OutputStateType;
};

export type HasMapOnFailure<InputStateFailureType, OutputStateFailureType> = {
  mapOnFailure: (
    inputFailure: unknown
  ) => (previousFailure?: InputStateFailureType | undefined) => OutputStateFailureType;
};

export type HasAsyncCallback<InputActionType extends AnyAction, OutputType> = {
  asyncCallback: (input: InputActionType) => Promise<OutputType>;
};

export type HasPrediction<InputType, InputStateType, OutputStateType> = {
  prediction: (input: InputType) => (state: InputStateType) => OutputStateType;
};

export type HasActionBehavior = {
  actionBehavior: string;
};
