/*
* 引入核心react组件
* */
import React,{ Component } from 'react';
/*
* 弹出层组件
* */
import Model from '../../../common/model';
/*
* 分页组件
* */
import PageLimit from '../../../common/pageLimit';
/*
* 操作用户服务
* */
import userListService from '../../../service/userListService';
/*
* 常用工具
* */
import {getCurrentUser} from '../adminUilt';
/*
* 添加用户
* */
import AddUser from '../addUser/addUser';
/*
* 根据id删除用户
* */
import { deleteUserById } from '../../../service/addUserService';
/*
* 修改密码
* */
import RePwd from '../repwd/repwd';


/*
* 渲染页面公用方法
* */
const updateList = function(obj){
	userListService({
		"id":getCurrentUser()._id,
		"pageSize":obj.state.pageSize,
		"currentPage":obj.state.currentPage,
	}).then(function(res){
		if(res.status==200){
			let currentPageCount=res.data.result.length;
			let currentPage = res.data.currentPage;
			if(currentPage>1&&currentPageCount==0){
				obj.setState({
					currentPage:currentPage-=1
				})
				updateList(obj)
			}
			console.log(currentPageCount)
			obj.setState({
				userList:res.data.result,
				count:res.data.count,
				pageCount:res.data.pageCount
			})
		}
	})
}

/*
* 用户管理类定义
* */
class AdminUserManage extends Component {
	constructor(props){
		super(props);
		this.state={
			userList:[],
			pageSize:10,
			currentPage:1,
			addUser:{
				open:false,
				title:'添加用户'
			},
			deleteUser:{
				open:false,
				title:'确认删除?'
			},
			updatePass:{
				open:false,
				title:'修改密码'
			}
		}
	}

	componentDidMount(){
		updateList(this)
	}

	render(){
		var userList = this.state.userList;
		let me = this;
		return (
			<div style={{padding:"20px"}}>
				<div className="pageTitle">
					<button className="btn btn-primary"
							onClick={this.handleAddUser.bind(this,this.state.addUser)}>
						添加用户
					</button>
				</div>
				<div className="listContent">
					<table className="table">
						<thead>
							<tr>
								<th width='80'>序号</th>
								<th>用户名</th>
								<th>密码</th>
								<th>用户ID</th>
								<th width='160'>操作</th>
							</tr>
						</thead>
						<tbody>
						{
							userList.map(function(value,index){
								return (
									<tr key={index}>
										<td>{index+1}</td>
										<td>{value.userName}</td>
										<td>{value.userPwd}</td>
										<td>{value._id}</td>
										<td>
											<button type="button"
													onClick={me.modelUpdate.bind(me,value._id,value.userName)}
													className="btn btn-primary btn-sm">修改密码</button>
												&nbsp;
											<button type="button"
													onClick={me.deleteUser.bind(me,value._id,value.userName)}
													className="btn btn-danger btn-sm">删除用户</button>
										</td>
									</tr>
								)
							})

						}
						</tbody>
					</table>
				</div>

				{/*分页*/}
				<PageLimit
					count={this.state.count}
					pageCount={this.state.pageCount}
					currentPage={this.state.currentPage}
					onNext={this.handleNext.bind(this)}
					onPrev={this.handlePrev.bind(this)}
					onChangePage={this.handleChangePage.bind(this)}
					pageSize={this.state.pageSize}/>

				<Model visible={this.state.addUser.open} title={this.state.addUser.title} onClose={this.handleClose.bind(this,this.state.addUser)}>
					<AddUser onSuccess={this.addSuccess.bind(this)}></AddUser>
				</Model>
				<Model
					visible={this.state.deleteUser.open}
					type="comfrim"
					onClose={this.closeDelete.bind(this)}
					onComfrim={this.comfirmDelete.bind(this)}
					width='300px'
					height='180px'
					title={this.state.deleteUser.title}>
					<div style={{padding:"20px"}}>
						删除不可恢复，确认要删除吗？
					</div>
				</Model>
				<Model
					onClose={this.updatePwdClose.bind(this)}
					visible={this.state.updatePass.open}
					title={this.state.updatePass.title}>
					<RePwd
						uid={this.state.updatePass.uid}
						onSuccess={this.updatePwdSuccess.bind(this)}>
					</RePwd>

				</Model>
			</div>

		)
	}
	/*
	* 添加用户弹框
	* */
	handleAddUser(user){
		user.open=true;
		this.setState({user});

	}
	/*
	* 添加用户弹框关闭
	* */
	handleClose(user){
		user.open=false;
		this.setState({user});
	}
	/*
	* 添加用户完成
	* */
	addSuccess(data){
		if(data.errorCode==0){
			let user = this.state.addUser.open=false;

			this.setState({user,"currentPage":parseInt(this.state.pageCount)});


			updateList(this);
		}
	}
	/*
	* 删除用户弹框
	* */
	deleteUser(id,name){
		let deleteUser = this.state.deleteUser;
		deleteUser.open=true;
		deleteUser.title=`删除用户 [${name}] 吗 ？`
		deleteUser.deleteId=id;

		this.setState({deleteUser});
	}
	/*
	* 删除用户弹框关闭
	* */
	closeDelete(){
		let deleteUser = this.state.deleteUser;
		deleteUser.open=false;
		deleteUser.deleteId='';
		this.setState({deleteUser});
	}
	/*
	* 确认删除用户
	* */
	comfirmDelete(){
		var id = this.state.deleteUser.deleteId;
		var me = this;
		deleteUserById(id).then(function(result){
			if(result.status==200){
				let data = result.data;
				if(data.errorCode==0){
					me.closeDelete();
					updateList(me);
				}
			}
		})
	}
	/*
	* 修改米密码弹框开启
	* */
	modelUpdate(id,name){
		let updatePass = this.state.updatePass;
		updatePass.open=true;
		updatePass.title=`修改用户 [${name}] 的密吗?`
		updatePass.uid=id;
		this.setState({updatePass});

	}
	/*
	* 更新密码关闭
	* */
	updatePwdClose(){
		let updatePass = this.state.updatePass;
		updatePass.open=false;
		updatePass.uid='';
		this.setState({updatePass});
	}
	/*
	* 更新密码完成
	* */
	updatePwdSuccess(){
		this.updatePwdClose();
		updateList(this);
	}
	/*
	* 下一页
	* */
	handleNext(){
		this.setState({
			currentPage:(this.state.currentPage+=1)
		})
		updateList(this);
	}
	/*
	* 上一页
	* */
	handlePrev(){
		this.setState({
			currentPage:(this.state.currentPage-=1)
		})
		updateList(this);

	}

	/*
	* 改变页
	* */
	handleChangePage(val){
		let me = this
		this.setState({
			currentPage:val
		})
		setTimeout(function(){
			"use strict";
			updateList(me);

		},500)

	}
}
export {AdminUserManage};