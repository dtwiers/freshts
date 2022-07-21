import { AnyAction, combineEffects, Effect, ofType } from '@eezo-state/store';
import {
  HasAsyncCallback,
  HasFailureType,
  HasIdleType,
  HasMapOnFailure,
  HasMapOnSuccess,
  HasSuccessType,
  HasTriggeringAction,
} from '@eezo-state/common';
import { AsyncFailureState, AsyncState } from './state.types';
import { from, map, switchMap, withLatestFrom } from 'rxjs';
import { buildAsyncFailure, buildAsyncRevert, buildAsyncStart, buildAsyncSuccess } from './actions';
import { HasBuilderName, HasFilterMetadata, HasLoadBehavior, HasOptimisticPrediction } from './builder.types';
import { extractResult, fail, mapOk, ok, Result } from '@freshts/result';
import { pipe } from '@freshts/compose';

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
  HasBuilderName<BuilderNameType> &
  Partial<
    HasMapOnFailure<FailureType, FailureType> &
      HasFilterMetadata<FilterMetadataType> &
      HasLoadBehavior &
      HasOptimisticPrediction<TriggerActionType['payload'], SuccessType, IdleType>
  >;

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
  const actionCreatorBuilder = {
    builderName: options.builderName,
    filterMetadata: options.filterMetadata as FilterMetadataType,
  };
  const startEffect: Effect<AsyncState<IdleType, SuccessType, FailureType>> = (action$, state$) =>
    action$.pipe(
      ofType(options.triggeringAction),
      withLatestFrom(state$),
      map(([action, state]) => {
        return buildAsyncStart({
          ...actionCreatorBuilder,
          loadBehavior: state.status !== 'idle' && options.loadBehavior ? options.loadBehavior : 'replace',
        }).create(options.prediction ? options.prediction(action.payload)(state.payload) : state.payload);
      })
    );

  const mainEffect: Effect<AsyncState<IdleType, SuccessType, FailureType>> = (action$, state$) =>
    action$.pipe(
      ofType(options.triggeringAction),
      withLatestFrom(state$),
      switchMap(([action, state]) =>
        from<Promise<Result<CallbackOutput, FailureType>>>(options.asyncCallback(action).then(ok).catch(fail)).pipe(
          map((result) => ({ result, oldState: state } as const))
        )
      ),
      withLatestFrom(state$),
      switchMap(([{ result, oldState }, newerState]) =>
        pipe(
          result,
          extractResult<CallbackOutput, FailureType, AnyAction[]>(
            (success) => [
              buildAsyncSuccess(actionCreatorBuilder).create(
                options.mapOnSuccess ? options.mapOnSuccess(success)(newerState.payload) : success
              ),
            ],
            (failure) => [
              buildAsyncFailure(actionCreatorBuilder).create(
                options.mapOnFailure
                  ? options.mapOnFailure(failure)(
                      (newerState as AsyncFailureState<IdleType | SuccessType, FailureType>).failure
                    )
                  : failure
              ),
              ...(options.prediction ? [buildAsyncRevert(actionCreatorBuilder).create(oldState)] : []),
            ]
          )
        )
      )
    );

  const asyncEffect = combineEffects(startEffect, mainEffect);
  return asyncEffect;
};
