import React from 'react';
import Logo from './logo/Logo';

const NavBar = ({route, onChangeRoute}) => {
    return(
        <nav>
            <span>
                <Logo />
                {'Face Recognition App'}
            </span> 
            <span>
                <button onClick={onChangeRoute}>{route}</button>
            </span> 
        </nav>
    );
}

export default NavBar;