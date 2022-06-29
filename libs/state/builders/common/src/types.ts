import type { Lens } from '@eezo-optics/lens';

export type HasLens<GlobalStateType, TargetType> = {
  lens: Lens<GlobalStateType, TargetType>;
};
