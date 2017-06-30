/**
 * Created by zhangxiaodong on 2017/6/17.
 */
var mongo = require('../db');
var Schema = mongo.Schema;
var article = new Schema({
    'title':{type:String},
    'tag':{type:String},
    'body':{type:String},
    'uid':{type:Oid},
    'author':{type:String},
    'pv':{type:Number},
    'rv':{type:Number},
    'createTime':{type:Date},
    'updateTime':{type:Date}
});
module.exports = mongo.model('article',article);
