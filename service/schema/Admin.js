/**
 * Created by zhangxiaodong on 2017/6/17.
 */
var mongo = require('../db');
var Schema = mongo.Schema;
var admin = new Schema({
    'userName':{type:String},
    'userPwd':{type:String}
});
module.exports = mongo.model('admin',admin);
