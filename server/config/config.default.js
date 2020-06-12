/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.cluster = {
    listen: {
      path: '',
      hostname: '127.0.0.1',
      port: 8000,
    },
  };
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'blog',
    username: 'root',
    password: '123456',
    define: {
      freezeTableName: true, // Model 对应的表名将与model名相同。
      timestamps: true, // 默认情况下，Sequelize会将createdAt和updatedAt的属性添加到模型中，以便您可以知道数据库条目何时进入数据库以及何时被更新。
    },
    timezone: '+8:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
  };
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 1,
    },
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1585897622971_1615';
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    // dirs: [ path.join(appInfo.baseDir, 'app/public'), path.join(appInfo.baseDir, 'app/public/') ],
    // support lazy load
    dynamic: true,
    preload: true,
    buffer: false,
    maxFiles: 1000,
  };
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'egg-swagger',
      description: 'swagger-ui for egg',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    securityDefinitions: {
      apikey: {
        type: 'apiKey',
        name: 'clientkey',
        in: 'header',
      },
      // oauth2: {
      //   type: 'oauth2',
      //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
      //   flow: 'password',
      //   scopes: {
      //     'write:access_token': 'write access_token',
      //     'read:access_token': 'read access_token',
      //   },
      // },
    },
    enableSecurity: false,
    // enableValidate: true,
    routerMap: false,
    enable: true,
  };
  config.jwt = {
    secret: '123456',
  };
  config.multipart = {
    // 表单上传字段限制的个数
    fields: 50,
    // 文件上传的大小限制
    fileSize: '10mb',
    mode: 'file',
    whitelist: [ '.jpg', '.jpeg', '.png', '.gif' ], // 覆盖整个白名单，只允许上传 'jpg'、'jpeg'、'gif'、'png' 格式
  };
  // add your middleware config here
  config.middleware = [ 'errorHandler', 'checkToken' ];
  config.errorHandler = {
    // 通用配置（以下是重点）
    // enable:true, // 控制中间件是否开启。
    // match: '/user/list', // 设置只有符合某些规则的请求才会经过这个中间件（匹配路由）
    // ignore:'/shop' // 设置符合某些规则的请求不经过这个中间件。
    /**
        注意：
        1. match 和 ignore 不允许同时配置
        **/
    // match 和 ignore 支持多种类型的配置方式：字符串、正则、函数（推荐）
    // match(ctx) {
    //     // 只有 ios 设备才开启
    //     const reg = /iphone|ipad|ipod/i;
    //     return reg.test(ctx.get('user-agent'));
    // },
  };
  config.routes = {
    ignore: [ '/user/login', '/logout', '/captchaImage', '/swagger', '/favicon' ],
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
