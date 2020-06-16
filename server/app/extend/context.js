'use strict';

module.exports = {
  returnBody(status, msg, data = null) {
    this.status = status;
    this.body = {
      msg,
      data,
    };
  },
  /**
* @fun {Function} getMaxDataScore 获取角色列表最大权值
* @returns {Number} 返回最大权值
*/

  async getMaxDataScore() {
    const arr = [ 0 ];
    const user = await this.service.redis.get('user');
    user.roles.forEach(item => {
      arr.push(item.dataScore);
    });
    return Math.max(...arr);
  },

  /**
* @fun {Function} compareDataScore 比较角色列表最大权值
* @returns {Number} 返回最大权值
*/

  compareDataScore(roles) {
    const arr = [ 0 ];
    roles.forEach(item => {
      arr.push(item.dataScore);
    });
    return Math.max(...arr);
  },
};
