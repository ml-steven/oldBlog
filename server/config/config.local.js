'use strict';

module.exports = () => {
  const exports = {};

  /**
     * Static file serve
     *
     * @member Config#static
     * @property {String} prefix - `/public/` by default
     * @property {String} dir - static files store dir, `${baseDir}/app/public` by default
     * @property {Number} maxAge - cache max age, default is 0
     * @see https://github.com/koajs/static-cache
     */
  exports.security = { // 域名访问白名单
    domainWhiteList: [ 'http://localhost:80' ],
    csrf: {
      ignore: /\/api/,
      // ignoreJSON: false, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
      // useSession: false, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      // cookieName: 'Admin-Token', // Cookie 中的字段名，默认为 csrfToken
      // sessionName: 'Admin-Token', // Session 中的字段名，默认为 csrfToken
      // headerName: 'token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    },
  };
  return exports;
};
