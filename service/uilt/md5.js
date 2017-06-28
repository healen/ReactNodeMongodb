/**
 * Created by zhangxiaodong on 2017/6/17.
 */

var crypto = require('crypto');

function cryptPwd(password,pa) {
    var md5 = crypto.createHash('md5');
    return md5.update(password+pa).digest('hex');
}
module.exports=cryptPwd;
