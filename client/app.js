// 用jsx语法就必须要引入react
import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';  // eslint-disable-line
import App from './App.jsx';

// ReactDom.hydrate(<App />, document.getElementById('#root'));

const root = document.getElementById('#root');

const render = (Component) => {
  ReactDom.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  )
};

render(App);

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const nextApp = require('./App.jsx').default; // eslint-disable-line
    // ReactDom.hydrate(<nextApp />, document.getElementById('#root'));
    render(nextApp);
  })
}
