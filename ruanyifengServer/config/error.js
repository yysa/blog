const errInfo = require('../config/codes.js');
module.exports = errorHandle = (ctx, next) => {
  return next().catch((err) => {
    if (err.status == 401) {
      ctx.status = 200;
      ctx.body = errInfo.LOGIN_OVER_TIME;
    } else {
      throw err;
    }
  });
}