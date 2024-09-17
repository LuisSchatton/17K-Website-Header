import React, { Children, Suspense, useEffect } from "react";
import "./style.scss"
import { useControls } from "leva";

import LogoFragmenteCanvas from "./canvas-components/animation-fragmente/fragmente-canvas";
import PhysicsBoxCanvas from "./canvas-components/physics-box/physics-box-canvas";
import LogoFlatCanvas from "./canvas-components/logo-flat/logo-flat-canvas";
import LogoLinienCanvas from "./canvas-components/animation-linien/linien-canvas";

import useStore from "./canvas-components/store";

function ChooseAnimation({ animation }) {


  const hintergrund = useControls("Hintergrundfarbe", { backgroundColor: "#05377f" });

  if (animation === "Linien") {

    return (
      <div className="canvas-container">
        <LogoLinienCanvas />
      </div>
    );

  } else if (animation === "Fragmente") {

    return (
      <div className="canvas-container">
        <LogoFragmenteCanvas />
      </div>
    );

  } else if (animation === "Rapiertest") {

    return (
      <div className="canvas-container-physicsbox" style={hintergrund} >
        <PhysicsBoxCanvas />
      </div>
    );

  } else if (animation === "AnimationFlat") {

    return (
      <LogoFlatCanvas />
    );

  }
}


function Header() {

  const { anim } = useControls({ anim: { options: { Linien: "Linien", Fragmente: "Fragmente", Rapiertest: "Rapiertest", AnimationFlat: "AnimationFlat" } } });

  return (
    <div className="App">
      <div>
        <Suspense fallback={null}>
          <ChooseAnimation animation={anim} />
        </Suspense>
      </div>
      <h1>{anim}</h1>
    </div>
  );
}

export default Header;
