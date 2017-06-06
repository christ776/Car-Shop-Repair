// @ts-check
import injectTapEventPlugin from 'react-tap-event-plugin';
import React, {Component} from 'react';  
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import LoginForm from './components/Login';
import CreateUser from './components/CreateUser';
import Home from './components/Home';
import NotFound from './components/404';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';

injectTapEventPlugin();

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

export default class App extends Component {

 constructor(props) {
     super(props)
     this.state = {
         user: null
     }
 }

 componentDidMount() {
    let userToken = localStorage.getItem('user')
    if (userToken) {
        console.log('Detected user in localStorage');
        this.setState({
            user:JSON.parse(userToken)
        })
    }
 }
 
 render() {

    const {user} = this.state;

     return(

     <MuiThemeProvider muiTheme={muiTheme}>
        <AppContainer>
            <BrowserRouter>
            <div style={styles.container}>
                <Route path="/login" component={LoginForm} />
                <Route path="/registerUser" component={CreateUser} />
                <Route exact path="/"  render={() => (

                    user ? 
                    <Home user={user}/>
                    :   <Redirect to='/login'/>
                  
                )}/>
                <Route path='*' component={NotFound} />
            </div>
            </BrowserRouter>
        </AppContainer>
        </MuiThemeProvider>
        )
    }

}