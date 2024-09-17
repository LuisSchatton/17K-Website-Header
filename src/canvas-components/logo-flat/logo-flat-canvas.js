import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnimationFlat } from './logo-flat-model.js';

export default function LogoFlatCanvas() {

    const [color , setColor] = useState(0)

    const toggleClick = () => setColor(color === 3 ? color - 3 : color + 1);

    return (

        <div style={color === 0 ? {backgroundColor: "#C9F0E3"} 
                : color === 1 ? {backgroundColor: "#C9E3F0"}
                : color === 2 ? {backgroundColor: "#FCDCE1"}
                : color === 3 ? {backgroundColor: "#F0E3DA"}
                : {backgroundColor: "white"}} className="canvas-container">

            <Canvas onClick={toggleClick}>
                <AnimationFlat play={true} clr={color}/>
            </Canvas>
        </div>
    );
}