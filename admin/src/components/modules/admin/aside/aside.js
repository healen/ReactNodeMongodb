import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';

require('./aside.less')

class AdminAside extends Component {


	render(){
		return (
			<div className='leftAside'>


					 <Link to='/admin/Manage' activeClassName='active'>平台首页</Link>
					 <Link to='/admin/userManage' activeClassName='active'>会员管理</Link>
					 <Link to='/admin/articleManage' activeClassName='active'>文章管理</Link>



			</div>
		)
	}

}

export {AdminAside}