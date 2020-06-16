'use strict';

const Controller = require('egg').Controller;
/**
* @controller dictData 字典数据接口
*/
class DictDataController extends Controller {
  /**
* @Summary 字典数据列表
* @description 查询字典数据列表接口
* @Router GET /system/dict/data/list
* @response 200  返回结果
*/

  async list() {
    const ctx = this.ctx;
    const list = await ctx.service.dictData.list(ctx.query);
    ctx.status = 200;
    ctx.body = {
      code: 200,
      total: list.count,
      rows: list.rows,
    };
  }
  /**
* @Summary 字典数据类型
* @description 查询字典数据类型接口
* @Router GET /system/dict/data/dictType/:type
* @response 200  返回结果
*/

  async showType() {
    const ctx = this.ctx;
    const { type } = ctx.params;
    const list = await ctx.service.dictData.showType(type);
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: list,
    };
  }

  /**
* @Summary 字典数据
* @description 根据id查询字典数据
* @Router GET /system/dict/data/:dictId
* @response 200  返回结果
*/

  async show() {
    const ctx = this.ctx;
    const { dictId } = ctx.params;
    const data = await ctx.service.dictData.show(dictId);
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data,
    };
  }

  /**
  * @Summary 新增字典信息
  * @description 新增字典信息
  * @Router post /system/dict/data/
  * @response 200  返回结果
  */

  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.dictData.create(ctx.request.body);
    if (result[1]) {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        msg: '新增成功！',
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 500,
        msg: '此类型字典数据键值已存在！',
      };
    }
  }

  /**
  * @Summary 修改字典信息
  * @description 修改字典信息
  * @Router put /system/dict/data/
  * @response 200  返回结果
  */

  async modify() {
    const ctx = this.ctx;
    const result = await ctx.service.dictData.modify(ctx.request.body);
    ctx.status = 200;
    ctx.body = {
      ...result,
    };
  }
  /**
  * @Summary 删除字典信息
  * @description 根据id删除字典信息
  * @Router delete /system/dict/data/:dictId
  * @response 200  返回结果
  */

  async destroy() {
    const ctx = this.ctx;
    const { dictCode } = ctx.params;
    const code = await ctx.service.dictData.destroy(dictCode);
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

module.exports = DictDataController;
