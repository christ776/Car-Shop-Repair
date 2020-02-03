import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import '../../styles/main.scss';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupFailure: undefined,
      fullname: undefined,
      email: undefined,
      password: undefined,
    };
  }

  handleFullNameChange = (e) => {
    this.setState({ fullname: e.target.value });
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  handlePwdChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { fullname, email, password } = this.state;
    this.createUser({ fullname, email, password });
    // this.handleClearForm(e);
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      email: '',
      password: '',
    });
  }

  /**
   *
   * @param {*} param0
   */
  createUser({ fullname, email, password }) {
    const request = new Request('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        fullname,
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
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userToken', token);
        this.setState(user);
      });
  }

  render() {
    const { signupFailure } = this.state;
    return (
      <div className="login-page">
        <h3>Sign Up with us</h3>
        {
          signupFailure && (
            <div className="alert alert-danger" role="alert">
              This is a danger alert—check it out!
            </div>
          )
        }
        <Form onSubmit={this.handleFormSubmit} className="form">
          <Form.Group controlId="formBasicFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Full name" onChange={this.handleFullNameChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange} />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={this.handlePwdChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
      Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateUser;
