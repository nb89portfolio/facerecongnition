import React, {Component} from 'react';
import UsernameInput from './Username';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            route: {
                options: [
                    'Register',
                    'Sign In',
                    'Recover'
                ],
                current: 'Register' 
            },
            user: {
                id: '',
                email: '',
                password: '',
                confirmation: '',
            },
            validation: {
                id: false,
                email: false,
                password: false,
                confirmation: false,
                submit: false
            } 
        }
    }

    /*
    toggleOperation = () => {
       this.setState({
           currentOperation: this.state.currentOperation === 1 ? 0 : 1
       })
    }

    toggleRecovery = () => {
        this.setState({
            currentOperation: 2
        });
    }

    validateEmail = (event) => {
        const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        let validator = pattern.test(event.target.value);
        
        this.setState({
            email: event.target.value,
            emailValid: validator
        }, () => {
            console.log();
        });
    }

    validatePassword = (event) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,254}$/;

        let validator = pattern.test(event.target.value);

        this.setState({
            password: event.target.value,
            passwordValid: validator
        }, () => {
            console.log();
        });

        validator = event.target.value === this.state.confirmation;

        this.setState({
            confirmationValid: validator
        }, () => {
            console.log();
        });
    }

    validateConfirmation = (event) => {
        let validator = event.target.value === this.state.password;

        this.setState({
            confirmation: event.target.value,
            confirmationValid: validator
        }, () => {
            console.log();
        });
    }

    validateRegistration = () => {
        return this.state.usernameValid 
            && this.state.username !== ''
            && this.state.emailValid
            && this.state.email !== '' 
            && this.state.passwordValid
            && this.state.password !== '' 
            && this.state.confirmationValid
            && this.state.confirmation !== '' 
            ? true 
            : false;
    }

    validateLogin = () => {
        return this.state.emailValid 
            && this.state.email !== '' 
            && this.state.passwordValid
            && this.state.password !== '' 
            ? true 
            : false; 
    }

    validateRecovery = () =>{
        return this.state.passwordValid
            && this.state.password !== ''
            ? true
            : false; 
    }

    validateForm = () => {
        if(this.state.currentOperation === 0 && this.validateRegistration()){
            this.setState({
                formValid: true
            }, () => {
                fetch('http://localhost:3001/register', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: this.state.email,
                        username: this.state.username,
                        password: this.state.password,
                    })
                }).then(this.props.onLogin(this.state.formValid, this.state.username))
            });
        } else if(this.state.currentOperation === 1 && this.validateLogin()){
            this.setState({
                formValid: true
            }, () => {
                fetch('http://localhost:3001/login', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        if(data === 'Success'){
                            this.props.onLogin(this.state.formValid, this.state.username);
                        }
                    })
            });
        } else if(this.state.currentOperation === 2 && this.validateRecovery()){
            this.setState({
                formValid: true
            }, () => {
                console.log();
            });
        } else {
            this.setState({
                formValid: false
            }, () => {
                console.log();
            });
        }
    }
    */
   
    fetchUsernameData = (usernameData, usernameValid) => {

    }

    render() {
        const errorMessges = [
            ' ',
            'Error: Email is not formatted correctly.',
            'Error: Password must be 8 characters long with at least 1 special, lower, and'
                + ' uppercase character.',
            'Error: Entered passwords do not match.'
        ];

        const buttonLabels = ['Recover', 'Submit'];

        return(
            <main>
                <h1>{this.state.operationsList[this.state.currentOperation]}</h1>
                <button onClick={this.toggleOperation}>{this.state.operationsList[this.state.currentOperation === 1 ? 0 : 1]}</button>
                <form>
                    {
                        this.state.currentOperation === 0
                        ? <UsernameInput fetchUsernameData={this.fetchUsernameData} />
                        : ''
                    }
                    <input type='email' placeholder='Email Address' onChange={this.validateEmail} />
                    {
                        this.state.currentOperation !== 2
                        ? <input type='password' placeholder='Password' onChange={this.validatePassword} />
                        : ''
                    }
                    {
                        this.state.currentOperation === 0
                        ? <input type='password' placeholder='Confrim Password' onChange={this.validateConfirmation} />
                        : ''
                    }
                </form>
                {
                    this.state.usernameValid 
                        ? '' 
                        : <div className="formError">{errorMessges[0]}</div>
                }
                {
                    this.state.emailValid
                        ? '' 
                        : <div className="formError">{errorMessges[1]}</div>
                }
                {
                    this.state.passwordValid
                        ? '' 
                        : <div className="formError">{errorMessges[2]}</div>
                }
                {
                    this.state.currentOperation === 0 ? (
                        this.state.confirmationValid
                            ? '' 
                            : <div className="formError">{errorMessges[3]}</div>
                        ) 
                        : ''
                    
                }
                {
                    this.state.currentOperation === 1
                    ? <button onClick={this.toggleRecovery}>{buttonLabels[0]}</button>
                    : ''
                } 
                <button onClick={this.validateForm} >{buttonLabels[1]}</button>
            </main>
        );
    }
}

export default Login;