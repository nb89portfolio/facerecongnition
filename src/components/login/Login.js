import React, {Component} from 'react';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            currentOperation: 0,
            operationsList: ['Registration', 'Login', 'Recover'],
            username: '',
            usernameValid: true,
            email: '',
            emailValid: true, 
            password: '',  
            passwordValid: true,
            confirmation: '',
            confirmationValid: true,
            formValid: false     
        }
    }

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

    validateUsername = (event) => {
        const pattern = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

        let validator = pattern.test(event.target.value);
        
        this.setState({
            username: event.target.value,
            usernameValid: validator
        }, () => {
            console.log();
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

    validateForm = () => {
        if(
            this.state.currentOperation === 0 
            && this.state.usernameValid 
            && this.state.username !== ''
            && this.state.emailValid
            && this.state.email !== '' 
            && this.state.passwordValid
            && this.state.password !== '' 
            && this.state.confirmationValid
            && this.state.confirmation !== ''
        ){
            this.setState({
                formValid: true
            }, () => {
                this.props.onLogin(this.state.formValid, this.state.username);
            });

        } else if(
            this.state.currentOperation === 1
            && this.state.emailValid 
            && this.state.email !== '' 
            && this.state.passwordValid
            && this.state.password !== '' 
        ){
            this.setState({
                formValid: true
            }, () => {
                console.log();
            });
        } else if(
            this.state.currentOperation === 2 
            && this.state.passwordValid
            && this.state.password !== '' 
        ){
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

    render() {
        const errorMessges = [
            'Error: Username must be minimum 8 characters from and contain no special characters.',
            'Error: Email is not formatted correctly.',
            'Error: Password must be 8 characters long with at least 1 special, lower, and'
                + ' uppercase character.',
            'Error: Entered passwords do not match.',
            'Warning: This application is for demonstration. This is connected to the Clarifai face' 
                + ' recognition api. Use the registration form to move onto the face recognition.' 
                + ' No information is logged through the registration.'
        ];

        const buttonLabels = ['Recover', 'Submit'];

        return(
            <main>
                <h1>{this.state.operationsList[this.state.currentOperation]}</h1>
                <button onClick={this.toggleOperation}>{this.state.operationsList[this.state.currentOperation === 1 ? 0 : 1]}</button>
                <form>
                    {
                        this.state.currentOperation === 0
                        ? <input type='text' placeholder='Username' onChange={this.validateUsername} />
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
                <div className="formError">{errorMessges[4]}</div>
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