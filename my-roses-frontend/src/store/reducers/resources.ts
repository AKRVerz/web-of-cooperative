import _ from 'lodash';
import { combineReducers } from 'redux';
import { RESOURCE_NAME } from 'src/utils/constant';
import { hasOwnProperty } from 'src/utils/typeHelper';

interface IPayload<K> {
  id: number;
  data: K;
}

interface IPayloads<T extends Koperasi.Resource.ResourceName> {
  rows: Koperasi.Resource.ResourceStructure[T][];
  count: number;
}

interface IAction<
  T extends Koperasi.Resource.ResourceName,
  K extends Koperasi.Resource.ResourceStructure[T]
> {
  type: string;
  payload: IPayload<K> | IPayloads<T> | number;
}

const reducer =
  <
    T extends Koperasi.Resource.ResourceName,
    K extends Koperasi.Resource.ResourceStructure[T]
  >(
    resourceName: T
  ) =>
  (
    state: Koperasi.Resource.ResourceRecord<T> = { rows: {}, count: 0 },
    action: IAction<T, K>
  ) => {
    let temp: Koperasi.Resource.ResourceRecord<T> = { rows: {}, count: 0 };

    switch (action.type) {
      case `resources.${resourceName}.set`:
        if (
          !hasOwnProperty(action.payload, 'rows') ||
          _.isNumber(action.payload)
        )
          return state;

        const data = _.isArray(action.payload.rows)
          ? action.payload.rows
          : [action.payload.rows];

        return {
          ...state,
          rows: {
            ...state.rows,
            ..._.keyBy(data, 'id'),
          },
        };

      case `resources.${resourceName}.update`:
        if (
          hasOwnProperty(action.payload, 'rows') ||
          _.isNumber(action.payload)
        )
          return state;

        return {
          ...state,
          rows: {
            ...state.rows,
            [action.payload.id]: action.payload.data,
          },
        };

      case `resources.${resourceName}.delete`:
        if (!_.isNumber(action.payload)) return state;

        temp = _.cloneDeep(state);

        delete temp['rows'][action.payload];
        return temp;

      case `resources.${resourceName}.overwrite`:
        if (
          !hasOwnProperty(action.payload, 'rows') ||
          !hasOwnProperty(action.payload, 'count') ||
          _.isNumber(action.payload)
        )
          return state;

        const data1 = _.isArray(action.payload.rows)
          ? action.payload.rows
          : [action.payload.rows];

        return {
          rows: _.keyBy(data1, 'id'),
          count: action.payload.count,
        };

      default:
        return state;
    }
  };

const allReducer: Record<Koperasi.Resource.ResourceName, any> = {} as any;

_.forEach(RESOURCE_NAME, (resName: Koperasi.Resource.ResourceName) => {
  allReducer[resName] = reducer(resName);
});

export default combineReducers<Koperasi.Resource.Resources>(allReducer);
