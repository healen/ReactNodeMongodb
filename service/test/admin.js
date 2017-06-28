/**
 * Created by zhangxiaodong on 2017/6/17.
 */
var Admin = require('../schema/Admin');
var md5 = require('../uilt/md5');
var argv = process.argv.slice(2);

//new Admin().save()

function insert(){
    var pass = md5('123456');
    Admin.create({'userName':'admin','userPwd':pass},function(err,res){
        if(err){
            console.log("Error:%s",err);
        }else{
            console.log("Res: %s",res);
        }
    })
}

if(argv=='insert'){
    insert();
}


