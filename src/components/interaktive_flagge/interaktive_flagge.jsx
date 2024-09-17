import React, { useRef, useState, useMemo, useEffect } from "react";
import { animated, useSpring, a, config } from "@react-spring/three";
import { PresentationControls, Grid } from "@react-three/drei";
import { RepeatWrapping, TextureLoader } from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { Flag } from "./flag";

import useStoreScroll from "../storeScroll";

const closeBy = {
  position: [0.5, 10, 0],
  target: [0, 0, 0]
};

const farAway = {
  position: [5, 5, 5],
  target: [0, 0, 0]
};

const CameraWrapper = ({ cameraPosition, target }) => {
  const { camera } = useThree();
 
  camera.position.set(...cameraPosition);
  camera.lookAt(...target);

  return null;
};


function AnimateCameraPosition({ position, target }) {
  const { camera } = useThree();

  const s = useSpring({
    from: farAway,
    delay: 500,
    
    config: {
      mass: 1,
      tension: 180,
      friction: 40
    }
  });

  s.position.start({ from: camera.position.toArray(), to: position });
 
  const AnimatedCamera = useMemo(() => a(CameraWrapper), []);

  return (
    <>
      <AnimatedCamera cameraPosition={s.position} target={s.target} />
    </>
  );
}

function Animation() {

  const [cameraSettings, setCameraSettings] = useState(farAway);
  const [ hovered, hover ] = useState(false);
  const [ hovered1, hover1 ] = useState(false);

  const {
    scrollPosition,
    setScrollposition,
  } = useStoreScroll();


  // Scrollposition triggert Kameraanimation

  useEffect(() => {
    if (scrollPosition > 10) {
        setCameraSettings(farAway);
      } else {
        setCameraSettings(closeBy);
      } 
  }, [scrollPosition])


  const { positionYOne, scaleOne } = useSpring({
    
    positionYOne: cameraSettings === farAway ? 1.4 : 0,
    
    scaleOne: cameraSettings === farAway ? 0.75 : 0.5,
    
    delay: 200,
    config:  config.wobbly,
  });

  const {  positionYTwo, scaleTwo } = useSpring({
    
    positionYTwo: cameraSettings === farAway ? 2 : 0,
    scaleTwo: cameraSettings === farAway ? 0.5 : 0.5,

    delay: 300,
    config:  config.wobbly,
  });

  const { positionFlag, visible } = useSpring({

    positionFlag: cameraSettings === farAway ? 2 : 0,
    visible: cameraSettings === farAway ? true : false,

    delay: 500,
    config:  config.wobbly,
  });



  return (
    <>
      <AnimateCameraPosition
        position={cameraSettings.position}
      />

      <animated.mesh 
        castShadow 
        receiveShadow 
        onPointerOver={(event) => hover(true)} 
        onPointerOut={(event) => hover(false)} 
        position-y={ positionYOne } 
        scale={ scaleOne } >

        <boxGeometry args={[1, 1, 1]} position={[0, 0, 0]} />
        <meshStandardMaterial color={hovered ? "#1455d9" : "#1bd9d9"} />
      </animated.mesh>

      <animated.mesh 
        castShadow 
        receiveShadow 
        onPointerOver={(event) => hover1(true)} 
        onPointerOut={(event) => hover1(false)}
        position-y={ positionYTwo } 
        scale={ scaleTwo } >
        
        <boxGeometry args={[1, 1, 1]} position={[0, 0, 0]} />
        <meshStandardMaterial color={hovered1 ? "#1455d9" : "#19d983" } />
        
      </animated.mesh>


      <animated.mesh
        position-y={positionFlag}
        rotation={[-Math.PI / 16, Math.PI / 3, 0]} 
        visible={visible} >

        <Flag position={[0, 0, 0]} />
        
      </animated.mesh>

    </>
  );
}

export function AnimationEins() {

  const [ hovered, hover ] = useState(false);

  const colorMap = useLoader(TextureLoader, "gridpink.png")

  useEffect(() => {
    colorMap.wrapS = RepeatWrapping;
    colorMap.wrapT = RepeatWrapping;
    colorMap.repeat.set(1, 1);
  }, [colorMap])

  
    return ( 

    <>

    <PresentationControls
      cursor={true}
      polar={[0, 0, 0]}
      snap={true} >

    <hemisphereLight intensity={0.1} />
    <directionalLight position={[0, 20, 0]} intensity={1} castShadow={true} />
    <ambientLight intensity={1} />

    {/* <Environment preset="city" /> */}

      <mesh 
        castShadow 
        receiveShadow
        onPointerOver={(event) => hover(true)} 
        onPointerOut={(event) => hover(false)}  
        position={[0, 0.5, 0]} >
            <boxGeometry args={ [1, 1, 1] } />
            <meshStandardMaterial color={hovered ? "#1455d9" : "#eb1580"} />         
      </mesh>

      <Grid position={[0, -0.01, 0]} args={[6.5, 6.5]} cellSize={0.9} cellThickness={1} cellColor={"#eb1580"} sectionSize={0} fadeDistance={10} />
      
      <Animation  />

    </PresentationControls>
      
    </>
    
    );
}

// Coords: x, y, z
  



