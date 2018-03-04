import { queryApplyList } from '../services/api';

export default {
  namespace: 'loan',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryApplyList, payload);

      console.log("queryApplyList from libo ok");
        console.log(response);

      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: {
            list: action.payload.data,
            pagination: {},
        },
      };
    },
  },
};
