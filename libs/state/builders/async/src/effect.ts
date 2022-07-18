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
import { map, withLatestFrom } from 'rxjs';
import { makeAsyncStart } from './actions';
import { HasBuilderName, HasFilterMetadata } from './builder.types';

export type CreateAsyncEffectOptions<
  BuilderNameType extends string,
  SuccessType,
  FailureType,
  IdleType,
  TriggerActionType extends AnyAction,
  CallbackOutput,
  FilterMetadataType = undefined
> = HasSuccessType<SuccessType> &
  HasFailureType<FailureType> &
  HasIdleType<IdleType> &
  HasAsyncCallback<TriggerActionType, CallbackOutput> &
  HasTriggeringAction<TriggerActionType> &
  (CallbackOutput extends SuccessType
    ? HasMapOnSuccess<CallbackOutput, SuccessType | IdleType, SuccessType>
    : Partial<HasMapOnSuccess<CallbackOutput, SuccessType | IdleType, SuccessType>>) &
  Partial<HasMapOnFailure<FailureType, FailureType>> &
  HasBuilderName<BuilderNameType> &
  Partial<HasFilterMetadata<FilterMetadataType>>;

export const createAsyncEffect = <
  BuilderNameType extends string,
  SuccessType,
  FailureType,
  IdleType,
  TriggerActionType extends AnyAction,
  CallbackOutput = SuccessType,
  FilterMetadataType = undefined
>(
  options: CreateAsyncEffectOptions<
    BuilderNameType,
    SuccessType,
    FailureType,
    IdleType,
    TriggerActionType,
    CallbackOutput,
    FilterMetadataType
  >
): Effect<AsyncState<IdleType, SuccessType, FailureType>> => {
  const startEffect: Effect<AsyncState<IdleType, SuccessType, FailureType>> = (action$, state$) =>
    action$.pipe(
      ofType(options.triggeringAction),
      withLatestFrom(state$),
      map(([, state]) => {
        return makeAsyncStart({
          actionKey: options.builderName,
          loadBehavior: 'replace', // TODO: Don't hardcode this
          meta: options.filterMetadata as FilterMetadataType,
        }).create(state.payload);
      })
    );
  const resultEffect: Effect<AsyncState<IdleType, SuccessType, FailureType>> = (action$, state$) => action$.pipe();

  // TODO: make a combineEffects function
  return {} as any;
};
