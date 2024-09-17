import { useFrame } from "@react-three/fiber";
import { useScroll, ScrollControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Model } from "./linien-model.js";
import { Canvas } from "@react-three/fiber";

import useStore from "../store.js";

function Linien() {

  const scroll = useScroll();

  const {
    scrollPosition,
    getScrollposition,
    setScrollposition,
  } = useStore();


  useFrame((state, delta) => {
    // Move camera along
    state.camera.position.set(Math.sin(scrollPosition) * 10, Math.atan(scrollPosition * Math.PI * 2) * 5, Math.cos((scrollPosition * Math.PI) / 2) * 10)
    state.camera.updateProjectionMatrix()
    state.camera.lookAt(0, 0, 0)

    if (scrollPosition !== scroll.offset) {
      setScrollposition(scroll.offset)
    }

  })


  return (
    <>

      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-10, 10, -10]} />

      <Model  />

    </>

  )
}

export default function LogoLinienCanvas() {

  return (
    <Canvas shadows orthographic camera={{ position: [15, 0, 15], zoom: 80 }}>
      <ScrollControls pages={1} damping={0.1}>
        <Linien />
      </ScrollControls>
    </Canvas>
  );
}

