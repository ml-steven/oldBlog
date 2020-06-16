'use strict';

const Controller = require('egg').Controller;
/**
* @controller DictType 字典管理接口
*/
class DictTypeController extends Controller {
  /**
* @Summary 字典管理列表
* @description 查询字典管理列表接口
* @Router GET /system/dict/type/list
* @response 200  返回结果
*/

  async list() {
    const ctx = this.ctx;
    const list = await ctx.service.dictType.list(ctx.query);
    ctx.status = 200;
    ctx.body = {
      code: 200,
      total: list.count,
      rows: list.rows,
    };
  }
  /**
* @Summary 字典信息
* @description 根据id查询字典信息
* @Router GET /system/dict/type/:dictId
* @response 200  返回结果
*/

  async show() {
    const ctx = this.ctx;
    const { dictId } = ctx.params;
    const data = await ctx.service.dictType.show(dictId);
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data,
    };
  }

  /**
* @Summary 新增字典信息
* @description 新增字典信息
* @Router post /system/dict/type/
* @response 200  返回结果
*/

  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.dictType.create(ctx.request.body);
    if (result[1]) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '新增成功！',
      };
    } else {
      ctx.status = 201;
      ctx.body = {
        code: 201,
        msg: '字典类型已存在！',
      };
    }
  }

  /**
* @Summary 修改字典信息
* @description 修改字典信息
* @Router put /system/dict/type/
* @response 200  返回结果
*/

  async modify() {
    const ctx = this.ctx;
    const result = await ctx.service.dictType.modify(ctx.request.body);
    ctx.status = 200;
    ctx.body = {
      ...result,
    };
  }
  /**
* @Summary 删除字典信息
* @description 根据id删除字典信息
* @Router delete /system/dict/type/:dictId
* @response 200  返回结果
*/

  async destroy() {
    const ctx = this.ctx;
    const { dictId } = ctx.params;
    const code = await ctx.service.dictType.destroy(dictId);
    if (code !== 200) {
      ctx.status = 404;
      return;
    }
    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: '删除成功',
    };
  }
}

module.exports = DictTypeController;
