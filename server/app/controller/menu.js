'use strict';

const Controller = require('egg').Controller;
/**
* @controller Menu 菜单接口
*/
class MenuController extends Controller {
  /**
* @Summary 路由列表
* @description 查询路由列表接口
* @Router GET /menu/getRouters
* @response 200  返回结果
*/

  async getRouters() {
    const ctx = this.ctx;
    const list = await ctx.service.menu.getRouters();
    ctx.status = list ? 200 : 401;
    ctx.body = {
      code: list ? 200 : 401,
      data: list ? list : '请先登录',
    };
  }
  /**
* @Summary 权限菜单列表
* @description 查询权限菜单列表接口
* @Router GET /system/menu/roleMenuTreeselect/:id
* @response 200  返回结果
*/

  async roleMenuTreeselect() {
    const ctx = this.ctx;
    const result = await ctx.service.menu.roleList(ctx.params.id);
    ctx.status = 200;
    ctx.body = {
      ...result,
    };
  }

  /**
* @Summary 菜单列表
* @description 查询菜单列表接口
* @Router GET /system/menu/treeselect
* @response 200  返回结果
*/

  async treeselect() {
    const ctx = this.ctx;
    const result = await ctx.service.menu.roleList();
    ctx.status = 200;
    ctx.body = {
      ...result,
    };
  }

  /**
* @Summary 菜单列表
* @description 查询菜单列表接口
* @Router GET /system/menu/list
* @response 200  返回结果
*/

  async list() {
    const ctx = this.ctx;
    const list = await ctx.service.menu.list(ctx.query);
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: list,
    };
  }
  /**
* @Summary 根据id查找菜单
* @description 根据id查找菜单接口
* @Router GET /system/menu/:id
* @response 200  返回结果
*/

  async show() {
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    const menu = await ctx.service.menu.getMenu(id);
    if (menu) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        data: menu,
      };
      return;
    }
    ctx.status = 201;
    ctx.body = {
      code: 201,
      msg: '此菜单不存在！',
    };
  }

  /**
* @Summary 新增菜单
* @description 新增菜单信息
* @Router post /system/menu/
* @response 200  返回结果
*/

  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.menu.create(ctx.request.body);
    if (result[1]) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '新增菜单成功！',
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 500,
        msg: `新增菜单${ctx.request.body.menuName}失败，菜单名称已存在`,
      };
    }
  }

  /**
* @Summary 修改菜单
* @description 修改菜单列表接口
* @Router put /system/menu/
* @response 200  返回结果
*/

  async modify() {
    const ctx = this.ctx;
    const result = await ctx.service.menu.modify(ctx.request.body);
    ctx.status = 200;
    ctx.body = {
      ...result,
    };
  }
  /**
* @Summary 删除菜单
* @description 删除菜单列表接口
* @Router delete /system/menu/:id
* @response 200  返回结果
*/

  async destroy() {
    const ctx = this.ctx;
    const code = await ctx.service.menu.destroy(ctx.params.id);
    if (code === 200) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '删除成功',
      };
    }
  }
}

module.exports = MenuController;
