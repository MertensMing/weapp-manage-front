import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './SideMenu.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

const getIcon = (icon) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

export default class SideMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.menus = props.menuData;
    this.state = {
      openKeys: this.getDefaultOpenSubMenus(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getDefaultOpenSubMenus(nextProps),
      });
    }
  }

  /**
   * 当前路径 /a/b/c
   * 获取默认折叠的二级菜单
   */
  getDefaultOpenSubMenus(props) {
    const { location: { pathname } } = props || this.props;
    const snippets = pathname.split('/').slice(1, -1);
    const currentPathSnippets = snippets.map((item, index) => {
      const arr = snippets.filter((_, i) => i <= index);
      return arr.join('/');
    });
    let currentMenuOpenKeys = [];
    currentPathSnippets.forEach((item) => {
      currentMenuOpenKeys = [...currentMenuOpenKeys, ...this.getSelectedMenuKeys(item)];
    });
    if (currentMenuOpenKeys.length === 0) {
      return ['dashboard'];
    }
    return currentMenuOpenKeys;
  }

  getALlMenuPath(menus) {
    let keys = [];
    menus.forEach((item) => {
      if (item.children) {
        keys.push(item.path);
        keys = [...keys, ...this.getALlMenuPath(item.children)];
      } else {
        keys.push(item.path);
      }
    });
    return keys;
  }

  /**
   * 获得一个数组
   * 所有菜单项所指向的 pathname
   */
  getSelectedMenuKeys = (path) => {
    const allMenuPath = this.getALlMenuPath(this.menus);
    const clearBefore = (path) => {
      return path.replace(/^\//, '')
    }
    const clearAfter = (path) => {
      return path.replace(/\/$/, '')
    }
    if (clearBefore(path) > -1) {
      return [clearBefore(path)];
    }
    if (allMenuPath.indexOf(clearAfter(clearBefore(path))) > -1) {
      return [clearAfter(clearBefore(path))];
    }
    return allMenuPath.filter((item) => {
      const itemRegExpStr = `^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`;
      const itemRegExp = new RegExp(itemRegExpStr);
      return itemRegExp.test(clearAfter(clearBefore(path)));
    });
  }

  /**
  * 判断是否是http链接.返回 Link 或 a
  * @memberof SideMenu
  */
  getMenuItemPath = (item) => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, name } = item;
    // 判断是不是 http 链接
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}<span>{name}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === this.props.location.pathname}
      >
        {icon}<span>{name}</span>
      </Link>
    );
  }

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem=(item) => {
    if (item.children && item.children.some(child => child.name)) {
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </span>
            ) : item.name
            }
          key={item.key || item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.key || item.path}>
          {this.getMenuItemPath(item)}
        </Menu.Item>
      );
    }
  }

  /**
  * 获得菜单子节点
  * @memberof SideMenu
  */
  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map((item) => {
        const ItemDom = this.getSubMenuOrItem(item);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item => !!item);
  }

  // 转化路径
  conversionPath=(path) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  }
  // 权限校验
  checkPermissionItem = (authority, ItemDom) => {
    if (this.props.Authorized && this.props.Authorized.check) {
      const { check } = this.props.Authorized;
      return check(
        authority,
        ItemDom
      );
    }
    return ItemDom;
  }

  handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const isMainMenu = this.menus.some(
      item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
    );
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    });
  }

  render() {
    const { theme, collapsed, logo, location: { pathname } } = this.props;
    const { openKeys } = this.state;
    // 折叠时不展示弹出菜单
    const menuProps = {
      openKeys,
    };
    // pathname 不匹配选择最近的父元素的路径
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    return (
      <Sider
        collapsed={collapsed}
        className="g-sider"
      >
        <h1 className="g-title">
          <i className="logo"></i>
        </h1>
        <Menu
          {...menuProps}
          theme={theme || 'dark'}
          key="Menu"
          mode="inline"
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
        >
          {this.getNavMenuItems(this.menus)}
        </Menu>
        <div className="collapsed-block">
          <Icon onClick={this.props.toggleCollapsed} type={collapsed ? 'menu-unfold' : 'menu-fold'} className="collapsed-btn" />
        </div>
      </Sider>
    );
  }
}
