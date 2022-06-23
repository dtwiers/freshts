import { Lens } from './types';
import { applyWith, pipe } from '@freshts/utility-compose';

export const withInnerLens =
  <InnerStructureType, TargetType>(innerLens: Lens<InnerStructureType, TargetType>) =>
  <OuterStructureType>(
    outerLens: Lens<OuterStructureType, InnerStructureType>
  ): Lens<OuterStructureType, TargetType> => ({
    get: (structure) => pipe(structure, outerLens.get, innerLens.get),
    set: (value) => (structure) =>
      pipe(structure, outerLens.get, innerLens.set(value), outerLens.set, applyWith(structure)),
  });

export const withOuterLens =
  <OuterStructureType, InnerStructureType>(outerLens: Lens<OuterStructureType, InnerStructureType>) =>
  <TargetType>(innerLens: Lens<InnerStructureType, TargetType>): Lens<OuterStructureType, TargetType> => ({
    get: (structure) => pipe(structure, outerLens.get, innerLens.get),
    set: (value) => (structure) =>
      pipe(structure, outerLens.get, innerLens.set(value), outerLens.set, applyWith(structure)),
  });
