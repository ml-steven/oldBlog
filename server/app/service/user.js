'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async findUserExit(params) {
    const whereSql = this.ctx.helper.handleLikeWhereData(params, false);
    const result = await this.ctx.model.SysUser.findOne({
      where: whereSql,
    });
    return result;
  }
  async create(params) {
    const whereSql = this.ctx.helper.handleLikeWhereData(params, false);
    const result = await this.ctx.model.SysUser.findOrCreate({
      where: whereSql,
    });
    return result;
  }
  async modify(params) {
    const { id, name, age } = params;
    const user = await this.ctx.model.SysUser.findByPk(id);
    if (!user) {
      return 404;
    }
    await user.update({ name, age });
    return user;
  }
  async destroy(id) {
    const user = await this.ctx.model.SysUser.findByPk(id);
    if (!user) {
      return 404;
    }
    await user.destroy();
    return user;
  }
}

module.exports = UserService;
