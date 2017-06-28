/**
 * 程序主入口
 * 作者：张晓东
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Routers from './routes.js';

ReactDOM.render(
    Routers,
    document.getElementById('bodyContent')
);