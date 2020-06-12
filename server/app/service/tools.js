'use strict';
const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
// const captchapng = require('captchapng');
const uuid = require('uuid'); // uuid.v1()

class ToolsService extends Service {
  // 产生验证码
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 115,
      height: 38,
      ignoreChars: '0oO1ilI',
      background: '#eee',
    });
    const { redis } = this.ctx.service;
    const uuidInfo = uuid.v1();
    const verifyInfo = {
      code: captcha.text.toLowerCase(),
      uuid: uuidInfo,
    };
    await redis.set('verifyInfo', verifyInfo, 60); // 验证码缓存至redis(单位：秒)
    return { img: captcha.data, ...verifyInfo };
  }
}

module.exports = ToolsService;
