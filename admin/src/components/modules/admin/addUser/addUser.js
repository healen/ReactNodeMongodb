/**
 * Created by zhangxiaodong on 2017/6/26.
 */
import React,{Component} from 'react';
import {checkUser,addUserFn} from '../../../service/addUserService'
import './addUser.less'
export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state= {
            disabled:true,
            userName:'',
            userPwd:'',
            isNoUserName:true,
            userMsg:'',
            errClass:'red'
        }
    }
    componentWillReceiveProps() {
        this.setState({
            disabled:true,
            userName:'',
            userPwd:'',
            isNoUserName:true,
            userMsg:'',
            errClass:'red'
        })
    }
    render() {
        return (
            <div className="repwd">
                <div className="form-group">
                    <label htmlFor='userName'>用户名</label>
                    <input type="text"
                           onBlur={this.handleCheckUserName.bind(this,this.state.userName)}
                           onChange={this.handleChange.bind(this)}
                           value={this.state.userName}
                           id='userName'/>
                    <span className={this.state.isNoUserName?'red':'ok'}>&nbsp;{this.state.userMsg}</span>

                </div>
                <div className="form-group">
                    <label htmlFor='userPwd'>密码</label>
                    <input type="password"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.userPwd}
                           id='userPwd'/>
                </div>
                <div className="form-group">
                    <label htmlFor='comfrim'></label>
                    <button className='btn btn-primary'
                            onClick={this.handleSub.bind(this,{'userName':this.state.userName,'userPwd':this.state.userPwd})}
                            disabled={this.state.disabled}>
                        添加
                    </button>
                </div>
            </div>
        )
    }
    handleChange(e){
        var tagId = e.target.id;
        if(tagId == 'userName'){
            this.setState({
                userName:e.target.value
            })
        }else{
            this.setState({
                userPwd:e.target.value
            })
        }
        if(this.state.isNoUserName==false && this.state.userName!='' && this.state.userPwd!=''){
            this.setState({
                disabled:false
            })
        }else{
            this.setState({
                disabled:true
            })
        }
    }

    handleCheckUserName(userName){
        var me = this;
        if(userName.length<=0){
            return;
        }
        checkUser(userName).then(function(result){
            if(result.status==200){
                let data = result.data;
                if(data.errorCode=='2'){
                    me.setState({
                        isNoUserName:true,
                        userMsg:data.message
                    })
                }else{
                    me.setState({
                        isNoUserName:false,
                        userMsg:data.message
                    })
                }
            }
        })
    }
    handleSub(obj){
        var me = this;
        addUserFn(obj).then(function(result){
            if(result.status==200){
                let data = result.data;
                me.props.onSuccess(data)
            }else{
                alert('错误')
            }
        })

    }
}

