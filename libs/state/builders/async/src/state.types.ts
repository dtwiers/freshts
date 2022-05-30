import type { FAILURE_STATUS, IDLE_STATUS, LOADING_MORE_STATUS, LOADING_STATUS, SUCCESS_STATUS } from './constants';

type BaseAsyncState<StatusType extends string, PayloadType> = {
  status: StatusType;
  payload: PayloadType;
};

export type AsyncIdleState<IdleType> = BaseAsyncState<typeof IDLE_STATUS, IdleType>;
export type AsyncLoadingState<LoadingType> = BaseAsyncState<typeof LOADING_STATUS, LoadingType>;
export type AsyncLoadingMoreState<LoadingMoreType> = BaseAsyncState<typeof LOADING_MORE_STATUS, LoadingMoreType>;
export type AsyncSuccessState<SuccessType> = BaseAsyncState<typeof SUCCESS_STATUS, SuccessType>;
export type AsyncFailureState<PayloadType, FailureType> = BaseAsyncState<typeof FAILURE_STATUS, PayloadType> & {
  failure: FailureType;
};

export type AsyncState<IdleType, SuccessType, FailureType> =
  | AsyncIdleState<IdleType>
  | AsyncLoadingState<IdleType | SuccessType>
  | AsyncLoadingMoreState<SuccessType>
  | AsyncSuccessState<SuccessType>
  | AsyncFailureState<IdleType | SuccessType, FailureType>;

export type AsyncStatus = AsyncState<unknown, unknown, unknown>['status'];
