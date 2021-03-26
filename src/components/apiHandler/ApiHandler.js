import React, { Component } from "react";
import WorkSpace from "../workspace/WorkSpace";

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
            fetch('http://localhost:3001/url', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    input: this.state.input
                })
            }).then(response => response.json())
            .then(response => {
                if(response){
                    fetch('http://localhost:3001/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            email: this.state.email
                        })
                    })
                    .then(response => response.json())
                    .then(result => {
                        this.setState({
                            entries: result
                        }, console.log(this.state.entries))
                    })
                }
                this.parseData(response);

            })
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
        }, () => console.log(currentCoordinates));
    }

    render() {
        return (
            <main>
                <h1>{'Searches: ' + this.state.entries}</h1>
                <form>
                    <input type='text' placeholder='Image URL' onChange={this.updateInput}/>
                </form>
                <button onClick={this.submitImage}>Submit</button>
                <WorkSpace imgLink={this.state.imgLink} box={this.state.box}/>
            </main>
        );
    }
}

export default ApiHandler;