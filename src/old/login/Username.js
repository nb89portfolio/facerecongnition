import React, { Component } from 'react';

class UsernameInput extends Component {
    constructor({fetchUsernameData}) {
        super();

        this.state = {
            value: '',
            isValid: false,
            nulled: true
        }
    }

    validate = (event) => {
        const pattern = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

        this.setState({nulled: false});

        let validator = pattern.test(event.target.value);
        
        this.setState({
            value: event.target.value,
            isValid: validator
        }).then(
            this.fetchUsernameData(this.state.value, this.state.isValid)
        );
    }

    render() {
        return(
            <div>
                <input type="text" placeholder="Username" onChange={this.validate} />
                {
                    this.state.isValid || !this.state.nulled 
                        ? <p>"Error: Username must be minimum 8 characters from and contain no special characters."</p> 
                        : <p> </p> 
                }
            </div>
        );
    }
}

export default UsernameInput