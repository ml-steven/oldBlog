// app/extend/helper.js
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Op = require('sequelize').Op;

module.exports = {
  /**
 * @fun {Function} toInt String转Number
 * @param {String} str 字符串
 * @returns {Number} 返回Number
 */

  toInt(str) {
    if (typeof str === 'object') throw new Error('类型错误');
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  },

  /**
 * @fun {Function} toStr Number转String
 * @param {*} data
 * @returns {String} 返回String
 */

  toStr(data) {
    return data + '';
  },
  saveFile(stream, type) {
    const app = this.app;
    return new Promise((resolve, reject) => {
      const filePath = '/public/upload/' + type + '/' + path.basename(stream.filename);
      const fileName = app.root_path + '/app' + filePath;
      const ws = fs.createWriteStream(fileName);
      stream.pipe(ws);
      stream.on('error', reject);
      stream.on('end', resolve(filePath));
    });
  },

  /**
 * @fun {Function} getMd5Data md5加密
 * @param {String} data 加密数据
 * @returns {String} 返回md5加密后的哈希
 */

  getMd5Data(data) {
    return crypto.createHash('md5').update(data, 'utf-8').digest('hex');
  },

  /**
 * @fun {Function} handleLikeWhereData Where语句模糊|精确查询
 * @param {Object} data 开始时间
 * @param {Boolean} isLike 是否选择模糊查询
 * @returns {Object} 返回{Where}查询sql对象
 */

  handleLikeWhereData(data, isLike) {
    const where = {};
    if (data instanceof Object) {
      Object.keys(data).forEach(key => {
        if (data[key]) {
          const val = data[key].replace(/\s+/g, '');
          if (isLike) {
            where[key] = {
              [Op.like]: `${val}%`,
            };
          } else {
            where[key] = {
              [Op.eq]: `${val}`,
            };
          }
        }
      });
    }
    return where;
  },
  /**
 * @fun {Function} handleRangeTime Where语句时间段处理
 * @param {Date} beginTime 开始时间
 * @param {Date} endTime 结束时间
 * @param {String} colName 表时间字段名
 * @returns {Object} 返回{Where}查询sql对象
 */

  handleRangeTime(beginTime, endTime, colName) {
    const COLNAME = colName || 'createdAt';
    if (beginTime && endTime) {
      return {
        [COLNAME]: {
          [Op.between]: [ beginTime, endTime ],
        },
      };
    }
    return {};
  },

  /**
 * @fun {Function} handleRouters 根据父菜单id生成前端routes(路由)树结构
 * @param {Array} menus 菜单列表
 * @param {String} parentId 初始父菜单id
 * @returns {Array} 返回前端routes(路由)树结构
 */

  handleRouters(menus, parentId) {
    const routes = [];
    menus.filter(menu => {
      if (menu.parentId === parentId) {
        const children = this.handleRouters(menus, menu.menuId) || [];
        const route = {
          name: menu.path.substring(0, 1).toLocaleUpperCase() + menu.path.substring(1, menu.path.length),
          path: menu.parentId === 0 && menu.isFrame === 1 ? '/' + menu.path : menu.path,
          hidden: false,
          component: menu.component ? menu.component : 'Layout',
          meta: {
            title: menu.menuName,
            icon: menu.icon,
          },
        };
        if (children.length > 0) {
          route.children = children;
        }
        if (menu.parentId === 0 && menu.isFrame === 1) {
          route.alwaysShow = true;
          route.redirect = 'noRedirect';
        }
        routes.push(route);
        return true;
      }
      return false;
    });
    return routes;
  },
  /**
 * @fun {Function} handleRoleMenus 生成权限菜单树结构
 * @param {Array} menus 菜单列表
 * @returns {Array} 返回权限菜单树结构
 */

  handleRoleMenus(menus, parentId) {
    const menuList = [];
    parentId = parentId || 0;
    menus.filter(menu => {
      if (menu.parentId === parentId) {
        const children = this.handleRoleMenus(menus, menu.menuId) || [];
        const menuItem = {
          id: menu.menuId,
          label: menu.menuName,
        };
        if (children.length > 0) {
          menuItem.children = children;
        }
        menuList.push(menuItem);
        return true;
      }
      return false;
    });
    return menuList;
  },
  /**
 * @fun {Function} getDepChildKey 获取最里层child列表key
 * @param {Array} menus 含children菜单列表
 * @returns {Array} 返回child列表key
 */

  getDepChildKey(menus) {
    const childMenus = [];
    function test(menus) {
      menus.filter(menu => {
        if (!menu.children) {
          childMenus.push(menu);
        } else {
          test(menu.children);
        }
        return true;
      });
    }
    test(menus);
    return childMenus;
  },
};
