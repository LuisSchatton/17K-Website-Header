import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";


export function AnimationFlat(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/AnimationFlat.glb");
  const { actions } = useAnimations(animations, group);

  const [color, setColor] = useState(props.clr);

  useEffect(() => {
    setColor(props.clr);
  }, [props.clr]);

  console.log(props.clr)

  useEffect(() => { 
    if(props.play === true) {

      let allActions = { ...actions };

      console.log("true", props.play)

      Object.keys(allActions).forEach((key) => {
        allActions[key].play();
      });
    } else if(props.play === false){
      let allActions = { ...actions };

      Object.keys(allActions).forEach((key) => {
        allActions[key].stop();
      });
    }
  }, [props.play]);

  useEffect(() => {
    if (group.current) {
      group.current.traverse((node) => {
        if (node.material) {
            if (color === 0) {
              node.material.color.set("#1BD9D9");
              node.material.emissive.set("#1BD9D9");

            } else if (color === 1) {
                node.material.color.set("#1455D9");
                node.material.emissive.set("#1455D9");
            } else if (color === 2) {
                node.material.color.set("#FF6C00");
                node.material.emissive.set("#FF6C00");
            } else if (color === 3) {
                node.material.color.set("#EB1580");
                node.material.emissive.set("#EB1580");
            } 
        }
      });
    }
  }, [color]);

  return (
    <group ref={group} {...props} dispose={null}>
    <group name="Scene">
      <mesh
        name="Eins"
        castShadow
        receiveShadow
        geometry={nodes.Eins.geometry}
        material={nodes.Eins.material}
        position={[-1.51, 1.25, -0.01]}
      />
      <mesh
        name="Zwei"
        castShadow
        receiveShadow
        geometry={nodes.Zwei.geometry}
        material={nodes.Zwei.material}
        position={[-0.42, 1.3, 0]}
      />
      <mesh
        name="K"
        castShadow
        receiveShadow
        geometry={nodes.K.geometry}
        material={nodes.K.material}
        position={[1.08, 1.04, -0.01]}
      />
    </group>
  </group>
  );
}

useGLTF.preload("/AnimationFlat.glb");
