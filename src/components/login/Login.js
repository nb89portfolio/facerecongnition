import React, {Component} from 'react';
import UsernameInput from '../inputs/UsernameInput';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            currentOperation: 'Registration',
            alternativeOperation: 'Login'
        }
    }

    toggleOperation = () => {
        const placeHolder = this.state.currentOperation;

        this.setState({
            currentOperation: this.state.alternativeOperation,
            alternativeOperation: placeHolder 
        });
    }

    render() {
        return(
            <main>
                <h1>{this.state.currentOperation}</h1>
                <button onClick={this.toggleOperation}>{this.state.alternativeOperation}</button>
                <form>
                    <UsernameInput />
                </form>
            </main>
        );
    }
}

export default Login;