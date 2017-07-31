// @ts-check
import React from 'react';
import './../../styles/main.scss';

const Home = () =>
  (<div>
    <h2>
      Hola {this.props.user.fullname} !!
    </h2>
  </div>);

export default Home;
