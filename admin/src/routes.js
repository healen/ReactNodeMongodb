/**
 * 路由主入口
 * 作者：张晓东
 */
import React,{Component} from 'react';

/*
* 引入路由组件
* */
import {
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect
} from 'react-router';

/*
* 引入视图模块
* */
import {Main} from './components/main';//主入口
import {Admin} from './components/adminMain';//登陆后入口
import {Login} from './components/loginMain';//登陆页面

/*
* 用户中心视图
* */
import {
    Manage,
    UserManage,
    ArticleManage
} from './components/manageMain'


/*
*权限管理
* */
const isAuth = (nextState,replace) => {
	var uid = localStorage.currentUser;
	if(!uid||uid=='undefined'){
		replace({pathname:'/login'})
	}
}
/*
* 路由配置
* */
var  Routers = (
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
        	<IndexRedirect to="/admin" />
        	<Route path='admin' component={Admin} onEnter={isAuth}>
                <IndexRedirect to="manage" />
                <Route path='manage' component={Manage}></Route>
                <Route path='userManage' component={UserManage}></Route>
                <Route path='articleManage' component={ArticleManage}></Route>
        	</Route>
        	<Route path="login" component={Login} />
        </Route>
    </Router>
);
/*
* 暴露对外
* */
export default Routers;