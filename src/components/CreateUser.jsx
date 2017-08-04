import React, { Component } from 'react';
import { Checkbox,
  FormGroup,
  ControlLabel,
  FormControl,
  Col,
  Form,
  Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const formInstance = (
  <div className="container">
    <Form horizontal>
      <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}>
        Email
        </Col>
        <Col sm={10}>
          <FormControl type="email" placeholder="Email" />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalPassword">
        <Col componentClass={ControlLabel} sm={2}>
        Password
        </Col>
        <Col sm={10}>
          <FormControl type="password" placeholder="Password" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Checkbox>Remember me</Checkbox>
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
          Sign in
          </Button>
        </Col>
      </FormGroup>
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
