import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryBasicApplyDetail() {
  return request('/api/profile/basic');
}

export async function queryAdvancedApplyDetail() {
  //return request('/api/profile/advanced');
  return request('http://192.168.2.32:9050/v1/user/detail/1');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {

  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeAccountLogin2(params) {
  return request('http://192.168.2.32:9050/v1/user/create', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}


export async function queryApplyList(params){
  return request('http://192.168.2.32:9050/v1/user/applyList',{
    method: 'POST',
    body: params,
  });
  }

  export async function loginToLoki(params) {
    return request(`http://192.168.2.32:9050/v1/user/login`, {
      method: 'POST',
      directlyPost: true,
      body: params,
    });
  }
  
  export async function logout() {
    return request(`$/api/oss/user/logout`);
  }
  

