import React, { Component } from 'react';
import Clarifai from 'clarifai';
import app from '../../key/Clarifai';
import ApiLink from '../api/ApiLink';
import InputController from '../input/InputController';
import Rank from '../ranking/Rank';

class Application extends Component {
    constructor({username}) {
        super();

        this.state = {
            username: username,
            input: '',
            imageUrl: '',
            box: {}
        };
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onConvertData = (data) => {
        const targeting = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('targetImage');
        const width = Number(image.width) + 20;
        const height = Number(image.height) + 20;

        return {
            topRow: targeting.top_row * height,
            leftCol: targeting.left_col * width,
            bottomRow: height - (targeting.bottom_row * height),
            rightCol: width - (targeting.right_col * width)
        }
    }

    onBuildBox = (values) => {
        this.setState({
            box: values
        });
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});

        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input
        ).then(response => this.onBuildBox(this.onConvertData(response))
        .catch(err => console.log(err)));
    }

    render() {
        return(
            <main>
                <Rank username={this.state.username}/>
                <InputController onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <ApiLink imageUrl={this.state.imageUrl} box={this.state.box}/>
            </main>
        );
    }
}

export default Application;