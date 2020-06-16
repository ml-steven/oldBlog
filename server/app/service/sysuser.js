'use strict';

const Service = require('egg').Service;
const Op = require('sequelize').Op;
class SysUserService extends Service {
  async list(query) {
    if (Object.keys(query).length) {
      const toInt = this.ctx.helper.toInt;
      const { pageSize, pageNum, beginTime, endTime, ...rest } = query;
      const whereSql = this.ctx.helper.handleLikeWhereData(rest, true);
      const timeRange = this.ctx.helper.handleRangeTime(beginTime, endTime, 'createdAt');
      const result = await this.ctx.model.SysUser.findAndCountAll({
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
    const result = await this.ctx.model.SysUser.findAll();
    return { rows: result, count: result.length };
  }

  async show(id) {
    let data;
    let roleIds;
    if (id) {
      roleIds = [];
      data = await this.ctx.model.SysUser.findOne({
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
    const exitUser = await this.ctx.model.SysUser.findOne({ where: { [Op.or]: [{ loginName }, { email }, { phonenumber }] } });
    if (exitUser) {
      if (loginName === exitUser.loginName) {
        return { code: 500, msg: '用户名已存在' };
      }
      if (email === exitUser.email) {
        return { code: 500, msg: '邮箱已存在' };
      }
      if (phonenumber === exitUser.phonenumber) {
        return { code: 500, msg: '用户号码已存在' };
      }
    }
    const user = await this.ctx.service.redis.get('user');
    const scretpassword = this.ctx.helper.getMd5Data(password);
    const newUser = await this.ctx.model.SysUser.create({ ...rest, loginName, email, phonenumber, password: scretpassword, createBy: user.loginName });
    const insetArr = [];
    roleIds.forEach(id => {
      insetArr.push({
        userId: newUser.userId,
        roleId: id,
      });
    });
    await this.ctx.model.SysUserRole.bulkCreate(insetArr, { ignoreDuplicates: true });
    return { code: 200, msg: '添加成功' };
  }
  async modify(params) {
    const { loginName, email, phonenumber, userId, roleIds, userName, sex, status, remark } = params;
    if (userId === 1) {
      return { code: 500, msg: '不允许操作超级管理员' };
    }
    const user = await this.ctx.model.SysUser.findOne({
      where: { userId: { [Op.eq]: userId } }, include: [{
        model: this.ctx.model.SysRole,
        as: 'roles',
        through: {
          attributes: [],
        },
      }],
    });
    if (!user) {
      return { code: 500, msg: '此用户不存在' };
    }
    const loginUserDataScore = await this.ctx.getMaxDataScore();
    const userDataScore = this.ctx.compareDataScore(user.roles);
    if (loginUserDataScore <= userDataScore) {
      return { code: 500, msg: '权值过低，请联系管理员' };
    }
    const exitUser = await this.ctx.model.SysUser.findOne({ where: { [Op.or]: [{ loginName }, { email }, { phonenumber }], userId: { [Op.ne]: userId } } });
    if (exitUser) {
      if (loginName === exitUser.loginName) {
        return { code: 500, msg: '用户名已存在' };
      }
      if (email === exitUser.email) {
        return { code: 500, msg: '邮箱已存在' };
      }
      if (phonenumber === exitUser.phonenumber) {
        return { code: 500, msg: '用户号码已存在' };
      }
    }
    const insetArr = [];
    roleIds.forEach(id => {
      insetArr.push({
        userId: user.userId,
        roleId: id,
      });
    });
    await this.ctx.model.SysUserRole.destroy({ where: { userId } });
    await this.ctx.model.SysUserRole.bulkCreate(insetArr, { updateOnDuplicate: [ 'userId', 'roleId' ] });
    const loginUser = await this.ctx.service.redis.get('user');
    await user.update({ userName, sex, status, remark, updateBy: loginUser.loginName });
    return { code: 200, msg: '修改成功' };
  }


  async changeStatus(params) {
    const { userId, status } = params;
    if (userId === 1) {
      return { code: 500, msg: '不允许操作超级管理员' };
    }
    const user = await this.ctx.model.SysUser.findOne({
      where: { userId: { [Op.eq]: userId } }, include: [{
        model: this.ctx.model.SysRole,
        as: 'roles',
        through: {
          attributes: [],
        },
      }],
    });
    if (!user) {
      return { code: 500, msg: '此角色不存在' };
    }
    const loginUserDataScore = await this.ctx.getMaxDataScore();
    const userDataScore = this.ctx.compareDataScore(user.roles);
    if (loginUserDataScore <= userDataScore) {
      return { code: 500, msg: '权值过低，请联系管理员' };
    }
    const loginUser = await this.ctx.service.redis.get('user');
    await user.update({ status, updateBy: loginUser.loginName });
    return { code: 200, msg: '修改成功' };
  }

  async resetPwd(params) {
    const { getMd5Data } = this.ctx.helper;
    const { userId, password } = params;
    const user = await this.ctx.model.SysUser.findByPk(userId);
    if (!user) {
      return { code: 500, msg: '此角色不存在' };
    }
    const loginUser = await this.ctx.service.redis.get('user');
    if (loginUser.userId !== 1) {
      return { code: 500, msg: '你不是超级管理员，没有权限' };
    }
    await user.update({ password: getMd5Data(password), updateBy: loginUser.loginName });
    return { code: 200, msg: '重置密码成功' };
  }

  async destroy(id) {
    const loginUser = await this.ctx.service.redis.get('user');
    const user = await this.ctx.model.SysUser.findOne({
      where: { userId: { [Op.eq]: id } }, include: [{
        model: this.ctx.model.SysRole,
        as: 'roles',
        through: {
          attributes: [],
        },
      }],
    });
    if (!user) {
      return { code: 500, msg: '此用户不存在' };
    }
    if (id === 1) {
      return { code: 500, msg: '不允许操作超级管理员' };
    }
    const loginUserDataScore = await this.ctx.getMaxDataScore();
    const userDataScore = this.ctx.compareDataScore(user.roles);
    if (loginUserDataScore <= userDataScore) {
      return { code: 500, msg: '权值过低，请联系管理员' };
    }
    await user.update({ delFlag: 2, updateBy: loginUser.loginName });
    return { code: 200, msg: '删除成功' };
  }
}

module.exports = SysUserService;
