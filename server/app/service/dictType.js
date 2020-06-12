'use strict';

const Service = require('egg').Service;
const Op = require('sequelize').Op;
class DictTypeService extends Service {
  async list(query) {
    if (Object.keys(query).length) {
      const toInt = this.ctx.helper.toInt;
      const { pageSize, pageNum, beginTime, endTime, ...rest } = query;
      const whereSql = this.ctx.helper.handleLikeWhereData(rest, true);
      const timeRange = this.ctx.helper.handleRangeTime(beginTime, endTime, 'createdAt');
      const result = await this.ctx.model.SysDictType.findAndCountAll({
        limit: toInt(pageSize), offset: (toInt(pageNum) - 1) * pageSize, where: { ...timeRange, ...whereSql },
      });
      result.cur_page = pageNum;
      result.total_page = Math.ceil(result.count / pageSize);
      return result;
    }
    const result = await this.ctx.model.SysDictType.findAll();
    return { rows: result, count: result.length };
  }

  async show(id) {
    const data = await this.ctx.model.SysDictType.findByPk(id);
    return data;
  }

  async create(params) {
    const { dictType, ...rest } = params;
    const result = await this.ctx.model.SysDictType.findOrCreate({
      where: { dictType },
    });
    if (result[1]) {
      await result[0].update(rest);
    }
    return result;
  }

  async modify(params) {
    const { dictId, ...rest } = params;
    const dict = await this.ctx.model.SysDictType.findByPk(dictId);
    if (!dict) {
      return 404;
    }
    await dict.update(rest);
    return dict;
  }

  async destroy(id) {
    const dictTypes = await this.ctx.model.SysDictType.findAll({
      where: {
        dictId: { [Op.or]: id.split(',') },
      },
    });
    const hasTypes = [];
    dictTypes.forEach(item => {
      hasTypes.push(item.dictType);
    });
    await this.ctx.model.SysDictType.destroy({ where: { dictId: { [Op.or]: id.split(',') } } });
    await this.ctx.model.SysDictData.destroy({ where: { dictType: { [Op.or]: hasTypes } } });
    return 200;
  }
}

module.exports = DictTypeService;
