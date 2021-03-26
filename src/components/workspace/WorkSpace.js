import React from 'react';

const WorkSpace = ({imgLink, box}) => {
    return(
        <section id="imageSection">
            {
                imgLink === ''
                ? ''
                : <img 
                    id="targetImage" 
                    alt="Searched image..." 
                    src={imgLink}
                />
            }
            {
                box.map(element => {
                    return <div 
                            className='targetBox' 
                            style={{
                                top: element.topRow, 
                                left: element.leftCol, 
                                bottom: element.bottomRow, 
                                right: element.rightCol
                            }}>
                        </div>
                })
            }
        </section>
    );
}

export default WorkSpace