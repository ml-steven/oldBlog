/* egg_folder/app/contract/format.js */
'use strict';
module.exports = {
  responseuser: {
    users: { type: 'array', itemType: 'user' },
    total: { type: 'number', description: '总用户数' },
    cur_page: { type: 'number', description: '当前页数' },
    pageNum: { type: 'number', description: '每页数量' },
  },
  registerUser: {
    code: { type: 'Number', example: 200 },
    msg: { type: 'string', example: '注册成功！' },
  },
  validteResponse: {
    code: { type: 'Number', example: 200 },
    msg: { type: 'string' },
  },
};
