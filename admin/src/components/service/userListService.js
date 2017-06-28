/**
 * userList
 * 作者：张晓东
 */
import CONSTANT from '../constant';
import axios from 'axios';
export default (data) => {
    let url = CONSTANT.BASE_ADMIN_URL+'userList';
    var Promise = axios.get(url,{params:data||{}});
    return Promise;
}




