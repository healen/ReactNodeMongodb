## 项目背景

自从接触React以来，一直对它很感兴趣。最近使用 React 写了个小项目练练手，目前这个版本简约而不简单。是很牛逼的项目

## 技术栈

#### 前端技术栈
* Bootstrap
* React
* React-router
* ECMAScript2015 (es6)
* Axios
* Webpack
* Less
* Jsx

#### 后端技术栈
* Node.js
* Express
* Mongoose

#### 数据库
* Mongodb

#### 服务器
* Nodejs 
* Nginx

## 运行环境
* Mac Os / Windows / Linux
* Nodejs服务器 ／ nginx服务器

## Mongodb安装配置与启动

Mongodb的安装配置与启动 请点击 [Mongodb安装与配置](http://www.runoob.com/mongodb/mongodb-osx-install.html) 请根据自己的系统去安装



## 依赖安装

#### 前端依赖安装
```
cd admin
npm install
```
#### 后端依赖安装
```
cd service
npm install
```

## 后端启动与初始化以及nginx配置

#### 初始化用户

```
cd service
npm run init
```
这一步只能执行一次，目的是创建一个默认用户，然后通过这个用户去登陆后台

#### 启动后端服务
当初始化用户完成之后执行如下操作

```
cd service
npm run start
```
这一步启动后端接口服务器

#### Nginx代理Nodejs服务器
配置一个网站 地址为 nodeapi.cc www.nodeapi.cc然后配置host具体细节 系统学习一下nginx的用法，可以百度搜nginx代理node服务器



## 前端调试开发与打包

#### 调试开发

```
cd admin
npm run dev
```
访问 localhost:8080 

#### 打包

```
cd admin
npm run build
```
这时候 dist文件夹下就是打包后项目

## 说明

通过本项目 学会了react 全家桶 90% nodejs 90% 可以说全会全坑，
本人承接王者荣耀代练白菜价







