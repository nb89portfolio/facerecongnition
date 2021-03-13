import React from 'react';

const Rank = ({username}) => {
    const message = [
        'User: ' + username, 
        'Your Rank is: ' + '0'
    ];  

    return(
        <section>
           <h1>{message[0]}</h1>
           <h2>{message[1]}</h2>
        </section>
    );
}

export default Rank;