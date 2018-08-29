# react-native-dva
# 前言
最近一版的app使用的是react-native，所以搭个架子总结下使用到的技术，
希望可以对有兴趣入坑的同学一些帮助。
## 环境搭建

请参考 [react-native中文网](https://reactnative.cn/docs/0.51/getting-started.html#content)


## 运行
安装依赖包
```
	yarn
```

android
```
	react-native run-android
```
ios
```
	react-native run-ios
```
## dva介绍
dva解决了我们使用redux管理数据的那些繁杂的步骤，它把所有的步骤都整合到一个model文件里，在这个文件里你可以管理你的state，处理你的同步action还有异步action，而且还整合了redux-saga，让你的异步处理变得更简洁。美滋滋！
## react-native如何结合dva
1. 初始化react-native项目
2. yarn add dva-core
3. yarn add react-redux

使用dva-core的原因是因为react-native并不支持react-router v4，所以我们并不能使用这个路由，我们只需要dva的核心功能就行了。作者也是在这个版本中把dva-core给单独提取了出来，所以我们只需要调用create的方法把它给实例化，然后调用start方法把RN上的路由传进去就行。
```
import React from 'react';
import { create } from 'dva-core';
import { Provider, connect } from 'react-redux';

export { connect };

export default (options) => {
  const app = create(options);
  
  if (!global.registered) options.models.forEach(model => app.model(model));

  global.registered = true;

  app.start();
  
  const store = app._store;

  app.start = container => () => (
    <Provider store={store}>
      {container}
    </Provider>
  );

  app.getStore = () => store;

  return app;
};

```

## react-native如何添加react-navigation
react-navigation是官方推的一个路由，很好用，切换流畅，而且兼容ios和android。
[官方地址](https://reactnavigation.org/)
[中文参考](http://blog.lijunbo.com/2017/06/18/react-navigation-index/)

## 整合遇到的问题
### 打包后无法正常运行的情况
1.错误的使用dva-no-router,这是react项目使用的，并不适用于rn,改用dva-core + react-redux
2.解构失败: const value = ({}) => { ... } 是不允许的， 会报错 
```
ReactNativeJS: 'Unhandled promise rejection', { [TypeError: undefined is not a function (evaluating 'babelHelpers.objectDestructuringEmpty(r)')]
```
### mac运行出现错误
```
Could not install the app on the device, read the error above for details.Make sure you have an Android emulator running or a device connected and have set up your Android development environment:
https://facebook.github.io/react-native/docs/android-setup.html
```
解决办法：
在根目录下运行：chmod 755 android/gradlew 然后就解决了
### react-navigation 问题
[参考](https://www.jianshu.com/p/2f575cc35780)
很全很详细




