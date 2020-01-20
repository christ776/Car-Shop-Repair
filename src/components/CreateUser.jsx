import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const formInstance = (
  <div className="container">
    <Form horizontal>
      <Form.Group controlId="formHorizontalEmail">
        <Col sm={2}>
        Email
        </Col>
        <Col sm={10}>
          <Form.Control type="email" placeholder="Email" />
        </Col>
      </Form.Group>

      <Form.Group controlId="formHorizontalPassword">
        <Col sm={2}>
        Password
        </Col>
        <Col sm={10}>
          <Form.Control type="password" placeholder="Password" />
        </Col>
      </Form.Group>

      <Form.Group>
        <Col smOffset={2} sm={10}>
          <Form.Check type="checkbox" label="remember me">Remember me</Form.Check>
        </Col>
      </Form.Group>

      <Form.Group>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
          Sign in
          </Button>
        </Col>
      </Form.Group>
    </Form>
  </div>
);

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        fullname: '',
        email: '',
        password: '',
      },
      userToken: undefined,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
  }

  handleFullNameChange(e) {
    this.setState({ ownerName: e.target.value });
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

    const formPayload = {
      fullname: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
    };

    this.createUser(formPayload);
    this.handleClearForm(e);
  }

  createUser(formPayload) {
    const request = new Request('http://localhost:3000/api/createUser', {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        fullname: formPayload.fullname,
        email: formPayload.email,
        password: formPayload.password }),
    });

    fetch(request).then((response) => {
      if (response.status >= 400) {
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
    return (
      formInstance
    );
  }
}

export default CreateUser;
