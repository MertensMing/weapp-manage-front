import React from 'react';
import dynamic from '@/utils/dynamic';
import { getMenuData } from './menu';

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
      authority: ['admin'],
      component: dynamic(() => import(/* webpackChunkName: "BasicLayout" */'@/layouts/BasicLayout')),
    },
    '/team': {
      name: '球队管理',
      authority: ['admin'],
      component: dynamic(() => import(/* webpackChunkName: "TeamList" */'@/pages/team/list')),
    },
    '/train': {
      name: '训练管理',
      authority: ['admin'],
      component: dynamic(() => import(/* webpackChunkName: "TeamList" */'@/pages/team/list')),
    },
    '/setting/me': {
      authority: ['admin'],
      component: dynamic(() => import(/* webpackChunkName: "Me" */'@/pages/setting/me')),
    },
    '/user': {
      name: '用户',
      authority: ['guest'],
      component: dynamic(() => import(/* webpackChunkName: "UserLayout" */'@/layouts/UserLayout')),
    },
    '/user/login': {
      name: '用户登录',
      authority: ['guest'],
      component: dynamic(() => import(/* webpackChunkName: "Login" */'@/pages/user/login')),
    },
    '/user/reset-passwd': {
      name: '重置密码',
      authority: ['guest'],
      component: dynamic(() => import(/* webpackChunkName: "ResetPasswd" */'@/pages/user/reset-passwd')),
    },
  };
  const menuData = getFlatMenuData(getMenuData());
  const routerData = {};
  Object.keys(routerConfig).forEach((item) => {
    const menuItem = menuData[item.replace(/^\//, '')] || {};
    routerData[item] = {
      name: routerConfig[item].name || menuItem.name,
      authority: routerConfig[item].authority || menuItem.authority,
      ...routerConfig[item],
    };
  });
  return routerData;
};
