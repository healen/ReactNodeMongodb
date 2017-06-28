/**
 * Created by zhangxiaodong on 2017/6/28.
 */
import React,{Component} from 'react';
import './app.less'
export default class PageLimit extends Component {
    componentDidMount(){
        this.refs.pageVal.value=this.props.currentPage
    }
    render(){
        let [currentPage,pageCount,count]=[
            this.props.currentPage,
            this.props.pageCount,
            this.props.count,
        ]
        let [disabledNext,disabledPrev]=[
            currentPage==1 ? true : false,
            currentPage==pageCount ? true:false
        ]
        let option = [];
        for(let i=0;i<pageCount;i++){
            option.push(<option key={i} value={i+1}>{i+1}/{pageCount}</option>)
        }
        let body = (
            <div>
                <button
                    disabled={disabledNext}
                    onClick={this.handlePrev.bind(this)}
                    className="prev btn btn-primary btn-sm">
                    上一页
                </button>
                <select
                        onChange={this.handleChangePage.bind(this)}
                    ref='pageVal'
                    className="btn btn-primary btn-sm">
                        {option}
                </select>
                <button
                    disabled={disabledPrev}
                    onClick={this.handleNext.bind(this)}
                    className="prev btn btn-primary btn-sm">
                    下一页
                </button>
                &nbsp;
                共 {count} 条数据
            </div>
        )
        if(pageCount==1){
            body=(<div>共{count} 条数据</div>)
        }
        return (
            <div className="pageLimit">
                {body}
            </div>
        )
    }
    handleNext(){
        this.props.onNext();
        this.refs.pageVal.value=this.props.currentPage+1
    }
    handlePrev(){
        this.props.onPrev();
        this.refs.pageVal.value=this.props.currentPage-1
    }
    handleChangePage(e){
        let val = e.target.value;

        this.props.onChangePage(parseInt(val))
    }
}


