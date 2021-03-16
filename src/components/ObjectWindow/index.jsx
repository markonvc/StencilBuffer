import React, { useEffect } from 'react';
import Feature from "../../3D/scene";



function ObjectWindow() {

    useEffect(() => {
        Feature();
    }, [])


    return(
       <canvas id="canvas"></canvas>
    )
}

export default ObjectWindow;