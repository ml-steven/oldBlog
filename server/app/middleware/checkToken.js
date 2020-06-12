'use strict';

module.exports = options => {
  return async function checkToken(ctx, next) {
    const ignore = ctx.app.config.routes.ignore;
    const ignoreItem = ignore.find(str => {
      return ctx.request.url.includes(str);
    });
    if (ignoreItem) {
      await next();
    } else {
      let decode;
      const catchToken = await ctx.service.redis.get('token');
      const token = ctx.request.get('authorization') && ctx.request.get('authorization').split('Bearer ')[1];
      if (!token || catchToken !== token) {
        ctx.session = null;
        await ctx.service.redis.flushall();
        ctx.status = 200;
        ctx.body = {
          code: 401,
          msg: '登录已过期',
        };
        return;
      }
      try {
        // 解码token
        decode = ctx.app.jwt.verify(token, options.secret);
        if (decode) {
          await ctx.service.redis.set('token', catchToken, 60 * 30);// 延长token
          await next();
        }
      } catch (error) {
        console.info(error);
      }
    }
  };
};
