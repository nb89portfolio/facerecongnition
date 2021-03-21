import React, { Component } from "react";
import Clarifai from 'clarifai';
import app from '../../key/Clarifai';

class ApiHandler extends Component {
    constructor(props) {
        super();

        this.state = {
            email: props.email,
            entries:props.entries,
            input: '',
            imgLink: '',
            box: []
        }
    }
    
    updateInput = (event) => {
        this.setState({
            input: event.target.value
        })
    }

    submitImage = () => {
        this.setState({
            imgLink: this.state.input
        }, () => {
            app.models.predict(
                Clarifai.FACE_DETECT_MODEL,
                this.state.input
            )
            .then(response => this.parseData(response))
            .catch(error => console.log('Error: ' + error))
        })
    }

    parseData = (data) => {
        console.log(data);
        data.outputs[0].data.regions.forEach(element => {
            console.log(element);
            this.convertData(element.region_info.bounding_box);
        });
    }

    convertData = (data) => {
        const image = document.getElementById('targetImage');
        const width = Number(image.width);
        const height = Number(image.height);

        let newBox = {
            topRow: data.top_row * height,
            leftCol: data.left_col * width,
            bottomRow: height - (data.bottom_row * height),
            rightCol: width - (data.right_col * width)
        }

        let currentCoordinates = this.state.box.concat(newBox);

        this.setState({
            box: currentCoordinates
        }, () => console.log(this.state.box));
    }

    render() {
        return (
            <main>
                <h1>{'Searches: ' + this.state.entries}</h1>
                <form>
                    <input type='text' placeholder='Image URL' onChange={this.updateInput}/>
                </form>
                <button onClick={this.submitImage}>Submit</button>
                {
                    this.state.imgLink === ''
                    ? ''
                    : <img id="targetImage" alt="Searched image..." src={this.state.imgLink}/>
                }
                {
                    this.state.box.forEach(element => {
                        <div>{element}</div>
                    })
                }
            </main>
        );
    }
}

export default ApiHandler;