import React, {Component} from 'react';

class UsernameInput extends Component {
    constructor() {
        super();

        this.state = {
            isValid: true
        };
    }

    validateUsername = (event) => {
        const pattern = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

        if(pattern.test(event.target.value)){
            this.setState({
                isValid: true
            });
        } else {
            this.setState({
                isValid: false
            });
        }
    }

    render() {
        const usernameError = 'Error: Username is not correctly formatted and will not be accepted.';

        return(
            <div>
                <input type="text" id="inputForUsername" placeholder="Username" onChange={this.validateUsername, parentCallsInput} />
                {
                    this.state.isValid ? <br /> : <div class="inputError">{usernameError}</div>
                }
            </div>
        );
    }
}

export default UsernameInput;

