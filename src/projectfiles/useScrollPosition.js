import { useEffect, useState } from "react";

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
  
    useEffect(() => {
      const updatePosition = () => {
        setScrollPosition(window.pageYOffset );
      }
      window.addEventListener("scroll", updatePosition);
      updatePosition();
      return () => window.removeEventListener("scroll", updatePosition);
    }, []);
  
    //return scrollPosition;
    //as percent of document height
    return scrollPosition / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  };
  
  export default useScrollPosition;