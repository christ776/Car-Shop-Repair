import React, { Component } from 'react';

class CreateUser extends Component {

  createUser(event) {
    event.preventDefault();
    console.log('Creating new user');
  }

  handleClearForm(e) {  
    e.preventDefault();
    this.setState({
      password: '',
      email : ''
    });
  }

  handleFormSubmit(e) {  
    e.preventDefault();

    const formPayload = {
      ownerName: this.state.email,
      selectedPets: this.state.password,
    };

    console.log('Send this in a POST request:', formPayload);
    this.handleClearForm(e);
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
