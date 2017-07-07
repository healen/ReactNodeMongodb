import React,{ Component } from 'react';

import { Link,hashHistory } from 'react-router';

import { AdminManage } from './modules/admin/manage/manage';
import { AdminUserManage } from './modules/admin/userManage/userManage';
import { AdminArticleManage } from './modules/admin/articleManage/articleManage';
import { getCurrentUser } from './modules/admin/adminUilt';

import MarkEdit from './common/markEdit'


import CONSTANT from './constant';


class Manage extends Component {
	render(){
		return (
			<div>
				<AdminManage systemName={CONSTANT.ADMIN_NAME} userName={getCurrentUser().userName}></AdminManage>
			</div>
		)
	}
}

class UserManage extends Component {
	render(){
		return (
			<div>
				<AdminUserManage></AdminUserManage>
			</div>
		)
	}
}

class ArticleManage extends Component {
	constructor(props){
		super(props)
		this.state={
			markbody:'# 标题'
		}
	}


	render(){
		return (
			<div style={{padding:"10px"}}>
				<MarkEdit
					onMarkChange={this.markChange.bind(this)}
					input={this.state.markbody}>
				</MarkEdit>
				<AdminArticleManage></AdminArticleManage>
			</div>
		)
	}

	markChange(markString,htmlString){
		this.setState({
			markbody:markString,
			markbodyToHtml:htmlString
		})
	}
}

export {Manage,UserManage,ArticleManage};