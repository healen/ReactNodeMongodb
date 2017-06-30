/**
 * Created by zhangxiaodong on 2017/6/19.
 */
var express = require('express');
var Router= express.Router();
var Admin = require('../schema/Admin');
var Q = require('q');
var md5 = require('../uilt/md5');
/*
* 入口
* */
Router.get("/",function(req,res){
    res.send('admin');
});
/*
* 登陆
* */
Router.post('/login',function(req,res){
	var chunkJSON = req.body
	Admin.find({'userName':chunkJSON.userName,'userPwd':md5(chunkJSON.userPwd)},{'userPwd':0},function(err,result){
		if(err){
			res.json({'errorCode':1,"status":301,'message':err});
		}else{
			console.log(result.length)
			if(result.length>=1){
				res.json({'errorCode':0,"status":200,'message':'登陆成功',result:result[0]});
			}else{
				res.json({'errorCode':1,"status":200,'message':'用户名密码错误'});
			}
		}
	})
});
/*
* 修改密码
* */
Router.post('/repassword',function(req,res){
	var chunkJSON = req.body
	Admin.findByIdAndUpdate(chunkJSON.id,{'userPwd':md5(chunkJSON.userPwd)},function(err,result){
		if(err){
			res.json({'errorCode':1,"status":301,'message':err});
		}else{

			res.json({'errorCode':0,"status":200,'message':'密码修改成功'});

		}
	})
});

/*
* 获取用户列表
* */
Router.get('/userList',function(req,res){
	var parmas = req.query;
	Admin.count({'_id':{$ne:parmas.id}},function(err,count){
		var pageSize = parseInt(parmas.pageSize) || 500;
		var currentPage = parseInt(parmas.currentPage) || 1;
		var skipnum = parseInt((currentPage - 1) * pageSize);   //跳过数
		var pageCount = Math.ceil(count/pageSize);

		Admin.find({'_id':{$ne:parmas.id}}).skip(skipnum).limit(pageSize).exec(function(err,result){
			if(err){
				res.json({'errorCode':1,"status":301,'message':err});
			}else{
				res.json({
					'errorCode':0,
					"count":count,
					"status":200,
					"pageSize":pageSize,
					"currentPage":currentPage,
					"pageCount":pageCount,
					'message':'渲染成功',
					result:result
				});
			}
		});

	});
})
/*
* 检测用户名是否存在
* */
Router.post("/checkUser",function(req,res){
	var userName = req.body.userName;
	Admin.count({'userName':userName},function(err,count){
		if(err){
			res.json({'errorCode':1,"status":301,'message':err});
		}else{
			if(count>0){
				res.json({'errorCode':2,"status":200,'message':'用户名已存在'});
			}else{
				res.json({'errorCode':0,"status":200,'message':'通过验证'});
			}
		}
	})
})
/*
* 添加用户
* */
Router.post("/addUser",function(req,res){
	var userName = req.body.userName;
	Admin.count({'userName':userName},function(err,count){
		if(err){
			res.json({'errorCode':1,"status":301,'message':err});
		}else{
			if(count>0){
				res.json({'errorCode':2,"status":200,'message':'用户名已存在'});
			}else{
				req.body.userPwd = md5(req.body.userPwd);
				Admin.create(req.body,function(err,result){
					if(err){
						res.json({'errorCode':1,"status":301,'message':err});
					}else{
						res.json({'errorCode':0,"status":200,'message':'添加成功'});
					}
				})
			}
		}
	})
})
/*
* 根据id删除用户
* */
Router.post("/deleteById",function(req,res){
	var id = req.body.id;
	Admin.findByIdAndRemove(id,function(err,result){
		if(err){
			res.json({'errorCode':1,"status":301,'message':err});
		}else{
			res.json({'errorCode':0,"status":200,'message':'删除成功'});
		}
	})
})
module.exports = Router;