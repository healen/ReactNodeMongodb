/**
 * Created by zhangxiaodong on 2017/6/29.
 */

import React,{Component} from 'react';
import './style/iconfont.less';
import './app.less'

import marked from 'marked';
import highlight from 'highlight.js'

marked.setOptions({
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});




export default class MarkEdit extends Component{
    constructor(props){
        super(props);
        this.state={
            editArea:'50%',
            showArea:'50%',
            zoom:false
        }
    }
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

                {title:"缩进",ico:'table',line:false,todo:'table'},
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
        //console.log(editToolBar)
        return toolbar;
    }


    /*
    * 编辑器核心
    * */
    insertAtCursor(field,value,pos=0){
        //IE support
        if (document.selection) {
            field.focus();
            sel = document.selection.createRange();
            sel.text = value;
            sel.select();
        }
        //MOZILLA/NETSCAPE support
        else if (field.selectionStart|| field.selectionStart == '0') {
            let startPos = field.selectionStart;
            let endPos = field.selectionEnd;
            // save scrollTop before insert   www.keleyi.com
            let restoreTop = field.scrollTop;
            field.value = field.value.substring(0, startPos) + value + field.value.substring(endPos, field.value.length);
            if (restoreTop > 0) {
                field.scrollTop = restoreTop;
            }
            field.focus();
            field.selectionStart = startPos + value.length;
            field.selectionEnd = startPos + value.length + pos;
        } else {
            field.value += value;
            field.focus();
        }

    }
    render(){
        let zoom = this.state.zoom?'zoom':''
        return (
            <div className={`markedit ${zoom}`}>
                {this.renderTool()}
                <div className="markBody">
                    <div className="editArea" style={{width:this.state.editArea}}>
                        <textarea
                            ref="markEdit"
                            onChange={this.handleMarkChange.bind(this)}
                            defaultValue={this.props.input}>
                        </textarea>
                    </div>
                    <div className="showArea" style={{width:this.state.showArea}}>
                        <div
                            dangerouslySetInnerHTML={{__html:marked(this.props.input)}}
                            className="show markdown-body"></div>
                    </div>
                </div>
            </div>
        )
    }

    handleMarkChange(e){
        let markString = e.target.value;
        let htmlString = marked(markString);
        this.props.onMarkChange(markString,htmlString)
    }
    toolBtnEvent(todo){
        let field = this.refs.markEdit;
        switch(todo){
            case 'bold':
                this.insertAtCursor(field,'**加粗**',-2);
                break;
            case 'italic':
                this.insertAtCursor(field,'_倾斜_',-1);
                break;
            case 'h1':
                this.insertAtCursor(field,'\n# 标题1',1);
                break;
            case 'h2':
                this.insertAtCursor(field,'\n## 标题2',1);
                break;
            case 'h3':
                this.insertAtCursor(field,'\n### 标题3',1);
                break;
            case 'link':
                this.insertAtCursor(field,'[link](http://)',-1);
                break;
            case 'indent':
                this.insertAtCursor(field,'\n> ',1);
                break;

            case 'table':
                let table = "\n栏目1 | 栏目2 | 栏目3\n";
                    table+="------- | ------- | -------\n";
                    table+="内容1 | 内容2 | 内容3\n";
                    table+="内容1 | 内容2 | 内容3\n";
                    table+="内容1 | 内容2 | 内容3\n";
                    table+="内容1 | 内容2 | 内容3\n";

                this.insertAtCursor(field,table,1);
                break;



            case 'code':
                this.insertAtCursor(field,'\n ```js \n\n```',-4);
                break;

            case 'image':
                this.insertAtCursor(field,'\n![alt](http://)',-1);
                break;

            case 'olist':
                this.insertAtCursor(field,'\n 1. 有序列表',1);
                break;

            case 'list':
                this.insertAtCursor(field,'\n * 无序列表',1);
                break;

            case 'zoom':
                this.setState({
                    zoom:!this.state.zoom
                });


                //alert(1)
                break;
            case 'edit':
                if(this.state.editArea=="50%"){

                    this.setState({
                        editArea:"100%",
                        showArea:'0px'
                    })

                }else{
                    this.setState({
                        editArea:"50%",
                        showArea:'50%'
                    })

                }
                break;
            case 'column':
                    this.setState({
                        editArea:"50%",
                        showArea:'50%'
                    })
                break;


            case 'eye':
                if(this.state.showArea=="50%"){
                    this.setState({
                        editArea:"0px",
                        showArea:'99.8%'
                    })
                }else{
                    this.setState({
                        editArea:"50%",
                        showArea:'50%'
                    })

                }
                break;
        }
        let markString = field.value;
        let htmlString = marked(markString);
        this.props.onMarkChange(markString,htmlString);
    }
}
