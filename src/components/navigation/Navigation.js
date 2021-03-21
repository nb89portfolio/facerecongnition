import React from 'react';
import Logo from "../logo/Logo";

const Navigation = ({username, isSignedIn, logoutUser}) => {

    return(
        <nav>
            <Logo />
            {username}
            {
                isSignedIn 
                ? <button onClick={logoutUser}>Sign Out</button>
                : ''
            }
        </nav>
    );
}

export default Navigation;