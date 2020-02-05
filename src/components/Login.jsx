// @ts-check
import React, { Component } from 'react';
import {
  Link,
  Redirect,
} from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userIsLoggedIn: false,
      signupFailure: false,
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handlePwdChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleClearForm = (e) => {
    e.preventDefault();
    this.setState({
      email: '',
      password: '',
    });
  }

  handleFormSubmit = (e) => {
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
      .then(({ token }) => {
        console.log('Set User token: ', token);
        this.setState({ userIsLoggedIn: true });
        localStorage.setItem('userToken', token);
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
        <h3>Log In</h3>
        <div className="form">
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.handlePwdChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
      Submit
            </Button>
            <p className="message">
Not registered?
              <Link to="/registerUser"> Create an account</Link>
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
