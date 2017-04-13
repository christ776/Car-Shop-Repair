import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import Main from './containers/Root';
import CreateUser from './containers/CreateUser';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
        <Router>
          <div>
            <Route exact path="/" component={Main} />
            <Route path="/registerUser" component={CreateUser} />
          </div>
        </Router>
    </AppContainer>,
    document.getElementById('root')
  )
}
render(Main)

if (module.hot) {
  module.hot.accept('./containers/Root', () => { render(Root) })
}
