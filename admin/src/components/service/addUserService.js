/**
 * Created by zhangxiaodong on 2017/6/27.
 */

import CONSTANT from '../constant';
import axios from 'axios';
function checkUser(userName){
    let url = CONSTANT.BASE_ADMIN_URL+'checkUser';
    var Promise = axios.post(url,{'userName':userName});
    return Promise;
}
function addUserFn(obj){
    let url = CONSTANT.BASE_ADMIN_URL+'addUser';
    var Promise = axios.post(url,obj);
    return Promise;
}
function deleteUserById(id){
    let url = CONSTANT.BASE_ADMIN_URL+'deleteById';
    var Promise = axios.post(url,{'id':id});
    return Promise;
}

export {checkUser,addUserFn,deleteUserById}
