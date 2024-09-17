import React, { useRef } from "react";
import { PerspectiveCamera, SpotLight, Text, MeshPortalMaterial, Environment, Wireframe, MeshWobbleMaterial, Float, QuadraticBezierLine } from "@react-three/drei";
import { useLoader, useFrame, useThree, extend } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";
import { DoubleSide, Vector3} from "three";
import * as THREE from 'three';
import { geometry } from 'maath';
import { suspend } from 'suspend-react';

import useStore from "../store";

// Die Schriftart habe ich hier local importiert. Für die Website muss man auf die FontDatei verweisen

const industrie = import('./FSIndustrieRegular.otf')

// Utility

extend(geometry)

function Material() {

    const { creativeCoding,
            technologie } = useStore();

    if (creativeCoding === true) {
        return (
            <MeshWobbleMaterial attach="material" color={technologie ? '#19d983' : '#ffffff'} wireframe={technologie ? true : false} emissive={technologie ? 'green' : false} emissiveIntensity={technologie ? 1 : null} speed={1} factor={2} />
        )
    } else {
        return (
            <meshStandardMaterial color={technologie ? '#19d983' : '#ffffff'} wireframe={technologie ? true : false} emissive={technologie ? 'green' : false} emissiveIntensity={technologie ? 1 : null} />
        )
    }
}

function Cube() {

    const { interaktionsGestaltung, technologie } = useStore();

    
    const cube = useRef()
 
    useFrame((state, delta) => {

        if (interaktionsGestaltung === false) {
            cube.current.rotation.y += delta / 2;
            cube.current.rotation.z += delta / 2;
        }
    })

    if (interaktionsGestaltung === true) {

        return null

    } else { 

    return (
        <>
            <mesh   castShadow
                    receiveShadow
                    position={[0, 0, -1]} 
                    rotation={[0, Math.PI / 4.5, 0]}
                    ref={cube}>
                            <boxGeometry args={[1, 1, 1]} />
                            <Material />
            </mesh> 
        </>
     )

    }
}

function CubeFront() {
    
        const { interaktionsGestaltung } = useStore();
    
        const cube = useRef()
    
        useFrame((state, delta) => {
    
            if (interaktionsGestaltung === true) {
                cube.current.rotation.y += delta / 2;
                cube.current.rotation.z += delta / 2;
            }
        })
    
        if (interaktionsGestaltung === true) {
    
            return (
                <>
                    <mesh   castShadow
                            receiveShadow
                            position={[0, 0, 1]} 
                            rotation={[0, Math.PI / 4.5, 0]}
                            ref={cube}>
                                    <boxGeometry args={[1, 1, 1]} />
                                    <Material />
                    </mesh> 
                </>
            )
        

        } else { 

            return null
    
        }
}

function Licht({ vec = new Vector3()}, ...props) {

    const { konzept,
            interaktionsGestaltung } = useStore();

        const light = useRef();

            useFrame((state) => {
                if (konzept && interaktionsGestaltung === true) {
                    return null
                } else if (konzept === true) {
                light.current.target.position.lerp(vec.set(0, 0, -1), 0.1)
                light.current.target.updateMatrixWorld()
                }
              })
        

    if (konzept && interaktionsGestaltung === true) {
        return null
    } else if (konzept === true) {
        return (
            <> 
                <SpotLight castShadow ref={light} position={[0, 1, 4]} color="#b00c3f" penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={100} {...props} />
            </>
        )
    } else {
        return null
    }
}

function LichtFront({ vec = new Vector3(), ...props }) {

    const { konzept,
            interaktionsGestaltung } = useStore();
    
    const light = useRef();

    useFrame((state) => {
        if (konzept && interaktionsGestaltung === true) {
        light.current.target.position.lerp(vec.set(0, 0, -1), 0.1)
        light.current.target.updateMatrixWorld()
        }
      })

    if (konzept && interaktionsGestaltung === true) {
        return (
            <>
            <>
                <SpotLight castShadow ref={light} position={[0, 0, -0.1]} color="#b00c3f" penumbra={1} distance={6} angle={1} attenuation={5} anglePower={1} intensity={10} />
            </>
            <ambientLight color="#b00c3f" intensity={1.8} />
            </>
        )
    } else {
        return null
    }
}

function InformationsgestaltungBoden() {

    const textRef = useRef()

    if (useStore.getState().informationDesign === true) {
        return (
            <Text ref={textRef} font={suspend(industrie).default} maxWidth={3} fontSize={0.8} anchorY="top" anchorX="center" color={"#ffffff"} rotation={[3 * Math.PI / 2, 0, 0]} position={[0, -1.5, -8]} material-toneMapped={false}>
                Informationsgestaltung
                Informationsgestaltung
                Informationsgestaltung
                Informationsgestaltung
                Informationsgestaltung
                Informationsgestaltung
                Informationsgestaltung
                Informationsgestaltung
                Informationsgestaltung
                Informationsgestaltung
            </Text>
        )
    } else {
        return (
            <Text ref={textRef}>
            </Text>
        )
    }
}

