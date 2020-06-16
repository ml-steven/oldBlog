'use strict';

const Controller = require('egg').Controller;
/**
* @controller sysrole 角色接口
*/
class sysRoleController extends Controller {
  /**
* @Summary 系统角色列表
* @description 查询系统角色列表接口
* @Router GET /system/role/list
* @response 200 responseuser 返回结果
*/

  async list() {
    const ctx = this.ctx;
    const list = await ctx.service.sysrole.list(ctx.query);
    ctx.status = 200;
    ctx.body = {
      code: 200,
      total: list.count,
      rows: list.rows,
    };
  }

  /**
* @Summary 根据id查询角色信息
* @description 根据id查询角色信息
* @Router GET /system/role/:id
* @response 200  返回结果
*/

  async show() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const result = await ctx.service.sysrole.show(id);
    ctx.status = 200;
    ctx.body = {
      code: 200,
      ...result,
    };
  }

  /**
  * @Summary 新增角色
  * @description 新增角色信息
  * @Router post /system/role
  * @response 200  返回结果
  */

  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.sysrole.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = {
      ...result,
    };
  }

  /**
  * @Summary 修改角色
  * @description 修改系统角色信息
  * @Router put /system/role
  * @response 200  返回结果
  */

  async modify() {
    const ctx = this.ctx;
    const result = await ctx.service.sysrole.modify(ctx.request.body);
    ctx.status = 200;
    ctx.body = {
      ...result,
    };
  }

  /**
* @Summary 修改角色状态
* @description 修改系统角色状态
* @Router put /system/role/changeStatus
* @response 200  返回结果
*/

  async changeStatus() {
    const ctx = this.ctx;
    const result = await ctx.service.sysrole.changeStatus(ctx.request.body);
    ctx.status = 200;
    ctx.body = {
      ...result,
    };
  }

  /**
  * @Summary 删除角色
  * @description 根据id删除角色信息信息
  * @Router delete /system/role/:id
  * @response 200  返回结果
  */

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.sysrole.destroy(ctx.params.id);
    ctx.status = 200;
    ctx.body = {
      ...result,
    };
  }
}

module.exports = sysRoleController;
