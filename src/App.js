import React, {Component} from 'react';
import './App.css';
import ApiHandler from './components/apiHandler/ApiHandler';
import Client from './components/client/Client';
import Navigation from './components/navigation/Navigation';

const initState = {
  username: 'Face Recognition Application',
  isSignedIn: false,
  clientRoute: 'Sign Up',
  email: '',
  entries: 0,
}

class App extends Component {
  constructor(){
    super();

    this.state = initState;
  }

  logoutUser = () => {
    this.setState({
      username: 'Face Recognition Application',
      isSignedIn: false,
      clientRoute: 'Sign Up',
      email: '',
      entries: 0
    });
  }

  loginUser = (passedUsername, passedEmail, passedEntries) => {

    this.setState({
      username: passedUsername,
      isSignedIn: true,
      email: passedEmail,
      entries: passedEntries,
    }, () => console.log(passedEmail, passedUsername, passedEntries));
  }

  render(){
    return (
      <div>
        <Navigation 
          username={this.state.username} 
          isSignedIn={this.state.isSignedIn} 
          logoutUser={this.logoutUser} 
        />
        {
          !this.state.isSignedIn
          ? <Client clientRoute={this.state.clientRoute} loginUser={this.loginUser} />
          : <ApiHandler email={this.state.email} entries={this.state.entries}/>
        }
      </div>
      );
  }
}

export default App;
