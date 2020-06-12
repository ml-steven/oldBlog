/* egg_folder/app/contract/format.js */
'use strict';
module.exports = {
  requestlogin: {
    login_name: { type: 'string', required: true, description: '登录账号' },
    password: { type: 'string', required: true, description: '密码' },
    uuid: { type: 'string', required: true, description: 'uuid标识' },
    code: { type: 'string', required: true, description: '验证码' },
  },
};
