/**
 * Created by zhangxiaodong on 2017/6/29.
 */

import React,{Component} from 'react';
import './style/iconfont.less';
import './app.less'
import marked from 'marked';

export default class MarkEdit extends Component{
    renderTool(){
        /*
        * 定义一些初始化变量
        * 编辑器配置，
        * 编辑器界面配置
        * 编辑器初始化
        * 编辑器界面初始化
        *
        * */
        let [editConfig,markConfig,editToolBar,markToolBar,toolbar]=[
            [
                {title:"加粗",ico:'bold',line:false,todo:'bold'},
                {title:"倾斜",ico:'italic',line:true,todo:'italic'},
                {title:"连接",ico:'link',line:false,todo:'link'},
                {title:"缩进",ico:'indent',line:false,todo:'indent'},
                {title:"代码",ico:'code',line:false,todo:'code'},
                {title:"图片",ico:'image',line:true,todo:'image'},
                {title:"有序列表",ico:'olist',line:false,todo:'olist'},
                {title:"无序列表",ico:'list',line:true,todo:'list'},
                {title:"一级标题",ico:'h1',line:false,todo:'h1'},
                {title:"二级标题",ico:'h2',line:false,todo:'h2'},
                {title:"三级标题",ico:'h3',line:false,todo:'h3'}
            ],
            [
                {title:"全屏",ico:'zoom',line:true,todo:'zoom'},
                {title:"编辑",ico:'edit',line:false,todo:'edit'},
                {title:"分栏",ico:'column',line:false,todo:'column'},
                {title:"显示",ico:'eye',line:false,todo:'eye'}
            ],
            [],
            [],
            ''
        ]
        /*
        * 渲染编辑器工具条
        * */
        editConfig.map((v,k)=>{
            let classNames='iconfont icon-'+v.ico;
            let styles = v.line==true ? {borderRight:"1px solid #efefef"} :{}
            editToolBar.push(
                <a href="javascript:void(0)" onClick={this.toolBtnEvent.bind(this,v.todo)} style={styles} key={k} title={v.title}>
                    <i className={classNames}></i>
                </a>
            )
        })
        /*
        * 渲染组件功能工具条
        * */
        markConfig.map((v,k)=>{
            let classNames='iconfont icon-'+v.ico;
            let styles = v.line==true ? {borderRight:"1px solid #efefef"} :{}
            markToolBar.push(
                <a href="javascript:void(0)" onClick={this.toolBtnEvent.bind(this,v.todo)} style={styles} key={k} title={v.title}>
                    <i className={classNames}></i>
                </a>
            )
        })

        /*
        * 布局工具条视图
        * */
        toolbar = (
            <div className="markHead">
                <div className="editTool">
                    <div className="warp">
                        {editToolBar}
                    </div>
                </div>
                <div className="markTool">
                    <div className="warp">
                        {markToolBar}
                    </div>
                </div>
            </div>
        )
        console.log(editToolBar)
        return toolbar;
    }
    render(){




        return (
            <div className="markedit">
                {this.renderTool()}
                <div className="markBody">
                    <div className="editArea">
                        <textarea
                            ref="markEdit"
                            onChange={this.handleMarkChange.bind(this)}
                            defaultValue={this.props.input}>
                        </textarea>
                    </div>
                    <div className="showArea">
                        <div
                            dangerouslySetInnerHTML={{__html:marked(this.props.input)}}
                            className="show markdown"></div>
                    </div>
                </div>
            </div>
        )
    }

    handleMarkChange(e){
        var markString = e.target.value;
        var htmlString = marked(markString);
        this.props.onMarkChange(markString,htmlString)
    }
    toolBtnEvent(todo){
        alert(todo)
    }
}
