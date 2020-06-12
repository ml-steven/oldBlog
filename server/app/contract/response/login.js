/* egg_folder/app/contract/format.js */
'use strict';
module.exports = {
  responselogin: {
    token: { type: 'string', description: 'token凭证' },
  },
  responseVerify: {
    img: { type: 'string', description: 'svg图片' },
    uuid: { type: 'string', description: 'uuid' },
  },
};
