import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import LoginForm from './components/Login';
import CreateUser from './components/CreateUser';
import Home from './components/Home';
import NotFound from './components/404';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      this.setState({
        user: JSON.parse(userToken),
      });
    }
  }

  render() {
    const { user } = this.props;

    return (
      <>
        <Router>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={CreateUser} />
            <Route
              exact
              path="/"
              render={() => (user !== undefined ? <Home user={user} /> : <Redirect to="/login" />)}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
