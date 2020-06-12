'use strict';

const Service = require('egg').Service;
const Op = require('sequelize').Op;
class DictDataService extends Service {
  async list(query) {
    if (Object.keys(query).length) {
      const toInt = this.ctx.helper.toInt;
      const { pageSize, pageNum, beginTime, endTime, ...rest } = query;
      const whereSql = this.ctx.helper.handleLikeWhereData(rest, true);
      const timeRange = this.ctx.helper.handleRangeTime(beginTime, endTime, 'createdAt');
      const result = await this.ctx.model.SysDictData.findAndCountAll({
        limit: toInt(pageSize), offset: (toInt(pageNum) - 1) * pageSize, where: { ...timeRange, ...whereSql },
      });
      result.cur_page = pageNum;
      result.total_page = Math.ceil(result.count / pageSize);
      return result;
    }
    const result = await this.ctx.model.SysDictData.findAll();
    return { rows: result, count: result.length };
  }

  async showType(type) {
    const whereSql = this.ctx.helper.handleLikeWhereData({ dictType: type }, false);
    const list = await this.ctx.model.SysDictData.findAll({ where: whereSql });
    return list;
  }

  async show(id) {
    const data = await this.ctx.model.SysDictData.findByPk(id);
    return data;
  }

  async create(params) {
    const { dictType, dictValue, ...rest } = params;
    const result = await this.ctx.model.SysDictData.findOrCreate({
      where: { dictType, dictValue },
    });
    if (result[1]) {
      await result[0].update(rest);
    }
    return result;
  }

  async modify(params) {
    const { dictCode, ...rest } = params;
    const dict = await this.ctx.model.SysDictData.findByPk(dictCode);
    if (!dict) {
      return 404;
    }
    await dict.update(rest);
    return dict;
  }

  async destroy(dictCode) {
    await this.ctx.model.SysDictData.destroy({
      where: {
        dictCode: { [Op.or]: dictCode.split(',') },
      },
    });
    return 200;
  }
}

module.exports = DictDataService;
