import React from 'react';
import './application.css';

const Applicaiton = ({imageUrl, box}) => {
    return(
            <section>
                <aside>
                    <img id="targetImage" alt="test case" src={imageUrl}/>
                    <div className='boundingBox' style={{top: box.top, right: box.right, bottom: box.bottom, left: box.left}}></div>
                </aside>
            </section>
    );
}

export default Applicaiton;