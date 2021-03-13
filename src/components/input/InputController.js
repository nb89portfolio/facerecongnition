import React from 'react';

const InputController = ({onInputChange, onButtonSubmit}) => {
    const buttonMessage = 'Submit';

    return(
        <section>
            <p>Input an image url. This application will try to find a face and highlight it for you.</p>
            <form>
                <input type='text' placeholder="Image Url" onChange={onInputChange}/>
            </form>
            <button onClick={onButtonSubmit}>{buttonMessage}</button>
        </section>
    );
}

export default InputController;