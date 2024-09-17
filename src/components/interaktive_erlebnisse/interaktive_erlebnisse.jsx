import React, { useEffect } from "react";
import { OrbitControls, PresentationControls, SpotLight, Grid } from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";
import { RepeatWrapping, TextureLoader } from "three";
import useStore from "../store";

export default function InteraktiveErlebnisse() {

const [colorMap, colorMapCube, emissiveZero, emissiveMapCube] = useLoader(TextureLoader, [
                                                "gridwhite.png",
                                                "17k.png",
                                                "emissive0.png",
                                                "17kb.png"
                                                                        ])

const hovered = useStore(state => state.hover);

  useEffect(() => {
    colorMap.wrapS = RepeatWrapping;
    colorMap.wrapT = RepeatWrapping;
    colorMap.repeat.set( 5, 5);

    colorMapCube.wrapS = RepeatWrapping;
    colorMapCube.wrapT = RepeatWrapping;
    colorMapCube.repeat.set(0.5, 0.5);

    emissiveMapCube.wrapS = RepeatWrapping;
    emissiveMapCube.wrapT = RepeatWrapping;
    emissiveMapCube.repeat.set(0.5, 0.5);
  }, [colorMap, colorMapCube, emissiveMapCube])

  useFrame((state) => {
    let t = -state.clock.getElapsedTime() * 0.2;

        if (hovered) {
            colorMapCube.offset.set(t % 1,  t % 1);
            emissiveMapCube.offset.set(t % 1,  t % 1);
        }
});

    return (
    <>
            <hemisphereLight intensity={0.1} />
            <directionalLight position={[10, 20, 10]} intensity={1} castShadow={true} />
            <ambientLight intensity={1} />
            {/* <ambientLight intensity={0.7} /> */}
            <SpotLight castShadow={true} color={"#d4ecff"} position={[0, 7, 0]} penumbra={1} distance={7} angle={0.35} attenuation={hovered ? 10 : 3} anglePower={1} intensity={hovered ? 10 : 1} />

                <mesh 
                    castShadow 
                    receiveShadow 
                    position={[0, 0.5, 0]}  
                    rotation={[0, 0, 0]} >
                    <boxGeometry args={[1, 1]} />
                    <meshStandardMaterial color={hovered ? "#ff4100" : "#ffab7a" } map={hovered ? colorMapCube : colorMap} emissiveMap={hovered ? emissiveMapCube : emissiveZero} emissive={"#b1e5ff"} emissiveIntensity={hovered ? 3.2 : 0.0}/>
                </mesh> 

                <Grid position={[0, -0.01, 0]} args={[6.5, 6.5]} cellSize={0.9} cellThickness={1} cellColor={"#1455d9"} sectionSize={0} fadeDistance={10} />
   
    </>
    );
}
