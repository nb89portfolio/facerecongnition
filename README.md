# Introduction

# Requirements and Specifications

c: component
s: state
f: function
r: reference
i: input
b: button
p: message

c: index
    c: app 
        s: user {id, email, signedin, entries}
        f: signin {take to register or sign in page} 
        f: signout = user.signed = false
        c: nav
            s: signin
            c: logo image 
            r: appname @ user.signedin == false / user.username @ signedin == true
            b: sign in or register @ user.signin == false / logout @ user.signin == true
        c: login @ user.signin == false
            s: selection 
            s: authenticate {id, email, password, confirmation}
            s: inputValidation {id, email, password, confirmation}
            s: responseValidation {register, login, recover}
            f: onsubmit {check selection}
                f: onRegister
                f: onLogin
                f: onRecover
            b: r: register @ selection == login | login @ selection == register 
            c: username @ selection == register
                s: isValid
                f: checkInput
                    f:sendState {data, isValid}
                i: username
                p: error @ isValid == false
            c: email 
                s: isValid
                f: checkInput
                    f:sendState {data, isValid}
                i: email
                p: error @ isValid == false
            c: password @ selection != recover
                s: isValid
                f: checkInput
                    f:sendState {data, isValid}
                i: password
                p: error @ isValid == false
            c: confirmation @ selection == register
                s: isValid
                f: checkInput
                    f:sendState {data, isValid}
                i: confirmation
                p: error @ isValid == false
            b: recover @ selection == login
            b: submit 
                f: onSubmit
            p: server error = 
        c: application @ user.signin == true
        


