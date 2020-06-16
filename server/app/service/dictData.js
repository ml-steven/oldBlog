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
    // dictType不可修改
    const { dictCode, dictType, dictValue, dictLabel, ...rest } = params;
    const dict = await this.ctx.model.SysDictData.findByPk(dictCode);
    if (!dict) {
      return { code: 500, msg: '该字典数据不存在' };
    }
    const exitDictData = await this.ctx.model.SysDictData.findOne({ where: { [Op.or]: [{ dictValue }, { dictLabel }], [Op.and]: [{ dictType }], dictCode: { [Op.ne]: dictCode } } });
    if (exitDictData) {
      if (dictLabel === exitDictData.dictLabel) {
        return { code: 500, msg: '该字典类型已存在相同数据标签' };
      }
      if (dictValue === exitDictData.dictValue) {
        return { code: 500, msg: '该字典类型已存在相同数据键值' };
      }
    }
    await dict.update({ dictValue, dictLabel, ...rest });
    return { code: 200, msg: '修改成功' };
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
