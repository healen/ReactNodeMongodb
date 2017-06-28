/**
 * Created by zhangxiaodong on 2017/6/23.
 */
import React,{Component} from 'react';
import './app.less';

class Model extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }
    render(){
        var modelFoot = '';
        if(this.props.type=='alert'){
            modelFoot=(
                <div className="model-foot">
                    <button className='btn btn-primary' onClick={this.close.bind(this)}>确定</button>
                </div>
            )
        }else if(this.props.type=='comfrim'){
            modelFoot=(
                <div className="model-foot">
                    <button className='btn btn-default' style={{marginRight:'10px'}} onClick={this.close.bind(this)}>取消</button>
                    <button className='btn btn-primary' onClick={this.comfrim.bind(this)}>确认</button>
                </div>
            )
        }
        var modelbody = (
            <div className="model-dialog"  style={{width:this.props.width,height:this.props.height}}>
                <div className="model-dialog-close" onClick={this.close.bind(this)}></div>
                <div className="model-dialog-head">
                    <div className="model-dialog-title">{this.props.title}</div>
                </div>
                <div className="model-dialog-body">
                    {this.props.children}
                </div>
                {modelFoot}
            </div>
        )
        if(this.props.type=='model'){
            modelbody=(
                <div style={{position:'absolute',zIndex:12}}>{this.props.children}</div>
            )
        }
        return (
            <div className="Model" ref='model'  style={{display:this.props.visible==true?'block':'none'}}>
                <div className="model-mask"></div>
                {modelbody}
            </div>
        )
    }
    close(){
        this.props.onClose()
    }
    comfrim(){
        this.props.onComfrim()

    }
}

Model.defaultProps={
    title:'填空',
    width:'400px',
    height:'240px'

}
export default Model;