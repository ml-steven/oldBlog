'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const uploadFile = path.join(__dirname, '../public/imgs');


class uploadController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(111, ctx);
    ctx.body = {
      name: '3333',
    };
    // const stream = await ctx.getFileStream();
    // console.log(111,stream)
  }
}

module.exports = uploadController;
