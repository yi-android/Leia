import { isUrl } from '../utils/utils';

const menuData = [
  // {
  //   name: '项目审核',
  //   icon: 'table',
  //   path: 'apply',
  //   children: [ 
  //     {
  //       name: '项目列表',
  //       path: 'apply-list',
  //     }, 
  //     {
  //       name: '项目详情',
  //       path: 'apply-profile',
  //     }, 
  //     {
  //       name: '项目详情',
  //       path: 'apply-profile2',
  //       hideInMenu: true,
  //     }, 
  //     {
  //       name: '项目详情',
  //       path: 'apply-profile3',
  //       hideInMenu: true,
  //     }, 
  //     {
  //       name: '项目详情',
  //       path: 'apply-profile4',
  //       hideInMenu: true,
  //     }, 
  //     {
  //       name: '项目详情',
  //       path: 'apply-profile5',
  //       hideInMenu: true,
  //     }, 
  //     {
  //       name: '项目详情',
  //       path: 'apply-profile6',
  //       hideInMenu: true,
  //     }, 
  //   ],
  // },
  {
    name: '首页',
    icon: 'table',
    path: 'home',
    children: [ 
      {
        name: '首页',
        path: 'home-page',
      },   
    ],
  },
  {
    name: '审批管理',
    icon: 'table',
    path: 'review',
    children: [ 
      {
        name: '待办任务',
        path: 'pending-task',
      }, 
      {
        name: '已办任务',
        path: 'completed-task',
      },  
    ],
  },
  {
    name: '申请管理',
    icon: 'setting',
    path: 'reporting',
    children: [ 
      {
        name: '征信查询',
        path: 'credit-reporting-queries',
      }, 
      {
        name: '视频面签',
        path: 'video-face',
      },  
    ],
  },
  {
    name: '产品管理',
    icon: 'setting',
    path: 'product',
    children: [ 
      {
        name: '产品目录',
        path: 'product-catalog',
      }, 
      {
        name: '产品业务分析',
        path: 'product-business-analysis',
      },  
    ],
  },
  {
    name: '渠道管理',
    icon: 'setting',
    path: 'channel',
    children: [ 
      {
        name: '渠道维护',
        path: 'channel-maintenance',
      }, 
      {
        name: '渠道分析',
        path: 'channel-analysis',
      },  
    ],
  },

  {
    name: '系统配置',
    icon: 'setting',
    path: 'system',
    children: [ 
      {
        name: '组织架构维护',
        path: 'structure-maintenance',
      }, 
      {
        name: '员工管理',
        path: 'staff-management',
      }, 
      {
        name: '用户管理',
        path: 'user-management',
        // hideInMenu: true,
      }, 
      {
        name: '角色管理',
        path: 'role-management',
        // hideInMenu: true,
      }, 
    ],
  },

  {
  name: 'dashboard',
  icon: 'dashboard',
  path: 'dashboard',
  hideInMenu: true,
  children: [{
    name: '分析页',
    path: 'analysis',
  }, {
    name: '监控页',
    path: 'monitor',
  }, {
    name: '工作台',
    path: 'workplace',
    // hideInMenu: true,
  }],
}, {
  name: '表单页',
  icon: 'form',
  path: 'form',
  hideInMenu: true,
  children: [{
    name: '基础表单',
    path: 'basic-form',
  }, {
    name: '分步表单',
    path: 'step-form',
  }, {
    name: '高级表单',
    authority: 'admin',
    path: 'advanced-form',
  }],
}, 


{
  name: '列表页',
  icon: 'table',
  path: 'list',
  hideInMenu: true,
  children: [
    {
      name: '项目列表',
      path: 'apply-list',
    }, 
    {
    name: '查询表格',
    path: 'table-list',
  }, {
    name: '标准列表',
    path: 'basic-list',
  }, {
    name: '卡片列表',
    path: 'card-list',
  }, {
    name: '搜索列表',
    path: 'search',
    children: [{
      name: '搜索列表（文章）',
      path: 'articles',
    }, {
      name: '搜索列表（项目）',
      path: 'projects',
    }, {
      name: '搜索列表（应用）',
      path: 'applications',
    }],
  }],
}, {
  name: '详情页',
  icon: 'profile',
  path: 'profile',
  hideInMenu: true,
  children: [{
    name: '基础详情页',
    path: 'basic',
  }, {
    name: '高级详情页',
    path: 'advanced',
    authority: 'admin',
  }],
}, {
  name: '结果页',
  icon: 'check-circle-o',
  path: 'result',
  hideInMenu: false,
  children: [{
    name: '成功',
    path: 'success',
  }, {
    name: '失败',
    path: 'fail',
  }],
}, {
  name: '异常页',
  icon: 'warning',
  path: 'exception',
  hideInMenu: true,
  children: [{
    name: '403',
    path: '403',
  }, {
    name: '404',
    path: '404',
  }, {
    name: '500',
    path: '500',
  }, {
    name: '触发异常',
    path: 'trigger',
    hideInMenu: true,
  }],
}, {
  name: '账户',
  icon: 'user',
  path: 'user',
  hideInMenu: true,
  
  authority: 'guest',
  children: [{
    name: '登录',
    path: 'login',
  }, {
    name: '注册',
    path: 'register',
  }, {
    name: '注册结果',
    path: 'register-result',
  }],
}];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
