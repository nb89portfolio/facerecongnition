import React from 'react';
import Logo from '../logo/Logo';

const NavBar = ({id, isSignedIn, onLogout}) => { 
    return(
        <nav>
            <Logo />
            {id}
            {
                isSignedIn ? 
                <button onClick={onLogout}>
                    {'Sign Out'}
                </button>
                : ''
            }
        </nav>
    );
}

export default NavBar;