function Cable({toggleFunktion, positionX, positionY, ...props}) { 

    const { technologie,
        creativeCoding,
        informationDesign,
        interaktionsGestaltung } = useStore();

    if (toggleFunktion === true) {
        return ( 
            <QuadraticBezierLine color={'black'} transparent={false} lineWidth={2} start={[0, 0, 0]} mid={[ 2, 0, -2]} end={[-positionX,-positionY,-2]} />
        )
    } else {      
        return null
    }
}

// Nodes

function NodeInteraktionsGestaltung({ positionX, positionY, breite, colorOn, colorOff, ...props}) {

    const { interaktionsGestaltung,
        toggleInteraktionsGestaltung,
        interaktionsGestaltungHover } = useStore();

        const { positionZ } = useSpring({
            positionZ: interaktionsGestaltungHover ? 0.4 : 0.2,
            config: config.wobbly
        })
    
    return (
        <group {...props} 
                onClick={(event) => toggleInteraktionsGestaltung(!interaktionsGestaltung.state)}>
                    
            <Float scale={1} position-x={positionX} position-y={positionY} floatIntensity={2} rotationIntensity={0} >

            <Cable toggleFunktion={interaktionsGestaltung} positionX={positionX} positionY={positionY} />
        
            <animated.mesh position-z={ positionZ } >
            
            <Text 
                onClick={(event) => toggleInteraktionsGestaltung(!interaktionsGestaltung.state)}
                font={suspend(industrie).default} fontSize={0.3} anchorY="top" anchorX="center" lineHeight={0.8} position={[0, 0.1, 0.01]} material-toneMapped={false}>
                Interaktionsgestaltung
            </Text>
    
                <roundedPlaneGeometry args={breite} />
    
                <meshBasicMaterial color={interaktionsGestaltung ? colorOn : colorOff} />
            </animated.mesh>

            </Float>
    
        </group>
    )
}

function NodeInformationsGestaltung({ positionX, positionY, breite, colorOn, colorOff, ...props}) {
        
    const { informationDesign,
        toggleInformationDesign,
        informationDesignHover } = useStore();

        const { positionZ } = useSpring({
            positionZ: informationDesignHover ? 0.4 : 0.2,
            config: config.wobbly
        })

    return (
        <group {...props}
                onClick={(event) => toggleInformationDesign(!informationDesign.state)}>

            <Float scale={1} position-x={positionX} position-y={positionY} floatIntensity={2} rotationIntensity={0} >

            <Cable toggleFunktion={informationDesign} positionX={positionX} positionY={positionY} />  
                
            <animated.mesh position-z={ positionZ } >

                <Text
                    onClick={(event) => toggleInformationDesign(!informationDesign.state)}
                    font={suspend(industrie).default} fontSize={0.3} anchorY="top" anchorX="center" lineHeight={0.8} position={[ 0, 0.1, 0.01]} material-toneMapped={false}>
                    Informationsgestaltung
                </Text>

                <roundedPlaneGeometry args={breite} />

                <meshBasicMaterial color={informationDesign ? colorOn : colorOff} />
            </animated.mesh>

            </Float>

        </group>
    )
}

function NodeCreativeCoding({ positionX, positionY, breite, colorOn, colorOff, ...props}) {

    const { creativeCoding,
        toggleCreativeCoding,
        creativeCodingHover } = useStore();

        const { positionZ } = useSpring({
            positionZ: creativeCodingHover ? 0.4 : 0.2,
            config: config.wobbly
        })


    return (
        <group {...props}
                onClick={(event) => toggleCreativeCoding(!creativeCoding.state)}>

            <Float scale={1} position-x={positionX} position-y={positionY} floatIntensity={2} rotationIntensity={0} > 

            <Cable toggleFunktion={creativeCoding} positionX={positionX} positionY={positionY} />  
                
            <animated.mesh position-z={ positionZ } >

                <Text
                    onClick={(event) => toggleCreativeCoding(!creativeCoding.state)}
                    font={suspend(industrie).default} fontSize={0.3} anchorY="top" anchorX="center" lineHeight={0.8} position={[ 0, 0.1, 0.01]} material-toneMapped={false}>
                    Creative Coding
                </Text>

                <roundedPlaneGeometry args={breite} />

                <meshBasicMaterial color={creativeCoding ? colorOn : colorOff} />
            </animated.mesh>

            </Float>

        </group>
    )
}

