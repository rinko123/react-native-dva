import React from 'react';
import { AppRegistry, YellowBox } from 'react-native';

import dva from './utils/dva';
import Router, { routerMiddleware } from './router';

import routerModel from './models/router';
import rinkoModel from './models/rinko';

// 忽略警告
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
// eslint-disable-next-line
// if (__DEV__) {
//   global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
// }

console.ignoredYellowBox = [
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: componentWillUpdate is deprecated',
];

const app = dva({
    initialState: {},
    models: [
        routerModel,
        // accountModel,
        rinkoModel,
    ],
    onAction: [routerMiddleware],
    onError(e) {
        console.log('onError', e);
    },
});

const App = app.start(<Router />);

AppRegistry.registerComponent('DebtUrging', () => App);

export default App;
