'use strict';

module.exports = {
  returnBody(status, msg, data = null) {
    this.status = status;
    this.body = {
      msg,
      data,
    };
  },
};
