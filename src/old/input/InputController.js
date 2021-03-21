import React from 'react';

const InputController = ({onInputChange, onButtonSubmit}) => {
    return(
        <section>
            <p>Input an image url. This application will try to find a face and highlight it for you.</p>
            <input type='text' placeholder="Image Url" onChange={onInputChange}/>
            <button onClick={onButtonSubmit}>{'Scan Image'}</button>
        </section>
    );
}

export default InputController;