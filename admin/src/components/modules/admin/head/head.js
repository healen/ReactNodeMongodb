import React,{Component} from 'react';

import {hashHistory,Link} from 'react-router';
require('./head.less')
class AdminHead extends Component {
	render() {
		var div = (<div>fff </div>)
		var userbar = this.props.userName ? div :'';
		return (
			<nav className="navbar">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">{this.props.pageTitle}</Link>

					{
						this.props.userName ? (
							<div className="navbar-brand navbar-nav navbar-right">
								欢迎 {this.props.userName} 回来 , 
								<a href="javascript:void(0)" className='logout' onClick={this.handleLogout.bind(this)}> 退出</a>
							</div>

						):''
					}
					
				</div>
			</nav>
		)
	}
	handleLogout(){
		localStorage.removeItem('currentUser');
		hashHistory.push('/login');

	}

}

export {AdminHead}