function NodeTechnologie({ positionX, positionY, breite, colorOn, colorOff, ...props}) {

    const { technologie,
        toggleTechnologie,
        technologieHover } = useStore();

        const { positionZ } = useSpring({
            positionZ: technologieHover ? 0.4 : 0.2,
            config: config.wobbly
        })

    return (
        <group {...props}
                onClick={(event) => toggleTechnologie(!technologie.state)}>

            <Float scale={1} position-x={positionX} position-y={positionY} floatIntensity={2} rotationIntensity={0} >

            <Cable toggleFunktion={technologie} positionX={positionX} positionY={positionY}  />

            <animated.mesh position-z={positionZ} >

                <Text
                    onClick={(event) => toggleTechnologie(!technologie.state)}
                    font={suspend(industrie).default} fontSize={0.3} anchorY="top" anchorX="center" lineHeight={0.8} position={[ 0, 0.1, 0.01]} material-toneMapped={false}>
                    Technologie
                </Text>

                <roundedPlaneGeometry args={breite} />

                <meshBasicMaterial color={technologie ? colorOn : colorOff} />

                
            </animated.mesh>

            </Float>

        </group>
    )
}
function NodeKonzept({ positionX, positionY, breite, colorOn, colorOff, ...props}) {

    const { konzept,
        toggleKonzept,
        konzeptHover } = useStore();

        const { positionZ } = useSpring({
            positionZ: konzeptHover ? 0.4 : 0.2,
            config: config.wobbly
        })

    return (
        <group {...props}
                onClick={(event) => toggleKonzept(!konzept.state)}>

            <Float scale={1} position-x={positionX} position-y={positionY} floatIntensity={1} rotationIntensity={0} >

            <Cable toggleFunktion={konzept} positionX={positionX} positionY={positionY} />

            <animated.mesh position-z={positionZ} positionX={positionX} positionY={positionY} >

                <Text
                    onClick={(event) => toggleKonzept(!konzept.state)}
                    font={suspend(industrie).default} fontSize={0.3} anchorY="top" anchorX="center" lineHeight={0.8} position={[ 0, 0.1, 0.01]} material-toneMapped={false}>
                    Konzept
                </Text>

                <roundedPlaneGeometry args={breite} />

                <meshBasicMaterial color={konzept ? colorOn : colorOff} />

                
            </animated.mesh>

            </Float>

        </group>
    )
}


export default function InteraktiveNodes() {

    const NodeInteraktionsGestaltungRef = useRef();
    const CanvasRef = useRef();


    const { toggleInteraktionsGestaltungHover,
            toggleCreativeCodingHover,
            toggleInformationDesignHover,
            toggleTechnologieHover,
            toggleKonzeptHover } = useStore();

    return (
        <>
            <ambientLight intensity={0.2} />

            <mesh ref={CanvasRef} >
                <roundedPlaneGeometry args={[3, 3, 0.1]} />
                
                <MeshPortalMaterial side={DoubleSide}>

                    <Environment preset="city" />
                    <spotLight castShadow intensity={1} position={[4, 3, 4]} penumbra={1} angle={0.25} shadow-normalBias={0.05} shadow-bias={0.0001} />
                    <color attach="background" args={['#1e1e1e']} />
                    
                    <Cube />

                    <Licht />

                    <InformationsgestaltungBoden />

                </MeshPortalMaterial>

            </mesh>

            <CubeFront />
            <LichtFront />
            <Environment preset="city" />
            <spotLight castShadow intensity={0.1} position={[4, 3, 4]} penumbra={1} angle={0.25} shadow-normalBias={0.05} shadow-bias={0.0001} />

            {/* Einzelne Nodes: breite regelt die Maße der Nodes, positionX und positionY die Position der Nodes, colorOn und colorOff die Farbe der Nodes */}

            <NodeInteraktionsGestaltung 
                    ref={NodeInteraktionsGestaltungRef}
                    onPointerOver={(event) => toggleInteraktionsGestaltungHover(true)}
                    onPointerOut={(event) => toggleInteraktionsGestaltungHover(false)}
                    breite={[3.7, 1, 0.1]} positionX={4} positionY={-1.5} colorOn="#1455D9" colorOff={'#91c7e2'} />

            <NodeInformationsGestaltung
                    onPointerOver={(event) => toggleInformationDesignHover(true)}
                    onPointerOut={(event) => toggleInformationDesignHover(false)}
                    breite={[3.7, 1, 0.1]} breiteY={1} positionX={-4} positionY={1.5} colorOn="#FF6200" colorOff={'#ff8637'} />

            <NodeCreativeCoding
                    onPointerOver={(event) => toggleCreativeCodingHover(true)} 
                    onPointerOut={(event) => toggleCreativeCodingHover(false)}
                    breite={[2.8, 1, 0.1]} positionX={4} positionY={1.5} colorOn="#00C1C4" colorOff={'#69d7e8'} />

            <NodeTechnologie
                    onPointerOver={(event) => toggleTechnologieHover(true)}
                    onPointerOut={(event) => toggleTechnologieHover(false)}
                    breite={[2.4, 1, 0.1]} positionX={-3.5} positionY={-1.5} colorOn="#02AA5F" colorOff={'#19d983'} />
            
            <NodeKonzept
                    onPointerOver={(event) => toggleKonzeptHover(true)}
                    onPointerOut={(event) => toggleKonzeptHover(false)}
                    breite={[2, 1, 0.1]} positionX={0} positionY={-2.5} colorOn="#FF8094" colorOff={'#FCB9C4'} />
        </>
    );
}
