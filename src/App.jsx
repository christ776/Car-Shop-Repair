import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
} from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import LoginForm from './components/Login';
import CreateUser from './components/CreateUser';
import Home from './components/Home';
import NotFound from './components/404';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentWillMount() {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      this.setState({
        user: JSON.parse(userToken),
      });
    }
  }

  render() {
    const { user } = this.state;

    return (
      <AppContainer>
        <BrowserRouter>
          <div>
            <Route path="/login" component={LoginForm} />
            <Route path="/registerUser" component={CreateUser} />
            <Route
              exact
              path="/"
              render={() => (

                user ?
                  <Home user={user} />
                  : <Redirect to="/login" />

              )}
            />
            <Route path="*" component={NotFound} />
          </div>
        </BrowserRouter>
      </AppContainer>
    );
  }
}
