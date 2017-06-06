// @ts-check
import AppBar from 'material-ui/AppBar';
import React, { Component } from 'react';
import './../../styles/main.scss';

class Home extends Component {

  render() {
    return (
      <div>
        <AppBar
              title="Title"
            />
        <h2>
            Hola {this.props.user.fullname} !!
        </h2>
      </div>
    );
  }
}

export default Home;
