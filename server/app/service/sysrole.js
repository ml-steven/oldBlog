'use strict';

const Service = require('egg').Service;
const Op = require('sequelize').Op;
class SysRoleService extends Service {
  async list(query) {
    if (Object.keys(query).length) {
      const toInt = this.ctx.helper.toInt;
      const { pageSize, pageNum, beginTime, endTime, ...rest } = query;
      const whereSql = this.ctx.helper.handleLikeWhereData(rest, true);
      const timeRange = this.ctx.helper.handleRangeTime(beginTime, endTime, 'createdAt');
      const result = await this.ctx.model.SysRole.findAndCountAll({
        order: [[ 'roleSort', 'ASC' ]],
        limit: toInt(pageSize), offset: (toInt(pageNum) - 1) * pageSize, where: { ...timeRange, ...whereSql, delFlag: 0 },
      });
      result.cur_page = pageNum;
      result.total_page = Math.ceil(result.count / pageSize);
      return result;
    }
    const result = await this.ctx.model.SysRole.findAll({ order: [[ 'roleSort', 'ASC' ]] });
    return { rows: result, count: result.length };
  }

  async show(id) {
    const data = await this.ctx.model.SysRole.findByPk(id);
    return { data };
  }

  async create(params) {
    const { roleName, roleKey, menuIds, ...rest } = params;
    const exitRole = await this.ctx.model.SysRole.findOne({ where: { [Op.or]: [{ roleName }, { roleKey }] } });
    if (exitRole) {
      if (exitRole.roleName === roleName) {
        return { code: 500, msg: '角色名称已存在' };
      }
      if (exitRole.roleKey === roleKey) {
        return { code: 500, msg: '权限字符已存在' };
      }
    }
    const user = await this.ctx.service.redis.get('user');
    const newRole = await this.ctx.model.SysRole.create({ ...rest, roleName, roleKey, createBy: user.loginName });
    const insetArr = [];
    menuIds.forEach(id => {
      insetArr.push({
        roleId: newRole.roleId,
        menuId: id,
      });
    });
    await this.ctx.model.SysRoleMenu.bulkCreate(insetArr, { ignoreDuplicates: true });
    return { code: 200, msg: '添加成功' };
  }

  async modify(params) {
    const { roleId, roleName, roleKey, menuIds, ...rest } = params;
    if (roleId === 1) {
      return { code: 500, msg: '不允许操作超级管理员' };
    }
    const role = await this.ctx.model.SysRole.findByPk(roleId);
    if (!role) {
      return { code: 500, msg: '此角色不存在' };
    }
    const exitRole = await this.ctx.model.SysRole.findOne({ where: { [Op.or]: [{ roleName }, { roleKey }], roleId: { [Op.ne]: roleId } } });
    if (exitRole) {
      if (exitRole.roleName === roleName) {
        return { code: 500, msg: '角色名称已存在' };
      }
      if (exitRole.roleKey === roleKey) {
        return { code: 500, msg: '权限字符已存在' };
      }
    }
    const insetArr = [];
    menuIds.forEach(id => {
      insetArr.push({
        menuId: id,
        roleId,
      });
    });
    await this.ctx.model.SysRoleMenu.destroy({ where: { roleId } });
    await this.ctx.model.SysRoleMenu.bulkCreate(insetArr, { updateOnDuplicate: [ 'menuId', 'roleId' ] });
    const loginUser = await this.ctx.service.redis.get('user');
    await role.update({ ...rest, updateBy: loginUser.loginName });
    return { code: 200, msg: '修改成功' };
  }
  async changeStatus(params) {
    const { roleId, status } = params;
    if (roleId === 1) {
      return { code: 500, msg: '不允许操作超级管理员' };
    }
    const role = await this.ctx.model.SysRole.findByPk(roleId);
    if (!role) {
      return { code: 500, msg: '此角色不存在' };
    }
    await role.update({ status });
    return { code: 200, msg: '修改成功' };
  }
  async destroy(id) {
    const toInt = this.ctx.helper.toInt;
    const role = await this.ctx.model.SysRole.findByPk(id);
    if (toInt(id) === 1) {
      return { code: 500, msg: '不允许操作超级管理员' };
    }
    if (!role) {
      return { code: 500, msg: '此角色不存在' };
    }
    await role.update({ delFlag: 2 });
    return { code: 200, msg: '删除成功' };
  }
}

module.exports = SysRoleService;
