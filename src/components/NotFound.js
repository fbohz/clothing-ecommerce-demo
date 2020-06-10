import React from 'react';

const NotFound = ({custom}) => {
    return (
        <div className="w3-container w3-center w3-animate-opacity"><br></br><br></br>
            <h2> <b> NOT FOUND </b> </h2>
            <p> {custom ? custom : "Ooops! Resource not found :("} </p>
       </div>

    )
}

export default NotFound