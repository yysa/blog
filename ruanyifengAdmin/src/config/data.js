import ajax from "./ajax";
import url from "./url";

//用户注册
export const reg = (data) => ajax({
  url: 'reg',
  data: data,
  type: 'POST'
});

//用户登录
export const login = (data) => ajax({
  url: 'login',
  data: data,
  type: 'POST'
});

//退出登录
export const logout = (data) => ajax({
  url: 'logout',
  type: 'POST'
});

//判断是否已经登录
export const checkLogin = () => ajax({
  url: 'checkLogin'
});

//获取文章列表
export const getArticleList = (cid, pn = 1) => ajax({
  url: cid ? `article/select?cid=${cid}&&pn=${pn}` : `article/select?pn=${pn}`
});

//添加或者编辑文章
export const addEditArticle = (data, sUrl) => ajax({
  url: sUrl,
  type: 'POST',
  data: data
});
//删除文章
export const delArticleItem = (id) => ajax({
  url: `article/del?id=${id}`
});



//获取文章分类列表
export const getArticleCategoryList = (cid, pn = 1) => ajax({
  url: cid ? `articleCategory/select?cid=${cid}&&pn=${pn}` : `articleCategory/select?pn=${pn}`
});

//添加或者编辑文章分类
export const addEditArticleCategory = (data, sUrl) => ajax({
  url: sUrl,
  type: 'POST',
  data: data
});
//删除文章分类
export const delArticleCategoryItem = (id) => ajax({
  url: `articleCategory/del?id=${id}`
});

//获取文章分类列表不分页或者根据id查找单个文章分类
export const getAllArticleCategoryList = (id) => ajax({
  url: id ? `articleCategory/select?id=${id}` : `articleCategory/selectItem`
});


//获取评论列表
export const getCommentList = (cid, pn = 1) => ajax({
  url: cid ? `comment/select?cid=${cid}&&pn=${pn}` : `comment/select?pn=${pn}`
});

//添加或者编辑评论
export const addEditComment = (data, sUrl) => ajax({
  url: sUrl,
  type: 'POST',
  data: data
});
//删除评论
export const delCommentItem = (id) => ajax({
  url: `comment/del?id=${id}`
});


//获取用户列表
export const getUsersList = (cid, pn = 1) => ajax({
  url: cid ? `users/select?cid=${cid}&&pn=${pn}` : `users/select?pn=${pn}`
});

//添加或者编辑用户
export const addEditUsers = (data, sUrl) => ajax({
  url: sUrl,
  type: 'POST',
  data: data
});
//删除用户
export const delUsersItem = (id) => ajax({
  url: `users/del?id=${id}`
});

export const delImg = (iname,path) => ajax({
  url: `upload?img=${iname}&&path=${path}`
});


//获取广告列表
export const getAdvertisementList = (cid, pn = 1) => ajax({
  url: cid ? `advertisement/select?cid=${cid}&&pn=${pn}` : `advertisement/select?pn=${pn}`
});

//添加或者编辑广告
export const addEditAdvertisement = (data, sUrl) => ajax({
  url: sUrl,
  type: 'POST',
  data: data
});
//删除广告
export const delAdvertisementItem = (id) => ajax({
  url: `advertisement/del?id=${id}`
});


//获取广告分类列表
export const getAdvertisementCategoryList = (cid, pn = 1) => ajax({
  url: cid ? `advertisementCategory/select?cid=${cid}&&pn=${pn}` : `advertisementCategory/select?pn=${pn}`
});

//添加或者编辑广告分类
export const addEditAdvertisementCategory = (data, sUrl) => ajax({
  url: sUrl,
  type: 'POST',
  data: data
});
//删除广告分类
export const delAdvertisementCategoryItem = (id) => ajax({
  url: `advertisementCategory/del?id=${id}`
});

export const getAllAdvertisementCategoryList = (id) => ajax({
  url: id ? `AdvertisementCategory/select?id=${id}` : `AdvertisementCategory/selectItem`
});


//获取网站信息列表
export const getInforList = (cid, pn = 1) => ajax({
  url: cid ? `infor/select?cid=${cid}&&pn=${pn}` : `infor/select?pn=${pn}`
});

//添加或者编辑网站信息
export const addEditInfor = (data, sUrl) => ajax({
  url: sUrl,
  type: 'POST',
  data: data
});
//删除网站信息
export const delInforItem = (id) => ajax({
  url: `infor/del?id=${id}`
});
