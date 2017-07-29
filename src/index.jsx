import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const render = (component) => {
  ReactDOM.render(
    React.createElement(component), document.getElementById('root'),
   );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
