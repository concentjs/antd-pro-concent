<h1 align="center">Ant Design Pro Concent</h1>

## Enjoy [concent](https://github.com/concentjs/concent)🥺🥺🥺
你的star将是我最大的精神鼓励，[欢迎star](https://github.com/concentjs/concent)

## [Ant Design Pro powered by concent](https://github.com/concentjs/antd-pro-concent) 🎉🎉🎉
尽管`concent`有一套自己的标准的开发方式，但是其灵活的架构设计非常的容易与现有的项目集成，此案例将`concent`接入到`antd-pro`(js版本的最后一个版本2.2.0)，源代码业务逻辑没有做任何改动，只是做了如下修改，lint-staged验收通过：
- 在src目录下加入runConcent脚本
- models 全部替换为concent格式定义的，因为umi会自动读取model文件夹定义注入到dva里，所以所有concent相关的model都放在了model-cc文件夹下
- 组件层的装饰器，全部用`concent`替换了`dva`，并做了少许语法的修改
- 引入`concent-plugin-loading`插件，用于自动设置`reducer`函数的开始和结束状态
- 引入`react-router-concent`，用于连接`react-router`和`concent`
- 引入`concent-middleware-web-devtool`(第一个可用版本，比较简陋^_^)，用于查看状态`concent`状态变迁过程
> 注意，运行期项目后，可以打开console，输入`sss`,查看store，输入`cc.dispatch`或`cc.reducer.**`直接触发调用，更多api请移步[concent官网文档](https://concentjs.github.io/concent-site/)查看，更多antd-pro知识了解请移步[antd-pro官网](https://pro.ant.design/index-cn)

## 如何运行
* 下载源代码
```
git clone git@github.com:concentjs/antd-pro-concent.git
```
* 进入根目录，安装依赖包
```
npm i
```
* 运行和调试项目
```
npm start
```
> 默认src目录下放置的是`concent`版本的源代码，如需运行`dva`版本，执行`npm run start:old`，切换为`concent`,执行`npm run start:cc`

## 其他
happy coding, enjoy concent ^_^   
[欢迎star](https://github.com/concentjs/concent)
___
<div align="center">

An out-of-box UI solution for enterprise applications as a React boilerplate.

![](https://user-images.githubusercontent.com/8186664/44953195-581e3d80-aec4-11e8-8dcb-54b9db38ec11.png)

</div>

## Templates
```
- Dashboard
  - Analytic
  - Monitor
  - Workspace
- Form
  - Basic Form
  - Step Form
  - Advanced From
- List
  - Standard Table
  - Standard List
  - Card List
  - Search List (Project/Applications/Article)
- Profile
  - Simple Profile
  - Advanced Profile
- Account
  - Account Center
  - Account Settings
- Result
  - Success
  - Failed
- Exception
  - 403
  - 404
  - 500
- User
  - Login
  - Register
  - Register Result
```

## Usage

### Use bash

```bash
$ git clone https://github.com/concentjs/antd-pro-concent.git --depth=1
$ cd antd-pro-concent
$ npm install
$ npm start         # visit http://localhost:8000
```

### Use by docker

```bash
# sorry, image to be build......
```

## Browsers support

Modern browsers and IE11.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions