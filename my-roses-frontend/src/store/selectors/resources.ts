import _ from 'lodash';
import { RootState } from 'src/store';

export const getResource =
  <T extends Koperasi.Resource.ResourceName>(resourceName: T) =>
  (state: RootState) =>
    state.resources[resourceName] as Koperasi.Resource.Resources[T];

export const getResourceById =
  <T extends Koperasi.Resource.ResourceName>(resourceName: T, id: number) =>
  (state: RootState) =>
    getResource(resourceName)(state).rows[
      id
    ] as Koperasi.Resource.ResourceStructure[T];

export const getResourceCounts =
  <T extends Koperasi.Resource.ResourceName>(resourceName: T) =>
  (state: RootState) =>
    state.resources[resourceName].count;
