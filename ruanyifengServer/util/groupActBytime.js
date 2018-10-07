/*
 * @Author: lbx 
 * @Description: 根据年份分组文章
 * @Date: 2018-09-26 14:37:52 
 * @Last Modified by: lbx
 * @Last Modified time: 2018-09-30 17:49:07
 */

module.exports = function(ActArr){
    let obj = {};
    ActArr.forEach(function(item){
        let date = new Date(Number(item.create_time));
        let year = date.getFullYear();
        if(!obj[year]){
            obj[year] = [];
        }
        obj[year].push(item);
    }); 
    return obj;
}