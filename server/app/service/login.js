'use strict';

const Service = require('egg').Service;
const Op = require('sequelize').Op;

class LoginService extends Service {
  async login(params) {
    const { redis } = this.ctx.service;
    const verifyInfo = await redis.get('verifyInfo');
    if (!verifyInfo) {
      this.ctx.body = {
        code: 500,
        msg: '验证码已过期！',
      };
      return;
    }
    params.code = params.code.toLowerCase();
    const { login_name, password, code, uuid } = params;
    // 校验验证码
    if (code !== verifyInfo.code) {
      this.ctx.body = {
        code: 500,
        msg: '验证码错误！',
      };
      return;
    }
    if (uuid !== verifyInfo.uuid) {
      this.ctx.body = {
        code: 500,
        msg: 'uuid错误！',
      };
      return;
    }
    const { toStr, getMd5Data } = this.ctx.helper;
    const user = await this.ctx.model.SysUser.findOne({
      where: { login_name: { [Op.eq]: toStr(login_name) }, password: { [Op.eq]: getMd5Data(password) } }, include: [{
        model: this.ctx.model.SysRole,
        as: 'roles',
        through: {
          attributes: [],
        },
      }],
    });
    if (!user) {
      this.ctx.body = {
        code: 500,
        msg: '用户名或密码错误',
      };
      return;
    }
    await redis.set('user', user);
    const token = this.app.jwt.sign(params, this.app.config.jwt.secret, {
      expiresIn: '1d', // 时间根据自己定，具体可参考jsonwebtoken插件官方说明
    });
    await redis.set('token', token, 60 * 30); // 缓存30分钟token
    return token;
  }
}

module.exports = LoginService;
