/**
 * Created by zhangxiaodong on 2017/6/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();

var admin = require('./routes/admin');



//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(multer());

app.use("/admin",admin);


var server = app.listen(process.env.PORT || '3000',function(){
    console.log(server.address());
});