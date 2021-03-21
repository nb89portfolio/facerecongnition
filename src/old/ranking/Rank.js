import React from 'react';

const Rank = ({entries}) => {
    
    return(
        <section>
           <h1>{'Completed Searches: ' + entries}</h1>
        </section>
    );
}

export default Rank;