import { routerRedux } from 'dva/router';
import { fakeAccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

import { loginToLoki, logout } from '../services/api';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    submitting: false,
  },

  effects: {
    *accountSubmit({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(loginToLoki, payload);
//      console.debug(response);
      // alert("hihihi");
 //     response.status = response.result.message === 'undefined' ? 'ok' : 'error';
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
/*       
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
*/
      if(response.result.success){
        reloadAuthorized();
        yield put(routerRedux.push('/'));
//        yield put(routerRedux.push('/dashboard/analysis'));
      }else{
        alert("fail");
      }
    },
    *logout({payload}, { call, put }) {
      const response = yield call(logout, payload);
      yield put(routerRedux.push('/user/login'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },
};
