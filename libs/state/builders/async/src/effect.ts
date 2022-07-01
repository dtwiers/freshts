import { AnyAction, Effect } from '@eezo-state/store';
import {
  HasAsyncCallback,
  HasFailureType,
  HasIdleType,
  HasMapOnFailure,
  HasMapOnSuccess,
  HasSuccessType,
  HasTriggeringAction,
} from '@eezo-state/common';
import { AsyncState } from './state.types';

export type CreateAsyncEffectOptions<
  SuccessType,
  FailureType,
  IdleType,
  TriggerActionType extends AnyAction,
  CallbackOutput
> = HasSuccessType<SuccessType> &
  HasFailureType<FailureType> &
  HasIdleType<IdleType> &
  HasAsyncCallback<TriggerActionType, CallbackOutput> &
  HasTriggeringAction<TriggerActionType> &
  (CallbackOutput extends SuccessType
    ? HasMapOnSuccess<CallbackOutput, SuccessType | IdleType, SuccessType>
    : Partial<HasMapOnSuccess<CallbackOutput, SuccessType | IdleType, SuccessType>>) &
  Partial<HasMapOnFailure<FailureType, FailureType>>;

export const createAsyncEffect = <
  SuccessType,
  FailureType,
  IdleType,
  TriggerActionType extends AnyAction,
  CallbackOutput = SuccessType
>(
  options: CreateAsyncEffectOptions<SuccessType, FailureType, IdleType, TriggerActionType, CallbackOutput>
): Effect<AsyncState<IdleType, SuccessType, FailureType>> => {
  const startEffect: Effect<AsyncState<IdleType, SuccessType, FailureType>> = (action$, state$) => action$.pipe()
  const resultEffect: Effect<AsyncState<IdleType, SuccessType, FailureType>> = (action$, state$) => action$.pipe()
  
  // TODO: make a combineEffects function
  return {} as any;
};
