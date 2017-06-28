/**
 * 管理平台入口
 * 作者：张晓东
 */
import React,{Component} from 'react';
import { hashHistory } from 'react-router';
import { AdminHead } from './modules/admin/head/head';
import { AdminAside } from './modules/admin/aside/aside';
import {getCurrentUser} from './modules/admin/adminUilt';
import CONSTANT from './constant';

require('./less/adminContent.less');

class Admin extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	pageTitle:CONSTANT.ADMIN_NAME
	  };
	}
	render(){
		return (
			<div className="adminContent">
				<AdminHead pageTitle={this.state.pageTitle} userName={getCurrentUser().userName}></AdminHead>
				<div className="contantBox">
					<AdminAside></AdminAside>
					{this.props.children}
				</div>
			</div>
		)
	}
	componentDidMount() {
      window.document.title=this.state.pageTitle;
      
    }
}
export {Admin};
