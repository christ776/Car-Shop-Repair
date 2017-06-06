// @ts-check
import React, { Component } from 'react';
import SingleInput from './SingleInput';

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
      <div className="login-page">
        <div className="form">
          <form id="createUser" className="login-form" onSubmit={e => this.handleFormSubmit(e)}>

            <SingleInput
              inputType={'text'}
              title={'full name'}
              name={'fullname'}
              controlFunc={this.handleFullNameChange}
              placeholder={'Type first and last name here'}
            />
            <SingleInput
              inputType={'text'}
              title={'email'}
              name={'email'}
              controlFunc={this.handleEmailChange}
              placeholder={'your email'}
            />
            <SingleInput
              inputType={'password'}
              title={'password'}
              name={'password'}
              controlFunc={this.handlePwdChange}
              placeholder={''}
            />

            <label><input type="checkbox" htmlFor="createUser" /> Create as Admin</label>
            <button type="submit">create</button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateUser;
