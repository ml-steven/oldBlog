'use strict';

const Controller = require('egg').Controller;
/**
* @controller User 用户接口
*/
class SysUserController extends Controller {
  /**
* @Summary 系统用户列表
* @description 查询统用户列表接口
* @Router GET /system/user/list
* @response 200 responseuser 返回结果
*/

  async list() {
    const ctx = this.ctx;
    const list = await ctx.service.sysuser.list(ctx.query);
    ctx.status = 200;
    ctx.body = {
      code: 200,
      total: list.count,
      rows: list.rows,
    };
  }

  /**
* @Summary 根据id查询用户信息
* @description 根据id查询用户信息
* @Router GET /system/user/:id
* @response 200  返回结果
*/

  async show() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const result = await ctx.service.sysuser.show(id);
    ctx.status = 200;
    ctx.body = {
      code: 200,
      ...result,
    };
  }

  /**
  * @Summary 新增系统用户
  * @description 新增系统用户信息
  * @Router post /system/user
  * @response 200  返回结果
  */

  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.sysuser.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = {
      ...result,
    };
  }

  /**
  * @Summary 修改系统用户
  * @description 修改系统用户信息
  * @Router put /system/user
  * @response 200  返回结果
  */

  async modify() {
    const ctx = this.ctx;
    const result = await ctx.service.sysuser.modify(ctx.request.body);
    ctx.status = 200;
    ctx.body = {
      ...result,
    };
  }

  /**
  * @Summary 重置系统用户密码
  * @description 重置系统用户密码
  * @Router put /system/user/resetPwd
  * @response 200  返回结果
  */

  async resetPwd() {
    const ctx = this.ctx;
    const result = await ctx.service.sysuser.resetPwd(ctx.request.body);
    ctx.status = 200;
    ctx.body = {
      ...result,
    };
  }

  /**
  * @Summary 修改系统用户状态
  * @description 修改系统用户状态
  * @Router put /system/user/changeStatus
  * @response 200  返回结果
  */

  async changeStatus() {
    const ctx = this.ctx;
    const result = await ctx.service.sysuser.changeStatus(ctx.request.body);
    ctx.status = 200;
    ctx.body = {
      ...result,
    };
  }

  /**
  * @Summary 删除系统用户
  * @description 根据id删除系统用户信息
  * @Router delete /system/user/:id
  * @response 200  返回结果
  */

  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.sysuser.destroy(ctx.params.id);
    ctx.status = 200;
    ctx.body = {
      ...result,
    };
  }
}

module.exports = SysUserController;
