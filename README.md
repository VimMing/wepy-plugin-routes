# wepy框架routes插件

[![npm version](https://badge.fury.io/js/wepy-plugin-routes.svg)](https://badge.fury.io/js/wepy-plugin-routes)
[![change-log](https://img.shields.io/badge/changelog-md-blue.svg)](https://github.com/VimMing/wepy-plugin-routes/blob/master/CHANGELOG.md)

## 安装

```
npm install wepy-plugin-routes --save-dev
```


## 配置`wepy.config.js`

```js
const routes = require('src/common/js/routes')
module.exports.plugins = {
  'routes': routes
};
```

## 路由文件
```js
// 'src/common/js/routes'
module.exports = {
  appEntry: '/pages/appEntry',
  clue: {
    index: '/pages/clue',
    add: '/pages/addClue'
  },
  user: {
    login: '^/pages/login', // 首页
    resetPassword: '/pages/resetPassword',
    forgetPassword: '/pages/forgetPassword',
    personInfo: '/pages/personInfo'
  },
  contacts: {
    index: '/pages/contacts',
    add: '/pages/contactsAdd'
  },
  customers: {
    index: '/pages/customer',
    edit: '/pages/customerEdit',
    detail: '/pages/customerDetail'
  },
  schedule: {
    index: '/pages/schedule',
    add: '/pages/addSchedule'
  },
  message: {
    index: '/pages/message'
  },
  report: {
    index: '/pages/report'
  }
}

```

## 作用
> 让路由跳转更语义化

**之前路由跳转**
```
wepy.$navigate('/pages/message')
```

**现在路由跳转**
```
const routes = require('src/common/routes')
wepy.$navigate(routes.message.index)
```


