import { distinctUntilChanged, map, Observable } from 'rxjs';

export const select = <StateType, TargetType>(
  startingState: Observable<StateType>,
  mappingFunction: (state: StateType) => TargetType,
  memoizationFn?: (val1: TargetType, val2: TargetType) => boolean
): Observable<TargetType> => startingState.pipe(map(mappingFunction), distinctUntilChanged(memoizationFn));
