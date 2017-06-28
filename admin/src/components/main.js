/**
 * 后台入口
 * 作者：张晓东
 */
import React,{Component} from 'react';
import Login from './modules/login/login';
require("./less/reset.less");
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:""
        };
    }
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }

}

export {Main};
