import React from 'react';
import dva from './utils/dva';
import Router from './routes/router';

import Home from './models/home';
import Mine from './models/mine';

const app = dva({
  models: [Home, Mine],
  onError(e) {
    console.log('onError', e);
  },
});

const App = app.start(<Router />);

export default App;
