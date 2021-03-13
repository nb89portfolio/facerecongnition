import React, {Component} from 'react';
import './App.css';
import NavBar from './components/navbar/NavBar';
import Application from './components/application/Application';
import Login from './components/login/Login';

class App extends Component {
  constructor(){
    super();

    this.state = {
      route:'Login',
      routeOptions: ['Login', 'Logout'],
      isSignedIn: false,
      username:'NB89|Portfolio [Face Recognition App]',
      imageUrl:'',
      targetBox:{}
    }
  }

  onLogout = () => {
    const applicationName = 'NB89|Portfolio [Face Recognition App]';

    if(this.state.isSignedIn){
      this.setState({ 
        route: this.state.routeOptions[0],
        isSignedIn: !this.state.isSignedIn,
        username: applicationName
      });
    } 
  }

  onLogin = (isFormValid, namedUser) => {
    console.log(isFormValid);

    if(isFormValid) {
      this.setState({
        route: this.state.routeOptions[1],
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
          this.state.isSignedIn ? <Application username={this.state.username} /> : <Login onLogin={this.onLogin} />
        }
      </div>
    );
  }
}

export default App;
