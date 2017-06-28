/**
 * 登陆服务
 * 作者：张晓东
 */
import CONSTANT from '../constant';
import axios from 'axios';
export default (data) => {
	let url = CONSTANT.BASE_ADMIN_URL+'repassword';
	var Promise = axios.post(url,data);
	return Promise;
}




