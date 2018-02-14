import _ from 'lodash';

const STOREAGE_NAME = 'usoccer-admin-authority';

/**
 * 认证信息：从服务端获取
 * 每次请求更新
 */
export function getAuthority() {
  let authority = 'guest';
  try {
    authority = localStorage.getItem(STOREAGE_NAME).split(',')
  } catch (e) {
    console.warn('JSON parse localStorage fail：', e)
  }
  return authority;
}

export function setAuthority(authority = 'guest') {
  if (_.isArray(authority) || _.isString(authority)) {
    return window.localStorage.setItem(STOREAGE_NAME, authority);
  }
  console.log('authority must be Array or String.')  
}
