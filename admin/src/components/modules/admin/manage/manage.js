import React,{ Component } from 'react';
import Model from '../../../common/model';
import RePwd from '../repwd/repwd';
import {getCurrentUser} from '../adminUilt';
import {hashHistory} from 'react-router';
class AdminManage extends Component {
	constructor(props){
		console.log()
		super(props);
		this.state={
			rePwdTitle:'修改密码',
			open:false,
			uid:getCurrentUser()._id
		}
	}
	render(){
		return (
			<div className="jumbotron" ref='loginbox' style={{padding:'20px',backgroundColor:'#ffffff'}}>
				<h1>你好, {this.props.userName}!</h1>
				<p>
					欢迎使用，
					{this.props.systemName}
					本系统的功能主要有 文章管理、用户管理、其中文章管理包括文章的增删改查，
					用户管理主要包括用户的增删改查，用户自己不能删除自己fdsfdfd
				</p>
				<button className="btn btn-primary" onClick={this.rePwd.bind(this)}>{this.state.rePwdTitle}</button>
				<Model
					onClose={this.close.bind(this)}
					visible={this.state.open}
					title={this.state.rePwdTitle}>
					<RePwd uid={this.state.uid} onSuccess={this.handleSuccess.bind(this)}></RePwd>
				</Model>
			</div>
		)
	}
	rePwd(){
		this.setState({
			open:true
		})
	}
	close(){
		this.setState({
			open:false
		})
	}
	handleSuccess(data){
		if(data.errorCode==0){
			localStorage.removeItem('currentUser');
			alert(data.message+',请使用新密码登陆');

			hashHistory.push('login')
		}
		console.log(data);
	}
}
export {AdminManage};