import React from 'react';
import Logo from '../logo/Logo';

const NavBar = ({username, route, onLogout}) => { 
    return(
        <nav>
            <Logo />
            {username}
            <button onClick={onLogout}>
                {route}
            </button>
        </nav>
    );
}

export default NavBar;