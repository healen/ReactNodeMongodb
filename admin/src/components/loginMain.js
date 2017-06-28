/**
 * 登陆入口
 * 作者：张晓东
 */
import React,{Component} from 'react';
import LoginM from './modules/login/login';
import CONSTANT from './constant';
import "./less/reset.less"

class Login extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	  	pageTitle:CONSTANT.ADMIN_NAME+'-用户登陆'
	  };
	}
    render(){
        return (
            <div className="loginbox">
                <LoginM pageTitle={this.state.pageTitle}></LoginM>
            </div>
        )
    }
    componentDidMount() {
      window.document.title=this.state.pageTitle
    }
}
export {Login};
