import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export function Flag(props) {
  const { nodes, materials } = useGLTF("/flag.glb");

  const [hover, hovered] = useState(false);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        onPointerOver={(event) => hovered(true)}
        onPointerOut={(event) => hovered(false)}
        geometry={nodes.Cube.geometry} >

          <meshStandardMaterial color={hover ? "#ff5300" : "#1bd9d9"} />
        </mesh>
    </group>
  );
}

useGLTF.preload("/flag.glb");
