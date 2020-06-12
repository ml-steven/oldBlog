'use strict';

const Service = require('egg').Service;

class SysRoleService extends Service {
  async list(query) {
    if (Object.keys(query).length) {
      const toInt = this.ctx.helper.toInt;
      const { pageSize, pageNum, beginTime, endTime, ...rest } = query;
      const whereSql = this.ctx.helper.handleLikeWhereData(rest, true);
      const timeRange = this.ctx.helper.handleRangeTime(beginTime, endTime, 'createdAt');
      const result = await this.ctx.model.SysRole.findAndCountAll({
        limit: toInt(pageSize), offset: (toInt(pageNum) - 1) * pageSize, where: { ...timeRange, ...whereSql, delFlag: 0 },
        include: [{
          model: this.ctx.model.SysRole,
          as: 'roles',
        }],
      });
      result.cur_page = pageNum;
      result.total_page = Math.ceil(result.count / pageSize);
      return result;
    }
    const result = await this.ctx.model.SysRole.findAll();
    return { rows: result, count: result.length };
  }

  async show(id) {
    let data;
    let roleIds;
    if (id) {
      roleIds = [];
      data = await this.ctx.model.SysRole.findOne({
        where: { userId: id }, include: [{
          model: this.ctx.model.SysRole,
          as: 'roles',
          through: {
            attributes: [],
          },
        }],
      });
      data.roles.forEach(item => {
        roleIds.push(item.roleId);
      });
    }
    const roles = await this.ctx.model.SysRole.findAll();
    return { data, roles, roleIds };
  }

  async create(params) {
    const { loginName, email, phonenumber, password, roleIds, ...rest } = params;
    const exitLoingName = await this.ctx.model.SysRole.findOne({ where: { loginName } });
    if (exitLoingName) {
      return { code: 500, msg: '用户名已存在' };
    }
    const exitEmail = await this.ctx.model.SysRole.findOne({ where: { email } });
    if (exitEmail) {
      return { code: 500, msg: '邮箱已存在' };
    }
    const exitPhonenumber = await this.ctx.model.SysRole.findOne({ where: { phonenumber } });
    if (exitPhonenumber) {
      return { code: 500, msg: '用户号码已存在' };
    }
    const user = await this.ctx.service.redis.get('user');
    const scretpassword = this.ctx.helper.getMd5Data(password);
    const newUser = await this.ctx.model.SysRole.create({ ...rest, loginName, email, phonenumber, password: scretpassword, createBy: user.loginName, updateBy: user.loginName });
    const insetArr = [];
    roleIds.forEach(id => {
      insetArr.push({
        userId: newUser.userId,
        roleId: id,
      });
    });
    await this.ctx.model.SysRoleRole.bulkCreate(insetArr, { ignoreDuplicates: true });
    return { code: 200, msg: '添加成功' };
  }
  async modify(params) {
    const { userId, roleIds, ...rest } = params;
    if (userId === 1) {
      return { code: 500, msg: '不允许操作超级管理员' };
    }
    const user = await this.ctx.model.SysRole.findByPk(userId);
    if (!user) {
      return { code: 500, msg: '此用户不存在' };
    }
    const insetArr = [];
    roleIds.forEach(id => {
      insetArr.push({
        userId: user.userId,
        roleId: id,
      });
    });
    if (insetArr.length) {
      await this.ctx.model.SysRoleRole.destroy({ where: { userId } });
      await this.ctx.model.SysRoleRole.bulkCreate(insetArr, { updateOnDuplicate: [ 'userId', 'roleId' ] });
    }
    await user.update(rest);
    return { code: 200, msg: '修改成功' };
  }
  async destroy(id) {
    const user = await this.ctx.model.SysRole.findByPk(id);
    if (!user) {
      return { code: 500, msg: '此用户不存在' };
    }
    if (id === 1) {
      return { code: 500, msg: '不允许操作超级管理员' };
    }
    await user.update({ delFlag: 2 });
    return { code: 200, msg: '删除成功' };
  }
}

module.exports = SysRoleService;
