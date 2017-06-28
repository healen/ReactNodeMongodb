/**
 * Created by zhangxiaodong on 2017/6/26.
 */

import React,{Component} from 'react';
import rePwdService from '../../../service/rePwdService'
import './rePwd.less'
export default class RePwd extends Component {
    constructor(props) {
        super(props);
        this.state= {
            disabled:true,
            newPwd:'',
            newPwd1:'',
        }
    }
    componentWillReceiveProps() {
        //var me = this
        this.setState({
            disabled:true,
            newPwd:'',
            newPwd1:'',
        })
    }
    render() {
        return (
            <div className="repwd">
                <div className="form-group">
                    <label htmlFor='newPwd'>新密码</label>
                    <input type="password"
                           ref="newPwd"
                           onChange={this.handlePass.bind(this)}
                           value={this.state.newPwd}
                           id='newPwd'/>
                </div>
                <div className="form-group">
                    <label htmlFor='newPwd1'>确认密码</label>
                    <input type="password"
                           ref="newPwd1"
                           onChange={this.handlePass.bind(this)}
                           value={this.state.newPwd1}
                           id='newPwd1'/>
                </div>
                <div className="form-group">
                    <label htmlFor='comfrim'></label>
                    <button className='btn btn-primary'
                            onClick={this.handleRePwd.bind(this,this.props.uid)}
                            disabled={this.state.disabled}>
                        确认
                    </button>
                </div>
            </div>
        )
    }
    handlePass(e){
        var tagId = e.target.id;
        if(tagId == 'newPwd'){
            this.setState({
                newPwd:e.target.value
            })
        }else{
            this.setState({
                newPwd1:e.target.value
            })
        }
        var pw = this.refs.newPwd.value;
        var pw1 = this.refs.newPwd1.value;
        if(pw!=''&&pw==pw1){
            this.setState({
                disabled:false
            })
        }else{
            this.setState({
                disabled:true
            })
        }
    }

    handleRePwd(uid){
        var me = this ;
        var data = {
            id:uid,
            userPwd:this.state.newPwd
        }
        rePwdService(data).then(function(res){
            if(res.status==200){
                var data = res.data;
                me.props.onSuccess(data);
            }
        })
    }
}

