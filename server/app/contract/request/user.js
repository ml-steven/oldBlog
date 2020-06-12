/* egg_folder/app/contract/format.js */
'use strict';
module.exports = {
  createUser: {
    login_name: { type: 'string', required: true, description: '登录账号' },
    password: { type: 'string', required: true, description: '密码' },
    username: { type: 'string', required: true, description: '用户昵称' },
  },
  validteLoginName: {
    login_name: { type: 'string', required: true, description: '登录账号' },
  },
};
