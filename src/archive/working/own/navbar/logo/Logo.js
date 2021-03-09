import React from 'react';
import LogoImage from './logo.png';

const Logo = () => {
    return (
        <button>
            <img 
                src={LogoImage} 
                alt="NB89 Portolfio logo."/>
        </button>
    );
}

export default Logo;