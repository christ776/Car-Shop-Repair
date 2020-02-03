// @ts-check
import React, { Component } from 'react';
import {
  Link,
  Redirect,
} from 'react-router-dom';

import SingleInput from './SingleInput';
import '../../styles/main.scss';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userIsLoggedIn: false,
      signupFailure: false,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePwdChange(e) {
    this.setState({ password: e.target.value });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      email: '',
      password: '',
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.login();
  }

  login() {
    const { email, password } = this.state;

    const request = new Request('http://localhost:3000/api/login', {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        email,
        password,
      }),
    });

    fetch(request).then((response) => {
      if (response.status >= 400) {
        this.setState({
          signupFailure: 'Bad response from server',
        });
        throw new Error('Bad response from server');
      }
      return response.json();
    })
      .then(({ token, user }) => {
        console.log('Set User token: ', token);
        this.setState({ userIsLoggedIn: true, user });
        localStorage.setItem('user', JSON.stringify(user));
      });
  }

  render() {
    const { userIsLoggedIn, signupFailure } = this.state;
    if (userIsLoggedIn) {
      return (
        <Redirect to="/" />
      );
    }

    return (

      <div className="login-page">
        {
          signupFailure && (
            <div className="alert alert-danger" role="alert">
              {signupFailure}
            </div>
          )
        }
        <div className="form">
          <form className="login-form" onSubmit={this.handleFormSubmit}>
            <SingleInput
              inputType="text"
              placeholder="email"
              name="Email"
              controlFunc={this.handleEmailChange}
            />
            <SingleInput
              inputType="password"
              name="Password"
              controlFunc={this.handlePwdChange}
            />
            <button type="submit">login</button>
            <p className="message">
Not registered?
              <Link to="/registerUser"> Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
