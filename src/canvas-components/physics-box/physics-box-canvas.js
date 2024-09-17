import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF, ContactShadows, Environment } from "@react-three/drei";
import { DepthOfField, EffectComposer, SSAO, Noise, Bloom } from "@react-three/postprocessing";
import { Physics, RigidBody, CuboidCollider, Debug, Attractor } from "@react-three/rapier";
import { folder, useControls } from "leva";

// Initialisierung Materialien

THREE.ColorManagement.enabled = true;

/* const teileMaterial1 = new THREE.MeshLambertMaterial({ color: "#1bd9d9"})
const teileMaterial2 = new THREE.MeshLambertMaterial({ color: "#1455d9"})
const teileMaterial3 = new THREE.MeshLambertMaterial({ color: "#19d983"}) */
const logoMaterial = new THREE.MeshLambertMaterial({ color: "#05377f" })

function LogoMaterial1() {
  const { color, emissive, emissiveIntensity } = useControls({ 
    Material1: folder({
      color: "#05377f",
      emissive: "#05377f",

    Leuchtkraft: folder({   
      emissiveIntensity: {
        min: 0,
        max: 50,
        value: 0,
      },
    }),
    }),
  })
  

  console.log(emissiveIntensity)

  return (
      <meshLambertMaterial color={color} emissive={emissive} emissiveIntensity={emissiveIntensity} />
  );
}

function LogoMaterial2() {
  const { color, emissive, emissiveIntensity } = useControls({ 
    Material2: folder({
      color: "#05377f",
      emissive: "#05377f",

    Leuchtkraft: folder({   
      emissiveIntensity: {
        min: 0,
        max: 50,
        value: 0,
      },
    }),
    }),
  })

  return (
      <meshLambertMaterial color={color} emissive={emissive} emissiveIntensity={emissiveIntensity} />
  );
}

function LogoMaterial3() {
  const { color, emissive, emissiveIntensity } = useControls({ 
    Material3: folder({
      color: "#05377f",
      emissive: "#05377f",

    Leuchtkraft: folder({   
      emissiveIntensity: {
        min: 0,
        max: 50,
        value: 0,
      },
    }),
    }),
  })

  return (
      <meshLambertMaterial color={color} emissive={emissive} emissiveIntensity={emissiveIntensity} />
  );
}





const teile = [...Array(30)].map(() => ({   scale: [1.75, 1.75, 2, 2, 2.25][Math.floor(Math.random() * 5)], 
                                            /* material: [teileMaterial1, teileMaterial2, teileMaterial3][Math.floor(Math.random() * 3)] */ }));


// Initialisierung der Teile

function LogoTeile({vec = new THREE.Vector3(), scale, material, r = THREE.MathUtils.randFloatSpread }) {
    const { nodes } = useGLTF("/17KLogo2.glb");
    const api = useRef();
    const api1 = useRef();
    const api2 = useRef();

    const handleClick = useCallback(() => {
        api.current.applyImpulse({ x: Math.random() * 100, y: Math.random() * 10000, z: Math.random() * 100 }, true);
        api1.current.applyImpulse({ x: Math.random() * 100, y: Math.random() * 10000, z: Math.random() * 100 }, true);
        api2.current.applyImpulse({ x: Math.random() * 100, y: Math.random() * 10000, z: Math.random() * 100 }, true);
    }, []);

    useEffect(() => {
      window.addEventListener('click', handleClick);
      return () => {
      window.removeEventListener('click', handleClick);
      };
    }, [handleClick]);

    return (
        <>
            <RigidBody type="dynamic" position={[r(10), r(10), r(5)]} rotation={[0, 0, 0]} restitution={1} ref={api} colliders={false} mass={scale * 100} >
                <CuboidCollider args={[scale * 0.2, scale * 0.08, scale * 0.08]} position={[scale * -0.1, scale * 0.95, 0]} />
                <CuboidCollider args={[scale * 0.08, scale / 2, scale * 0.08]} position={[0, scale / 2, 0]} />
                
                <mesh castShadow receiveShadow scale={scale} position={[0, 0, 0]} geometry={nodes["mesh_1"].geometry} >
                    <LogoMaterial1 />
                </mesh>
            </RigidBody>

            <RigidBody type="dynamic" position={[r(10), r(10), r(7)]} rotation={[0, 0, 0]} restitution={1} ref={api1} colliders={false} mass={scale * 100} >
                <CuboidCollider args={[scale * 0.3, scale * 0.08, scale * 0.08]} position={[scale * -0.3, scale * 0.95, 0]} />
                <CuboidCollider args={[scale * 0.08, scale / 2, scale * 0.08]} position={[0, scale / 2, 0]} />
                <mesh castShadow receiveShadow scale={scale} position={[0, 0, 0]} geometry={nodes["mesh_7"].geometry} >
                    <LogoMaterial2 />
                </mesh>
            </RigidBody> 

            <RigidBody type="dynamic" position={[r(15), r(15), r(7)]} rotation={[0, 0, 0]} restitution={1} ref={api2} colliders={false} mass={scale * 100} >
                <CuboidCollider args={[(((4/3) * scale) - 0.3) / 2.75, scale * 0.08, scale * 0.08]} position={[0, scale * 0.2 , 0]} rotation={[0, 0,  (4.5 * Math.PI) / 6 ]}/>
                <CuboidCollider args={[(((4/3) * scale) - 0.3) / 2.75, scale * 0.08, scale * 0.08]} position={[0, scale * 0.85 , 0]} rotation={[0, 0,  (1.65 * Math.PI) / 6 ]}/>
                <mesh castShadow receiveShadow scale={scale} position={[0, 0, 0]} geometry={nodes["mesh_K"].geometry} >
                    <LogoMaterial3 />
                </mesh>
            </RigidBody>
        </>
    );
}


