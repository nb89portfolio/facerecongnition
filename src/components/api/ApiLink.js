import { getByPlaceholderText } from '@testing-library/dom';
import React from 'react';

const ApiLink = ({imageUrl, box}) => {
    return(
        <section style={{position: 'relative'}}>
            <div style={{position: 'absolute', top: '20px'}}>
                <img id='targetImage' alt='Defined Image.' src={imageUrl}></img>
                <div className="targetBox" style={{top: box.topRow, left: box.leftCol, bottom: box.bottomRow, right: box.rightCol}}></div>
            </div>
        </section>
    );
}

export default ApiLink;