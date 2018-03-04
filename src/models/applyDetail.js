import { queryBasicApplyDetail, queryAdvancedApplyDetail } from '../services/api';

export default {
  namespace: 'applyDetail',

  state: {
    basicGoods: [],
    advancedOperation1: [{
      title:'是否全面核实客户申请表中个人及公司名称、证件号、单位、居住等基本信息',
      checked:false,
    },{
      title:'申请表所填写信息是否真实',
      checked:false,
    },{
      title:'是否全面核实申请表中申请人等相关个人的申请意愿、共同偿债意愿、担保意愿',
      checked:false,
    },{
      title:'是否确定为本人签名、本人知情、本人同意办理',
      checked:true,
    }],
    advancedOperation2: [{
      title:'申请人购车行为是否属实',
      checked:false,
    },{
      title:'所购车辆为',
      checked:false,
    },{
      title:'所购车辆品牌、型号是否为真实存在',
      checked:false,
    }],
    advancedOperation3: [],
  },

  effects: {
    *fetchBasic(_, { call, put }) {
      const response = yield call(queryBasicApplyDetail);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchAdvanced(_, { call, put }) {
      const response = yield call(queryAdvancedApplyDetail);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
