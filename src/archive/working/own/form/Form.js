import React, {Component} from 'react';

class Form extends Component {
    constructor(){
        super();

        this.state = {
            operation: 'Registration',
            alternative: 'Login',
            email:'',
            password:'',
            confirm:'',
            emailValid: '',
            passwordValid: '',
            confirmValid: '',
            canSubmit: ''
        };
    }

    changeState = () => {
        const placeholder = this.state.operation;

        this.setState({
            operation: this.state.alternative,
            alternative: placeholder
        });
    }

    submitValidation = () => {
        const options = ['Registration', 'Login'];

        if(this.state.operation === options[0]){
            if(this.state.emailValid){
                if(this.state.passwordValid){
                    if(this.state.confirmValid){
                        this.setState({canSubmit: true});
                    } else {
                        this.setState({canSubmit: false});
                    }
                } else {
                    this.setState({canSubmit: false});
                }
            } else {
                this.setState({canSubmit: false});
            }
        } else if(this.state.operation === options[1]) {
            if(this.state.emailValid){
                if(this.state.passwordValid){
                    this.setState({canSubmit: true});
                } else {
                    this.setState({canSubmit: false});
                }
            } else {
                this.setState({canSubmit: false});
            }
        }
    }

    validateEmail = (event) => {
        const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if(!pattern.test(event.target.value)){
            this.setState({emailValid: false});   
        } else {
            this.setState({emailValid: true});  
        }
    }

    validatePassword = (event) => {
        const pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,254}$/);

        if(!pattern.test(event.target.value)){
            this.setState({passwordValid: false});
        } else {
            this.setState({passwordValid: true});
        }
    }

    validateConfirmation = (event) => {
        const password = document.getElementById('inputPassword').value;

        console.log(password);

        if(event.target.value !== password){
            this.setState({confirmValid: false});
        } else {
            this.setState({confirmValid: true});
        }
    }
    
    render(){
        const options = ['Registration', 'Login'];
        const buttonPrompt = ' Instead';
        const submitPrompt = 'Submit';
        const validationErrors = [
            'Email is not written correctly. Please re-enter.',
            'Password must be at least 8 characters long,' 
            + 'with at least 1 lower and uppercase character, and number.',
            'The confirmation password does not match the password that you have entered.',
            'One of the fields has not been filled out correctly.'
        ];

        return(
            <main>
                <h1>{this.state.operation}</h1>
                <button onClick={this.changeState}>
                    {this.state.alternative + buttonPrompt}
                </button>
                <form>
                    <input 
                        id="inputEmail" 
                        type="email" 
                        placeholder="Email Address" 
                        onChange={this.validateEmail} 
                    />
                    {
                        this.state.emailValid === false
                        ? <p>{validationErrors[0]}</p>
                        : <br/>
                    }
                    <input 
                        id="inputPassword" 
                        type="password"
                        placeholder="Password"
                        onChange={this.validatePassword}  
                    />
                    {
                        this.state.passwordValid === false
                        ? <p>{validationErrors[1]}</p>
                        : <br/>
                    }
                    {
                        this.state.operation === options[0] 
                        ? <input 
                            id="inputConfirm" 
                            type="password" 
                            placeholder="Confirm Password"
                            onChange={this.validateConfirmation}  
                        />
                        : <br/>
                    }
                    {
                        this.state.confirmValid === false && this.state.operation === options[0]
                        ? <p>{validationErrors[2]}</p>
                        : <br/>
                    }
                    {
                        this.state.canSubmit === true | this.state.canSubmit === '' 
                        ? <br/> 
                        : <p>{validationErrors[3]}</p> 
                    }
                </form>
                <button type="submit" onClick={this.submitValidation}>{submitPrompt}</button>
            </main>
        );
    }
}

export default Form;