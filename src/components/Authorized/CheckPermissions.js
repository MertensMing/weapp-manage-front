import React from 'react';
import _ from 'lodash';
import PromiseRender from './PromiseRender';
import { getAuthority } from '@/utils/authority';

/**
 * 通用权限检查方法
 * @param { 访问组件需要的权限 type string | array | Promise | Function } authority
 * @param { 通过的组件 } targetComponent
 * @param { 未通过的组件 } exceptionComponent
 */

const checkPermissions = (authority, targetComponent, exceptionComponent) => {

  // 你的权限
  const currentAuthority = getAuthority();

  // 没有判定权限，直接可以访问
  if (!authority) {
    return targetComponent;
  }

  // 数组处理
  if (_.isArray(currentAuthority)) {
    const isAuth = (item) => {
      return currentAuthority.includes(item);
    };
    // 如果访问组件需要拥有一系列的权限，要每个权限都拥有才能访问
    if (_.isArray(authority)) {
      if (authority.every(isAuth)) {
        return targetComponent;
      }
    } else if (isAuth(authority)) {
      return targetComponent;
    }
    return exceptionComponent;
  }

  // string 处理
  if (_.isString(currentAuthority)) {
    if (currentAuthority === authority) {
      return targetComponent;
    }
    return exceptionComponent;
  }

  // Promise 处理
  if (authority.constructor.name === 'Promise') {
    return () => (
      <PromiseRender ok={targetComponent} error={exceptionComponent} promise={authority} />
    );
  }

  // Function 处理
  if (_.isFunction(authority)) {
    try {
      const bool = authority();
      if (bool) {
        return targetComponent;
      }
      return exceptionComponent;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('unsupported parameters');
};

export { checkPermissions };

export default function(authority, targetComponent, exceptionComponent) {
  return checkPermissions(authority, targetComponent, exceptionComponent);
};
