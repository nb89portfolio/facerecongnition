import React, {Component} from 'react';
import './App.css';
import Clarifai from 'clarifai';
import NavBar from './components/navbar/NavBar';
import Application from './components/application/Application';
import Login from './components/login/Login';

/*
  const clarifaiAPI = new Clarifai.App({
  apiKey: 'eef4a030646449988f9c7ce5b6975af6'
  });
*/

class App extends Component {
  constructor(){
    super();

    this.state = {
      route:'Login',
      isSignedIn: false,
      username:'NB89|Portfolio [Face Recognition App]',
      imageUrl:'',
      targetBox:{}
    }
  }

  onLogout = () => {
    const routeOptions = [
      'Login',
      'Logout'
    ];

    const applicationName = 'NB89|Portfolio [Face Recognition App]';

    if(this.state.isSignedIn){
      this.setState({ 
        route: routeOptions[0],
        isSignedIn: !this.state.isSignedIn,
        username: applicationName
      });
    } 
  }

  onLogin = (isFormValid, namedUser) => {
    const routeOptions = [
      'Login',
      'Logout'
    ];

    if(isFormValid) {
      this.setState({
        route: routeOptions[1],
        isSignedIn: !this.state.isSignedIn,
        username: namedUser
      });
    }
  }

  render(){
    return (
      <div>
        <NavBar username={this.state.username} route={this.state.route} onLogout={this.onLogout} />
        {
          this.state.isSignedIn ? <Application /> : <Login />
        }
      </div>
    );
  }
}

export default App;
