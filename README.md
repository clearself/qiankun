# qiankun实战示例

qiankun 实战 demo，父应用 vue，子应用使用 `react`, `vue` 和 `原生HTML`。

[微前端qiankun从搭建到部署的实践](https://www.cnblogs.com/wuzhiquan/p/14090485.html?share_token=36c66145-5861-448b-a82c-f0a4ee7b8967)

## 开始
#### 配置淘宝镜像
```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```
安装根目录工程依赖

```
cnpm i
```
一键安装所有主子应用的依赖
```
npm run install
```

一键启动所有所有应用
```
npm start
```

通过 [http://localhost:5500/](http://localhost:5500/) 访问主应用。

## 发布
一键构建并打包所有主子应用
```
npm run build
```

