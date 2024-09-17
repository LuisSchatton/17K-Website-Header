import React, { useState, useRef, useEffect } from "react";
import { useGLTF, useAnimations, useScroll, ScrollControls } from "@react-three/drei";
import useStore from "../store";
import { useFrame } from "@react-three/fiber";

export function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/17LogoLinien.glb");

  const { actions } = useAnimations(animations, group);
  const [allActions, setAllActions] = useState(null);
 
  const {
    scrollPosition,
    setScrollposition,
  } = useStore();

  useEffect(() => {
    console.log(scrollPosition);
  }, [scrollPosition]);

  useEffect(() => {
    if (actions) {
      setAllActions({ ...actions });
    }
  }, [actions]);

  useEffect(() => {
    if (allActions === null || allActions === undefined) return;

    Object.keys(allActions).forEach((key) => {

      const actionKey = key;
      allActions[actionKey].play().paused = true;

    });

  }, [allActions]); // Include allActions in the dependency array

  useFrame((state, delta) => {

    if (allActions === null || allActions === undefined) return;

    Object.keys(allActions).forEach((key) => {
      allActions[key].time = allActions[key].getClip().duration * scrollPosition;
    })
  })


  return (
    <>
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <mesh
            name="17KEdge"
            castShadow
            receiveShadow
            geometry={nodes["17KEdge"].geometry}
            material={materials["Material.002"]}
          />
          <mesh
            name="17KEdge001"
            castShadow
            receiveShadow
            geometry={nodes["17KEdge001"].geometry}
            material={materials["Material.002"]}
          />
          <mesh
            name="17KEdge002"
            castShadow
            receiveShadow
            geometry={nodes["17KEdge002"].geometry}
            material={materials["Material.002"]}
          />
          <mesh
            name="17KEdge003"
            castShadow
            receiveShadow
            geometry={nodes["17KEdge003"].geometry}
            material={materials["Material.002"]}
          />
          <mesh
            name="17KEdge004"
            castShadow
            receiveShadow
            geometry={nodes["17KEdge004"].geometry}
            material={materials["Material.002"]}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/17LogoLinien.glb");
