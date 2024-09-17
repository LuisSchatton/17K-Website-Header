import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from './fragmente-model-loop.js';
import { useState } from 'react';
import { ScrollControls, useScroll, PresentationControls, PerspectiveCamera, Scroll } from '@react-three/drei';
import { useFrame } from "@react-three/fiber";
import useStore from "../store.js";

function Fragmente() {

  const scroll = useScroll();

  const {
    scrollPosition,
    getScrollposition,
    setScrollposition,
  } = useStore();


  useFrame(() => {
  
    if (scrollPosition !== scroll.offset) {
      setScrollposition(scroll.offset)
    }

  })

  
  return (
    <> 

      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-10, 10, -10]} />

      <Model scale={0.5} position={[0, -1, 0]} />

    </> 

  )

}

export default function LogoFragmenteCanvas() {


    return (
        <Canvas shadows>
          <ScrollControls pages={2} damping={0.1}>
            <PresentationControls global={true}>
                  <Fragmente />
              </PresentationControls>            
          </ScrollControls>
        </Canvas>
    );
}