function LogoFixed() {

const { nodes } = useGLTF("/17KLogo.glb");

const {color} = useControls("Material", { color: "#ffff22" });

  return (
  
    <group scale={2}>

    <RigidBody type="fixed" position={[0, 0, 0]} rotation={[0, 0, 0]} colliders={false}>
            <CuboidCollider args={[0.25, 0.125, 0.125]} position={[-1.68, 1.96, 0]} />
            <CuboidCollider args={[0.125, 1.08, 0.1]} position={[-1.44, 1, 0]} />
            <mesh castShadow receiveShadow geometry={nodes["mesh_1"].geometry} material={logoMaterial} material-color={ color } />
    </RigidBody>

    <RigidBody type="fixed" position={[0, 0, 0]} rotation={[0, 0, 0]} colliders={false}>
            <CuboidCollider args={[0.59, 0.125, 0.125]} position={[-0.46, 1.96, 0]} />
            <CuboidCollider args={[0.125, 1.08, 0.1]} position={[0.02, 1, 0]} />
            <mesh castShadow receiveShadow geometry={nodes["mesh_7"].geometry} material={logoMaterial}/>
    </RigidBody>

    <RigidBody type="fixed" position={[0, 0, 0]} rotation={[0, 0, 0]} colliders={false}>
              <CuboidCollider args={[0.85, 0.125, 0.125]} position={[1.05, 1.56, 0]} rotation={[0, 0,  (1.47 * Math.PI) / 6 ]}/>
              <CuboidCollider args={[0.88, 0.125, 0.125]} position={[1.05, 0.52, 0]} rotation={[0, 0,  (4.54 * Math.PI) / 6 ]}/>
              <mesh castShadow receiveShadow geometry={nodes["mesh_K"].geometry} material={logoMaterial}/>
    </RigidBody>
    
    </group>
  
  );
  
}


// Worldspace


function Box() {

    return (
    <>
        <CuboidCollider position={[0, 8, 10]} args={[20, 20, 2]} />         // Wand vorne
        <CuboidCollider position={[20.3, 8, 0]} args={[2, 20, 20]} />         // Wand rechts
        <CuboidCollider position={[-20.3, 8, 0]} args={[2, 20, 20]} />        // Wand links
        <CuboidCollider position={[0, 8, -10]} args={[20, 20, 2]} />        // Wand hinten
        <CuboidCollider position={[0, 28, 0]} args={[20, 10, 20]} />            // Decke
        <CuboidCollider position={[0, -10, 0]} args={[100, 10, 100]} />           // Boden

        <ContactShadows
          scale={20}
          blur={0.4}
          opacity={0.4}
          position={[0, 0, 0]}
        />

    </>
    );
}


// Interaktion


function Pointer({ vec = new THREE.Vector3() }) {
    const ref = useRef()

    useFrame(({ mouse, viewport }) => {
      vec.lerp({ x: Math.max( -15, Math.min(((mouse.x * viewport.width) / 2), 15)), y: (Math.max( -3, Math.min(((mouse.y * viewport.height) / 2), 15))) + 0.5, z: 0 }, 0.1)
      ref.current.setNextKinematicTranslation(vec)
    })

    return (
      <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref} mass={0} >
        <CuboidCollider args={[0.3, 1, 20]} />
      </RigidBody>
    )
}



export default function PhysicsBoxCanvas() {

  const { light } = useControls("Light", { 
    Lichter: folder ({
      light: {
        min: 0,
        max: 3,
        value: 1,
      },
    }) ,  
  });


  return (
        <Canvas
            shadows
            dpr={[2, 3]}
            gl={{ alpha: true, stencil: true, depth: false, antialias: true }}
            onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}>

            <fog attach="fog" args={["white", 2, 100]} />
            
            <ambientLight intensity={ light } />
            <spotLight position={[20, 20, 25]} penumbra={0.2} angle={0.2} color="white" castShadow shadow-mapSize={[512, 512]} />
            <directionalLight position={[0, 5, -4]} intensity={ light } />
            <directionalLight position={[0, -15, -0]} intensity={ light } color="white" />

            {/* <OrbitControls /> */}
            <PerspectiveCamera makeDefault fov={50} position={ [0, 2, 13] } />
            
            <Physics>
                <Attractor strength={10} range={200} position={[0, 0.5, 0]} type={"static"}/>

                {teile.map((props, index) => <LogoTeile key={index} {...props} />)}
                <Pointer />
                <LogoFixed />
                <Box />
                
                {/* <Debug /> */}
            </Physics>

            {/* <Environment preset="park" /> */}

            <EffectComposer multisampling={1}>
                <Noise opacity={0.01} />  
            </EffectComposer>


        </Canvas>
  );
}

