'use strict';

module.exports = () => {
  return async function checkIsAdmin(ctx, next) {
    const user = await ctx.service.redis.get('user');
    if (user.userId !== 1) {
      ctx.status = 200;
      ctx.body = {
        code: 500,
        msg: '没有权限，请联系超级管理员',
      };
      return;
    }
    await next();
  };
};
