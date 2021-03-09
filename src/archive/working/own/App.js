import React, {Component} from 'react';
import './App.css';
import ErrorBoundaries from './components/working/containers/ErrorBoundaries';
import Clarifai from 'clarifai';
import NavBar from './components/navbar/NavBar';
import Form from './components/form/Form';
import Application from './components/application/Application';
/*
  app
    s: register | login | signout
    c: nav bar
      c: logo
      p: register or Sign in | sign out (s: signout)
    c: form (s: register | login)
      p: email
      p: password
      p: password confirm (s: register)
      p: submit
    c: image placeholder (s: signout)
    c: input handeler (s: signout)
      p: url input
      p: submit
*/

const clarifaiAPI = new Clarifai.App({
 apiKey: 'eef4a030646449988f9c7ce5b6975af6'
});

class App extends Component {
  constructor(){
    super();

    this.state = {
      input: '',
      imgUrl: '',
      box: {},
      route: 'Login',
      alternative: 'Logout',
    }
  }

  /*
  calculateLocals = (data) => {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(faceData);


    const image = document.getElementById('targetImage');

    const width = Number(image.width);
    const height = Number(image.height);

    return {
      left: faceData.left_col * width,
      top: faceData.top_row * height,
      right: width - (faceData.right_col * width),
      bottom: height - (faceData.bottom_row * height),
    }
  }

  boxing = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) =>  {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => this.boxing(this.calculateLocals(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = () => {
    this.setState({route: 'application'});
  }

  */

  onChangeRoute = () => {
    const placeHolder = this.state.alternative;
    const options = ['Login', 'Logout'];

    if(this.state.route === options[1]){
      this.setState({alternative: this.state.route});
      this.setState({route: placeHolder});
    }
  }

  render(){
    const options = ['Login', 'Logout'];

    return (
      <ErrorBoundaries> 
        <NavBar route={this.state.route} onChangeRoute={this.onChangeRoute} />
        { 
          this.state.route === options[0] 
          ? <Form route={this.state.route} onChangeRoute={this.onChangeRoute} /> 
          : <Application />
        }
        {/*
        { this.state.route === 'login'
        ? <Registration onRouteChange={this.onRouteChange} /> : 
          <div>
            <Signin />
            <Rank />
            <DataForm onInputChange = {this.onInputChange}  onButtonSubmit={this.onButtonSubmit}/>
            <Application box={this.state.box} imageUrl={this.state.imgUrl}/>
          </div>
        }
      */}
      </ErrorBoundaries>
    );
  }
}

export default App;
