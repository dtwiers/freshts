import { useEffect, useState } from 'react';
import { select, Store } from '@freshts/state';

export const useSelector = <StateType, TargetType>(
  store: Store<StateType>,
  mappingFn: (state: StateType) => TargetType,
  memoizationFn?: (val1: TargetType, val2: TargetType) => boolean
) => {
  const [state, setState] = useState(mappingFn(store.state));
  useEffect(() => {
    const sub = select(store.state$, mappingFn, memoizationFn).subscribe({
      next: setState,
    });
    return () => sub.unsubscribe();
  });
  return state;
};
