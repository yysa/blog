/*
 * @Author: lbx 
 * @Description: 将json转化为字符串
 * @Date: 2018-09-28 17:23:35 
 * @Last Modified by: lbx
 * @Last Modified time: 2018-09-28 20:04:33
 */


export default function(obj){
    let str = '';
    function getText(obj1){
        let c = obj1?obj1.children:[];
        for(let key in c){
            if(typeof c[key]  == 'string'){
                str += c[key];
            }else{
                getText(c[key]);
            }
        }
    }
    getText(obj);
    return str;
}