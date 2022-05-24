import { Subject } from 'rxjs';
import { StoreEvent } from './store.types';

export const createEventLogger = (storeEvent$: Subject<StoreEvent>) => ({
  log: (message: string) => storeEvent$.next({ severity: 'log', message }),
  warn: (message: string) => storeEvent$.next({ severity: 'warn', message }),
  error: (message: string) => storeEvent$.next({ severity: 'error', message }),
});
