/*
 * @Author: lbx 
 * @Description: 时间处理
 * @Date: 2018-09-25 20:53:43 
 * @Last Modified by: lbx
 * @Last Modified time: 2018-09-29 21:44:55
 */

function zero(i){
    return i<10?'0'+i:i;
}
const timeChange = function(time,status){
    let str = '';
    let date =  new Date(Number(time));
    
    if(status == 1){
        str += `${date.getFullYear()}年${zero(date.getMonth()+1)}月${zero(date.getDate())}日` ;
    }
    if(status == 2){
        str += `${date.getFullYear()}年${zero(date.getMonth()+1)}月${zero(date.getDate())}日 ${zero(date.getHours())}:${zero(date.getMinutes())}`;
    }
    if(status == 3){
        str += `${date.getFullYear()}.${zero(date.getMonth()+1)}.${zero(date.getDate())}`;
    }
    if(status == 4 ){
        str += `${date.getFullYear()}-${zero(date.getMonth()+1)}-${zero(date.getDate())} ${zero(date.getHours())}:${zero(date.getMinutes())}:${zero(date.getSeconds())}`; 
    }
    return str;
 }

export default timeChange;