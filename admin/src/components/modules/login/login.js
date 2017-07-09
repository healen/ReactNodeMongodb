
/**
 * 登陆组建业务逻辑
 * 作者：张晓东
 */
import React,{Component} from 'react';
import { hashHistory,browserHistory} from 'react-router';
import loginService from '../../service/loginService';
require('./login.less');
class LoginM extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	userName:'',
	  	userPwd:'',
	  	disabled:true,
	  	errMsg:'',
	  	errShow:false

	  };
	}
	/**
	 *
	 * 渲染视图
	 */
	render(){
		var userName = this.state.userName;
		var userPwd = this.state.userPwd;
		return (
			<form className='login'>
				<h4>{this.props.pageTitle}</h4>
				<label>
					<div className="title">用户名：</div>
					<div className="input">
						<input type="text"
							onBlur={this.handleVert.bind(this)}
							onFocus={this.handleFocus.bind(this)}
							onChange={(e)=>this.setState({userName:e.target.value})}
							name='userName'/>
					</div>
				</label>
				<label>
					<div className="title">密码：</div>
					<div className="input">
						<input type="password"
							onBlur={this.handleVert.bind(this)}
							onFocus={this.handleFocus.bind(this)}
							onChange={(e)=>this.setState({userPwd:e.target.value})}
							name='userPwd'/>
					</div>
				</label>
				<label className='errorbar' style={{display:this.state.errShow?'block':'none'}}>
				{this.state.errMsg}
				</label>

				<label>
					<div className="title"></div>
					<button type="button" className="btn btn-primary" onClick={this.handleLogin.bind(this)} disabled={this.state.disabled}>登陆</button>
				</label>
			</form>
		)
	}


	/**
	 * 用户响应
	 * @return {[type]} [description]
	 */
	handleFocus(){
		this.setState({errShow:false});
		this.setState({errMsg:''});
	}
	handleLogin(){
		this.setState({disabled:true});
		var me = this;
		var data = {
			userName:this.state.userName,
			userPwd:this.state.userPwd,
		}
		loginService(data).then(function(res){
			me.setState({disabled:false});
			if(res.status==200){
				var data = res.data;
				if(data.errorCode>0){
					me.setState({errShow:true});
					me.setState({errMsg:data.message});
				}else{
					localStorage.currentUser = JSON.stringify(data.result);
					hashHistory.push('admin');
				}
			}
		})
	}
	handleVert(){
		if((this.state.userName).length==0 && (this.state.userPwd).length==0){
			this.setState({disabled:true});
		}else{
			this.setState({disabled:false});
		}
	}

}
export default LoginM;
