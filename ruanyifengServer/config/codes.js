/**
 * 逻辑文案管理
 */
const errInfo = {
  PWD_TRUE: {
    errCode: 12000,
    errMsg: "原密码正确"
  },
  PWD_FAIL: {
    errCode: 12001,
    errMsg: "原密码错误"
  },
  HAS_BUY: {
    errCode: 11101,
    errMsg: "订单中的部分商品已经购买过了"
  },
  HAS_ORDER: {
    errCode: 11111,
    errMsg: "尚未支付"
  },
  HAS_CART: {
    errCode: 11112,
    errMsg: "已在购物车"
  },
  HAS_COLLECTION: {
    errCode: 11113,
    errMsg: "该课程已收藏"
  },
  PAY_INFO: {
    errCode: 11114,
    errMsg: "此功能尚未开通！"
  },
  PAY_SUCCESS: {
    errCode: 11115,
    errMsg: "支付成功！"
  },
  PAY_FAIL: {
    errCode: 11116,
    errMsg: "账户余额不足！"
  },
  has_zan: {
    errCode: 11117,
    errMsg: "对不起，您已经点赞过了！"
  },
  NO_ACCSEE: {
    errCode: 11119,
    errMsg: "对不起，您没有权限访问， 请联系管理员！"
  },
  HAS_LOGIN: {
    errCode: 11118,
    errMsg: "已登录！"
  },
  DO_SUCCESS: {
    errCode: 11111,
    errMsg: "成功"
  },
  DO_FIAL: {
    errCode: 11110,
    errMsg: "失败"
  },
  REG_FAIl: {
    errCode: 10000,
    errMsg: "注册失败"
  },
  REG_SUCCESS: {
    errCode: 10001,
    errMsg: "注册成功"
  },
  USER_HAS_EXIT: {
    errCode: 10003,
    errMsg: "用户名已存在"
  },
  USER_PWD_EMPTY: {
    errCode: 10004,
    errMsg: "用户名和密码不能为空！"
  },
  USER_EMPTY: {
    errCode: 11004,
    errMsg: "用户名不能为空！"
  },
  PWD_EMPTY: {
    errCode: 12004,
    errMsg: "密码不能为空！"
  },
  ERROR_USER_NAME: {
    errCode: 10005,
    errMsg: "用户名格式为6-16位的小写字母，包括-、_"
  },
  ERROR_EMAIL: {
    errCode: 10006,
    errMsg: "请输入正确的邮箱地址"
  },
  ERROR_PASSWORD: {
    errCode: 10007,
    errMsg: "'密码长度应该为6-16"
  },
  ERROR_PASSWORD_CONFORM: {
    errCode: 10008,
    errMsg: "两次密码不一致"
  },
  ERROR_SYS: {
    errCode: 10009,
    errMsg: "系统错误"
  },
  FAIL_EMAIL_IS_EXIST: {
    errCode: 10010,
    errMsg: "邮箱已被注册"
  },
  ERROR_NAME_OR_PASSWORD: {
    errCode: 10011,
    errMsg: "用户名或登录密码错误"
  },
  FAIL_USER_NO_LOGIN: {
    errCode: 10012,
    errMsg: "用户未登录"
  },
  FAIL_USER_NO_EXIT: {
    errCode: 10013,
    errMsg: "用户不存在"
  },
  LOGIN_SUCCESS: {
    errCode: 10014,
    errMsg: "登录成功"
  },
  LOGIN_FAIL: {
    errCode: 10015,
    errMsg: "登录失败"
  },
  UPDATE_SUCCESS: {
    errCode: 10016,
    errMsg: "更新成功"
  },
  UPDATE_FAIL: {
    errCode: 100161,
    errMsg: "更新失败"
  },
  ADD_SUCCESS: {
    errCode: 10017,
    errMsg: "添加成功"
  },
  ADD_FAIL: {
    errCode: 100171,
    errMsg: "添加失败"
  },
  DEL_SUCCESS: {
    errCode: 10017,
    errMsg: "删除成功"
  },
  DEL_FAIL: {
    errCode: 100171,
    errMsg: "删除失败"
  },
  LOGOUT_SUCCESS: {
    errCode: 10018,
    errMsg: "退出成功"
  },
  NO_DATA: {
    errCode: 10019,
    errMsg: "暂无数据！"
  },
  LOGIN_OVER_TIME: {
    errCode: 10020,
    errMsg: "未登录或登录已超时！"
  },
  ERROR:{
    errCode: 10000,
    errMsg: "出现未知错误"
  }
}
module.exports = errInfo