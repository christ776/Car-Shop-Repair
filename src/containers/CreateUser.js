import React, { Component } from 'react';

class CreateUser extends Component {

  createUser(event) {
    event.preventDefault();
    console.log('Creating new user');
  }

  render() {

    return (
          <div className="login-page">
          <div className="form">
            <form className="login-form" onSubmit={(e) => this.createUser(e)}>
              <input type="text" placeholder="name"/>
              <input type="password" placeholder="password"/>
              <input type="text" placeholder="email address"/>
              <button type="submit">create</button>
            </form>
          </div>
        </div>
      );
  }
}

export default CreateUser
