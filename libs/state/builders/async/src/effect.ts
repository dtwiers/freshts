import { AnyAction, Effect, ofType } from '@eezo-state/store';
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
import { map } from 'rxjs';
import { makeAsyncStart } from './actions';
import { HasBuilderName, HasFilterMetadata } from './builder.types';

export type CreateAsyncEffectOptions<
  BuilderNameType extends string,
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
  Partial<HasMapOnFailure<FailureType, FailureType>> &
  HasBuilderName<BuilderNameType> & HasFilterMetadata

export const createAsyncEffect = <
  BuilderNameType extends string,
  SuccessType,
  FailureType,
  IdleType,
  TriggerActionType extends AnyAction,
  CallbackOutput = SuccessType
>(
  options: CreateAsyncEffectOptions<BuilderNameType, SuccessType, FailureType, IdleType, TriggerActionType, CallbackOutput>
): Effect<AsyncState<IdleType, SuccessType, FailureType>> => {
  const startEffect: Effect<AsyncState<IdleType, SuccessType, FailureType>> = (action$, state$) =>
    action$.pipe(
      ofType(options.triggeringAction),
      map((action) => makeAsyncStart({actionKey: options.builderName, filterMetadata: options.fil}))
    );
  const resultEffect: Effect<AsyncState<IdleType, SuccessType, FailureType>> = (action$, state$) => action$.pipe();

  // TODO: make a combineEffects function
  return {} as any;
};
