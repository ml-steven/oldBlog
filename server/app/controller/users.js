'use strict';

const Controller = require('egg').Controller;
/**
* @controller User 用户接口
*/
class UserController extends Controller {
  /**
* @Summary 用户信息
* @description 查询用户信息接口
* @Request header string token
* @Router GET /user/getInfo
* @response 200 user 返回结果
*/

  async getInfo() {
    const ctx = this.ctx;
    const user = await this.ctx.service.redis.get('user');
    if (user) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        permissions: [ '*:*:*' ],
        roles: [ user.roles[0].role_key ],
        user,
      };
    } else {
      ctx.status = 201;
      ctx.body = {
        code: 201,
        msg: '请先登录',
      };
    }
  }

  /**
* @Summary 注册用户
* @description 注册用户接口
* @request body createUser
* @Router POST /api/admin/register
* @response 200 registerUser 返回结果
*/

  async register() {
    const ctx = this.ctx;
    const { login_name, username, password } = ctx.request.body;
    const result = await ctx.service.user.create({ login_name, username, password });
    if (result[1]) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '注册成功！',
      };
    } else {
      ctx.status = 201;
      ctx.body = {
        code: 201,
        msg: '注册失败！',
      };
    }
  }
  /**
* @Summary 验证登录账号是否唯一
* @description 验证登录账号接口
* @request body validteLoginName
* @Router POST /api/admin/valiteLoginName
* @response 200 validteResponse 返回结果
*/

  async valiteLoginName() {
    const ctx = this.ctx;
    const { login_name } = ctx.request.body;
    const user = await ctx.service.user.findUserExit({ login_name });
    if (user) {
      ctx.status = 201;
      ctx.body = {
        code: 201,
        msg: '此用户名已存在!',
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '可以使用此用户名!',
      };
    }
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
    const data = await ctx.service.user.show(id);
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data,
    };
  }

  async modify() {
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    const user = await ctx.service.user.modify(id);
    if (user === 404) {
      ctx.status = 404;
      return;
    }
    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: '修改成功',
    };
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
    const user = await ctx.service.user.destroy(id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    await user.destroy();
    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: '删除成功',
    };
  }
}

module.exports = UserController;
