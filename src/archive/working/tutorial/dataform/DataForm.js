import React from 'react';
import './dataform.css';

const DataForm = ({onInputChange, onButtonSubmit}) => {
    return(
        <main>
            <p>{'Face detection using images.'}</p>
            <div>
                <input type='text' onChange={onInputChange}/>
                <button onClick={onButtonSubmit}>Scan</button>
            </div>
        </main>
    );
}

export default DataForm;