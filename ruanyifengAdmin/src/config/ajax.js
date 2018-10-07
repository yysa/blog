/*
 * @Author: jabinwu 
 * @Date: 2018-06-07 09:24:32 
 * 封装ajax函数
 * @Last Modified by: lbx
 * @Last Modified time: 2018-09-30 16:27:21
 */
//函数前面加一个async,帮我们处理异步回调，ES7的语法
import URL from "./url.js";
import vm from "../config/vm.js";
export default async function (json) {
  //返回一个promise对象，es6的语法
  return new Promise(function (resolve, reject) {
    //1.实例化一个ajax对象
    var xhr = new XMLHttpRequest();
    //2.实例化一个formData对象
    var formData = new FormData();
    //3.对type，async进行处理,true代表异步请求，false代表同步
    json.type = json.type ? json.type : 'GET';
    json.async = json.async ? json.async : true;
    //4.判断是否请求类型
    //get是通过url传参数，所以data可以为null
    if (json.type == 'GET') {
      json.data = null;
    }
    //我们的post请求必须传递formdata数据，所以需要将所有数据添加到formdata对象中
    else {
      for (var key in json.data) {
        formData.append(key, json.data[key]);
      }
      json.data = formData;
    }
    //5.与服务器建立链接
    xhr.open(json.type, URL.apiUrl + json.url, json.async);
    //设置header头,从localStorage中取出token
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'))
    //6.向服务器发送数据
    xhr.send(json.data);
    //7.监听xhr的状态改变事件
    xhr.onreadystatechange = function () {
      //判断xhr的状态，4与服务器交互成功，并且已经获取到服务器返回的数据
      if (xhr.readyState == 4) {
        //200~300代表请求成功，304服务器告诉客户端，请求数据未变，去缓存中去数据
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
          //xhr.responseText成功获取的数据，它是一个字符窜，需要JSON.parse来转换为对象
          // json.success();
          //成功的处理
          let json = JSON.parse(xhr.responseText);
          //10020代表未登录，当每个请求得到的时10020,我们就派发一个检测登录的事件给登录组件，告诉它未登录，
          if (json.errCode == 10020) {
            vm.$emit("checkLogin", true);
          }
          resolve(json);
        } else {
          /*   if (json.error) {
                json.error("请求失败！");
            } */
          //失败的处理
          resolve({
            errMsg: "请求失败"
          });
        }
      }
    }
  })
}
