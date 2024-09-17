import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, PresentationControls } from "@react-three/drei";
import useHoverStore from "./components/store";
import useStoreScroll from "./components/storeScroll";

import "./style.css";
import InteraktiveNodes from "./components/interaktive_nodes/interaktive_nodes.jsx";
import { AnimationEins } from "./components/interaktive_flagge/interaktive_flagge.jsx";
import InteraktiveErlebnisse from "./components/interaktive_erlebnisse/interaktive_erlebnisse.jsx";

function App() {
  
    const ref = useRef()
    const view = useRef()
    const view2 = useRef()
    const view3 = useRef()
    const cameraIN = useRef()
    const cameraIF = useRef()
    const cameraIE = useRef()

    const [percentage, setPercentage] = useState(0);
    const {
      scrollPosition,
      getScrollPosition,
      setScrollPosition
    } = useStoreScroll();

    const hover = useHoverStore(state => state.toggleHover);
    const toggleHover = () => {
      hover();
    }

    useEffect(() => {
      const options = {
          root: null,
          rootMargin: '0px',
          threshold: 0.0, // Change this threshold if needed
      };

      const observer = new IntersectionObserver(entries => {
          const entry = entries[0];
          if (entry.isIntersecting) {
              const visiblePercentage = Math.round(entry.intersectionRatio * 100);
              setPercentage(visiblePercentage);
              setScrollPosition(visiblePercentage);
          }
      }, options);

      if (view2.current) {
          observer.observe(view2.current);
      }

      return () => {
          if (view2.current) {
              observer.unobserve(view2.current);
          }
      };
  }, []);

  

  

  return (

    <div>

      <div ref={ref} className="grid-container">
      
        <h1>Html content here</h1>
       
        <p className="p">Lorem 
          ipsum dolor sit amet, consectetur adipiscing elit.
          Nulla vitae elit libero, a pharetra augue.
          Nullam id dolor id nibh ultricies vehicula ut id elit.
        </p>

        <div
          className="interaktive-erlebnisse">

          <Canvas>

          <PresentationControls 
              drag
              makeDefault
              global={true}
              cursor={true}
              polar={[0, 0, 0]}
              azimuth={[ -(Math.PI / 4.2), Math.PI / 4.2]}
              snap={true} >

            <InteraktiveNodes />

            </PresentationControls>

          </Canvas>
        </div>

        <p className="p">Lorem 
          ipsum dolor sit amet, consectetur adipiscing elit.
          Nulla vitae elit libero, a pharetra augue.
          Nullam id dolor id nibh ultricies vehicula ut id elit.
        </p>

        <div 
           ref={view2}
          className="interaktive-erlebnisse">
          <Canvas>

            <PerspectiveCamera ref={cameraIF} makeDefault position={[0,0,10]} />
            <AnimationEins />

          </Canvas>
        </div>

        <p className="p">Lorem 
          ipsum dolor sit amet, consectetur adipiscing elit.
          Nulla vitae elit libero, a pharetra augue.
          Nullam id dolor id nibh ultricies vehicula ut id elit.
       
        </p>

        <div
          className="interaktive-erlebnisse"
          onPointerEnter={toggleHover}
          onPointerLeave={toggleHover}>

        <Canvas>

        <PerspectiveCamera ref={cameraIE} makeDefault position={[5, 2, 5]} rotation={[0, 0.8, 0]} />

          <PresentationControls 
              makeDefault
              global={true}
              camera={cameraIE}
              cursor={true}
              polar={[0, 0, 0]}
              snap={true} >

            <InteraktiveErlebnisse />

            </PresentationControls>

        </Canvas>

        </div>
              
        </div> 

    </div>
  
  );
}

export default App;
