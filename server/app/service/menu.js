'use strict';

const Service = require('egg').Service;
class MenuService extends Service {
  async list(query) {
    const { redis } = this.ctx.service;
    const whereSql = this.ctx.helper.handleLikeWhereData(query, true);
    const user = await redis.get('user');
    const menuIds = [];
    if (user.userId === 1) {
      const menus = await this.ctx.model.SysMenu.findAll({ order: [[ 'orderNum', 'ASC' ]], where: whereSql });
      return menus;
    }
    const roleIds = [];
    user.roles.forEach(item => {
      roleIds.push(item.roleId);
    });
    const list = await this.ctx.model.SysRoleMenu.findAll({ where: { roleId: roleIds } });
    list.forEach(function(item) {
      menuIds.push(item.menuId);
    });
    const menus = await this.ctx.model.SysMenu.findAll({
      order: [[ 'orderNum', 'ASC' ]],
      where: {
        menuId: menuIds,
        ...whereSql,
      },
    });
    return menus;
  }
  async getRouters() {
    const user = await this.ctx.service.redis.get('user');
    if (!user) {
      return false;
    }
    const menuIds = [];
    if (user.userId === 1) {
      const menus = await this.ctx.model.SysMenu.findAll({
        order: [[ 'orderNum', 'ASC' ]],
        where: {
          visible: 0,
          menuType: [ 'M', 'C' ],
        },
      });
      const result = this.ctx.helper.handleRouters(menus, 0);
      return result;
    }
    const roleIds = [];
    user.roles.forEach(item => {
      roleIds.push(item.roleId);
    });
    const list = await this.ctx.model.SysRoleMenu.findAll({ where: { roleId: roleIds } });
    list.forEach(function(item) {
      menuIds.push(item.menuId);
    });
    const menus = await this.ctx.model.SysMenu.findAll({
      order: [[ 'orderNum', 'ASC' ]],
      where: {
        menuId: menuIds,
        visible: 0,
        menuType: [ 'M', 'C' ],
      },
    });
    const result = this.ctx.helper.handleRouters(menus, 0);
    return result;
  }

  async create(params) {
    const user = await this.ctx.service.redis.get('user');
    const { parentId, menuName, ...rest } = params;
    const result = await this.ctx.model.SysMenu.findOrCreate({
      where: { parentId, menuName },
    });
    if (result[1]) {
      await result[0].update({ ...rest, createBy: user.loginName, updateBy: user.loginName });
    }
    return result;
  }
  async getMenu(id) {
    const menu = await this.ctx.model.SysMenu.findByPk(id);
    return menu;
  }
  async modify(params) {
    const { menuId, ...rest } = params;
    const menu = await this.ctx.model.SysMenu.findByPk(menuId);
    if (!menu) {
      return 404;
    }
    const user = await this.ctx.service.redis.get('user');
    await menu.update({ ...rest, updateBy: user.loginName });
    return menu;
  }
  async destroy(id) {
    const menu = await this.ctx.model.SysMenu.findByPk(id);
    if (!menu) {
      return 404;
    }
    const menuChild = await this.ctx.model.SysMenu.findOne({ where: { parentId: menu.menuId } });
    if (menuChild) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 500,
        msg: '存在子菜单,不允许删除',
      };
      return false;
    }
    const roleMenu = await this.ctx.model.SysRoleMenu.findOne({ where: { menuId: id } });
    if (roleMenu) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 500,
        msg: '菜单已分配,不允许删除',
      };
      return false;
    }
    await menu.destroy();
    return 200;
  }
}

module.exports = MenuService;
