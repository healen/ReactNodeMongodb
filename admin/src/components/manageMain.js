import React,{ Component } from 'react';

import { Link,hashHistory } from 'react-router';

import { AdminManage } from './modules/admin/manage/manage';
import { AdminUserManage } from './modules/admin/userManage/userManage';
import { AdminArticleManage } from './modules/admin/articleManage/articleManage';
import { getCurrentUser } from './modules/admin/adminUilt';


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
	render(){
		return (
			<div>
				<AdminArticleManage></AdminArticleManage>
			</div>
		)
	}
}

export {Manage,UserManage,ArticleManage};