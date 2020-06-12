'use strict';
const Service = require('egg').Service;
class RedisService extends Service {
  // 设置
  async set(key, value, seconds) {
    const { redis } = this.app;
    value = JSON.stringify(value);
    if (!seconds) {
      await redis.set(key, value);
    } else {
      // 设置有效时间
      await redis.set(key, value, 'EX', seconds);
    }
  }
  // 获取
  async get(key) {
    const { redis } = this.app;
    let data = await redis.get(key);
    if (!data) return;
    data = JSON.parse(data);
    return data;
  }
  // 删除
  async del(key) {
    const { redis } = this.app;
    const data = await redis.get(key);
    if (!data) return;
    await redis.del(key);
    return;
  }
  // 清空redis
  async flushall() {
    const { redis } = this.app;
    await redis.flushall();
    return;
  }
}
module.exports = RedisService;
