/*
 * @Author: lbx 
 * @Description: 取后几篇文章
 * @Date: 2018-09-25 21:59:00 
 * @Last Modified by: lbx
 * @Last Modified time: 2018-09-27 16:09:27
 */

 let lastAct = function(actArr,num){
     if(num<actArr.length){
         return  actArr.slice(actArr.length-num).reverse();
     }else{
        return actArr.length?actArr.reverse():[{
            id:0,
            create_time:0,
            title:'暂无数据',
            subtitle:'暂无数据'
        }];
     }
 }
 module.exports = lastAct