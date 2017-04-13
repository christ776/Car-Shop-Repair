import React, { Component } from 'react';
import './../../styles/main.scss';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

class Root extends Component {

  constructor() {
    super();
    this.state = {
      userCookieisPresent: false
    };
  }

  login(event) {
    event.preventDefault();
    console.log('User has been identified');
    this.setState({ userCookieisPresent: true })
  }

  render() {

    return (
          <div className="login-page">
          <div className="form">
            <form className="login-form" onSubmit={(e) => this.login(e)}>
              <input type="text" placeholder="username"/>
              <input type="password" placeholder="password"/>
              <button type="submit">login</button>
              <p className="message">Not registered? <Link to="/registerUser">Create an account</Link></p>
            </form>
          </div>
        </div>
      );
  }
}

export default Root
