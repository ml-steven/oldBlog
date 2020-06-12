'use strict';
const path = require('path');
class AppBootHook {

  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    // 引入validate目录，并注入app实例
    const directory = path.join(this.app.config.baseDir, 'app/validate');
    this.app.loader.loadToApp(directory, 'validate');
  }

}

module.exports = AppBootHook;
