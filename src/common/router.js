import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
      ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/dashboard/analysis': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
    },
    '/dashboard/monitor': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
      // hideInBreadcrumb: true,
      // name: '工作台',
      // authority: 'admin',
    },
    //-----------------------首页
    '/home/home-page': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Home/HomePage')),
    },
    //------------------------项目审核
    '/apply/apply-list': {
      component: dynamicWrapper(app, ['loan'], () => import('../routes/Apply/ApplyList')),
    },
    '/apply/apply-profile': {
      component: dynamicWrapper(app, ['applyDetail'], () => import('../routes/Apply/ApplyProfile')),
    },
    '/apply/apply-profile2': {
      component: dynamicWrapper(app, ['applyDetail'], () => import('../routes/Apply/ApplyProfile2')),
    },
    '/apply/apply-profile3': {
      component: dynamicWrapper(app, ['applyDetail'], () => import('../routes/Apply/ApplyProfile3')),
    },
    '/apply/apply-profile4': {
      component: dynamicWrapper(app, ['applyDetail'], () => import('../routes/Apply/ApplyProfile4')),
    },
    '/apply/apply-profile5': {
      component: dynamicWrapper(app, ['applyDetail'], () => import('../routes/Apply/ApplyProfile5')),
    },
    '/apply/apply-profile6': {
      component: dynamicWrapper(app, ['applyDetail'], () => import('../routes/Apply/ApplyProfile6')),
    },
    //---------------------审批管理
    '/review/pending-task': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Review/PendingTask')),
    },
    '/review/completed-task': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Review/CompletedTask')),
    },
    //---------------------申请管理
    '/reporting/credit-reporting-queries': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Reporting/CreditReportingQueries')),
    },
    '/reporting/inquiry-details': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Reporting/InquiryDetails')),
    },
    //---------------------产品管理
    '/product/product-catalog': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Product/ProductCatalog')),
    },
    '/product/product-add': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Product/ProductAdd')),
    },
    '/product/product-business-analysis': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Product/ProductBusinessAnalysis')),
    },
    //---------------------渠道管理
    '/channel/channel-maintenance': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Channel/ChannelMaintenance')),
    },
    '/channel/channel-analysis': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Channel/ChannelAnalysis')),
    },
    '/channel/channel-subsidiary': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Channel/ChannelSubsidiary')),
    },
    '/channel/create-channel': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Channel/CreateChannel')),
    },
    '/channel/channel-activation': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Channel/ChannelActivation')),
    },
    '/channel/channel-details': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Channel/ChannelDetails')),
    },
    '/channel/poor-statistics': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Channel/PoorStatistics')),
    },
    //---------------------系统配置
    '/system/structure-maintenance': {
      component: dynamicWrapper(app, ['system'], () => import('../routes/System/StructureMaintenance')),
    },
    '/system/staff-management': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/System/StaffManagement')),
    },
    '/system/user-management': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/System/UserManagement')),
    },
    '/system/role-management': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/System/RoleManagement')),
    },
    '/system/user-details': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/System/UserDetails')),
    },
    '/system/post-maintenance': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/System/PostMaintenance')),
    },
    '/system/role-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/System/RoleList')),
    },
    


    '/form/basic-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
    },
    '/form/step-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
    },
    '/form/step-form/info': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
    },
    '/form/step-form/confirm': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
    },
    '/form/step-form/result': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
    },
    '/list/table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
    },
    '/list/basic-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
    },
    '/list/card-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
    },
    '/list/search': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
    },
    '/list/search/projects': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
    },
    '/list/search/applications': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
    },
    '/list/search/articles': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
    },
    '/profile/basic': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
    },
    '/profile/advanced': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/AdvancedProfile')),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    //----------------------修改密码
    '/user/updata-password': {
      component: dynamicWrapper(app, [], () => import('../routes/User/UpdataPassword')),
    },

    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach((path) => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`/${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
    };
    routerData[path] = router;
  });
  return routerData;
};
