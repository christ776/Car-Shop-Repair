import React, {Component} from 'react';  
import './../../styles/main.scss';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'; 
import AppBar from 'material-ui/AppBar';

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
        )
    };
}

export default Home;