import React, { Component } from "react";

class Client extends Component {
    constructor(props) {
        super();

        this.state = {
            route: props.clientRoute,
            alternate: 'Sign In',
            usernameValue: '',
            emailValue: '',
            passwordValue: '',
            confirmationValue: '',
            usernameValid: false,
            emailValid: false,
            passwordValid: false,
            confirmationValid: false,
            submitValid: true,
            serverValid: true,
            entries: ''
        }
    }
    
    toggleOptions = () => {
        const placeholder = this.state.route;
        
        this.setState({
            route: this.state.alternate,
            alternate: placeholder,
            usernameValue: '',
            emailValue: '',
            passwordValue: '',
            confirmationValue: '',
            usernameValid: false,
            emailValid: false,
            passwordValid: false,
            confirmationValid: false,
            submitValid: true,
            serverValid: true,
            entries: ''
        });
    }

    validateUsername = (event) => {
        //eslint-disable-next-line
        const pattern = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

        let validator = pattern.test(event.target.value);
        
        this.setState({
            usernameValue: event.target.value,
            usernameValid: validator
        }, () => console.log());
    }

    validateEmail = (event) => {
        //eslint-disable-next-line
        const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        let validator = pattern.test(event.target.value);
        
        this.setState({
            emailValue: event.target.value,
            emailValid: validator
        }, () => console.log());
    }

    validatePassword = (event) => {
        //eslint-disable-next-line
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,254}$/;

        let validator = pattern.test(event.target.value);

        this.setState({
            passwordValue: event.target.value,
            passwordValid: validator
        }, () => console.log());

        validator = event.target.value === this.state.confirmation;

        this.setState({
            confirmationValid: validator
        }, () => console.log());
    }

    validateConfirmPassword = (event) => {
        let validator = event.target.value === this.state.passwordValue;

        this.setState({
            confirmationValue: event.target.value,
            confirmationValid: validator
        }, () => console.log());
    }

    onSubmit = () => {
        if(this.state.route === 'Sign Up'){
            this.onRegister();
        } else {
            this.onLogin();
        }   
    }

    onRegister = () => {
        if(this.state.usernameValid && this.state.emailValid && this.state.passwordValid && this.state.confirmationValid) {
            this.setState({
                submitValid: true
            }, () => {
                fetch('http://localhost:3001/register', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify({
                        username: this.state.usernameValue,
                        email: this.state.emailValue,
                        password: this.state.passwordValue
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if(data !== 'Authentication: Failed.'){
                        this.props.loginUser(data.username, this.state.emailValue, data.entries);
                    } else {
                        this.setState({
                            serverValid: false
                        });
                    }
                })
            });
        } else {
            this.setState({
                submitValid: false
            });
        }
    }

    onLogin = () => {
        if(this.state.emailValid && this.state.passwordValid) {
            this.setState({
                submitValid: true
            }, () => {
                fetch('http://localhost:3001/login', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify({
                        email: this.state.emailValue,
                        password: this.state.passwordValue
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if(data !== 'Authentication: Failed.'){
                        this.props.loginUser(data.username, this.state.emailValue, data.entries);
                    } else {
                        this.setState({
                            serverValid: false
                        });
                    }
                })
            });
        } else {
            this.setState({
                submitValid: false
            });
        }
    }

    render() {
        return (
            <main>
                <h1>{this.state.route}</h1>
                <button onClick={this.toggleOptions}>{this.state.alternate}</button>
                <form>
                    { 
                        this.state.route === 'Sign Up'
                            ?   <input type='text' placeholder="Username" autoComplete="on" onChange={this.validateUsername}/> 
                            :   ''
                    }
                    <input type='email' placeholder="Email" autoComplete="on" onChange={this.validateEmail}/>
                    <input type='password' placeholder="Password" autoComplete="on" onChange={this.validatePassword}/>
                    { 
                        this.state.route === 'Sign Up'
                            ?   <input type='password' placeholder="Confirm Password" autoComplete="on" onChange={this.validateConfirmPassword}/>
                            :   ''
                    }
                </form>
                {
                        !this.state.submitValid
                            ? <p className="errorMessage">{'Error: Information has not been properly entered. Please try again.'}</p>
                            : ''
                    }
                {
                        !this.state.usernameValid && this.state.usernameValue !== ''
                            ? <p className="errorMessage">{'Error: Username must be minimum 8 characters from and contain no special characters or spaces.'}</p> 
                            : ''
                    }
                    {
                        !this.state.emailValid && this.state.emailValue !== ''
                            ? <p className="errorMessage">{'Error: Email is not formatted correctly.'}</p> 
                            : ''
                    }
                    {
                        !this.state.passwordValid && this.state.passwordValue !== ''
                            ? <p className="errorMessage">{'Error: Password must be 8 characters long with at least 1 special, lower, and uppercase character.'}</p> 
                            : ''
                    }
                    {
                        !this.state.confirmationValid && this.state.confirmationValue !== ''
                            ? <p className="errorMessage">{'Error: Entered passwords do not match.'}</p> 
                            : ''
                    }
                    {
                        !this.state.serverValid
                            ? <p className="errorMessage">{'Error: Server could not find or add user.'}</p> 
                            : ''
                    }
                <button onClick={this.onSubmit}>Submit</button>
            </main>
        );
    }
}

export default Client;