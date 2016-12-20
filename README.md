## webdemo
webdemo: use bower gulp tools, minify/concat js/css,replace html link uri.

## 项目描述
本项目为一个前端项目模版，使用构建工具gulp实现对资源文件等压缩／合并,web服务启动等；
使用包管理工具bower管理项目依赖。


## 环境准备
安装node.js (6)
从官网下载安装文件：https://nodejs.org/
或者
源码安装：https://github.com/nodejs/node

## 下载代码
git clone https://github.com/xiangtao123/webdemo.git
或者手动下载
https://github.com/xiangtao123/webdemo

## 初始环境
cd webdemo
sudo npm update
bower update

## 构建项目
gulp init
gulp

## 启动服务
### 第一种
使用web服务器，例如：nginx/apache http等。
### 第二种
gulp dev-server(启动开发环境web服务)
gulp dist-server(启动发布环境web服务)
默认端口为：8000


