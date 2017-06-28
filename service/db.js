/**
 * Created by zhangxiaodong on 2017/6/17.
 */
var mongoose = require('mongoose');
var BASE_URL = "mongodb://localhost:27017/Blogs";
mongoose.connect(BASE_URL);
mongoose.connection.on("connected",function(err){
   if(err){
       console.log('mongodb connect bad %s',err);
   }else{
       console.log('mongodb success %s');
   }
});
mongoose.connection.on('error',function(err){
    console.log(err);
});
mongoose.connection.on("disconnected",function(){
    console.log('mongodb disconnected');
});
module.exports = mongoose;


