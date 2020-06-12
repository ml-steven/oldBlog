'use strict';

const Controller = require('egg').Controller;
/**
* @Controller Login 登录接口
*/
class LoginController extends Controller {
  /**
* @Summary 获取图片验证码。
* @description 获取图片验证码。
* @Router get /user/captchaImage
* @response 200 responseVerify 返回结果
*/

  async verify() {
    const {
      ctx,
    } = this;
    const result = await this.ctx.service.tools.captcha(); // 服务里面的方法
    ctx.response.type = 'image/svg+xml'; // 知道你个返回的类型
    ctx.body = {
      code: 200,
      img: result.img, // 返回一张svg图片
      uuid: result.uuid,
    };
  }

  /**
  * @Summary 后台登录接口。
  * @description 根据用户名和密码登录
  * @Router post /user/login
  * @request body requestlogin
  * @response 200 responselogin 返回结果
  */

  async login() {
    const { ctx } = this;
    const rule = {
      login_name: 'string',
      password: 'password',
      uuid: 'string',
      code: 'string',
    };
    ctx.validate(rule, ctx.request.body);
    const token = await ctx.service.login.login(ctx.request.body);
    if (token) {
      ctx.body = {
        code: 200,
        token,
      };
    }
  }

  /**
* @Summary 后台登出接口
* @description 退出登录
* @Router post /user/logout
* @response 200 responselogin 返回结果
*/

  async logout() {
    this.ctx.session = null;
    await this.ctx.service.redis.flushall();
    this.ctx.body = {
      code: 200,
      msg: '退出登录成功',
    };
  }
}

module.exports = LoginController;
