// @ts-check
import React, { Component } from 'react';
import SingleInput from './SingleInput';
import './../../styles/main.scss';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userIsLoggedIn: false,
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
    const request = new Request('http://localhost:3000/api/login', {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password }),
    });

    fetch(request).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
      .then(({ token, user }) => {
        this.setState({ userIsLoggedIn: true, user });
        localStorage.setItem('user', JSON.stringify(user));
      });
  }

  render() {
    const { userIsLoggedIn } = this.state;
    if (userIsLoggedIn) {
      return (
        <Redirect to="/" />
      );
    }

    return (

      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={this.handleFormSubmit}>
            <SingleInput
              inputType={'text'}
              title={'email'}
              name={'email'}
              controlFunc={this.handleEmailChange}
              placeholder={'Type first and last name here'}
            />
            <SingleInput
              inputType={'password'}
              title={'password'}
              name={'password'}
              controlFunc={this.handlePwdChange}
              placeholder={''}
            />
            <button type="submit">login</button>
            <p className="message">Not registered?
              <Link to="/registerUser">Create an account</Link></p>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
