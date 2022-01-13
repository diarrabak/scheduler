import { useState } from "react";
//Custom hook used to move between display modes
const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace=false) => {  //This function determines how to set a new mode
    setMode(newMode);
    setHistory([newMode, ...history]);
    console.log(history);
    if(replace){
        setHistory((prev)=>[...prev, ...history.slice(2, history.length)]);
    }
  };
  //console.log(history);
  const back = () => {  //This function shows how to go back in mode list
    let tempHistory = history.slice(1, history.length);

    if (tempHistory.length >= 1) {
      setHistory((prev)=>[...prev,...tempHistory]);
      setMode(tempHistory[0]);
    }
  };

  return {
    mode,
    transition,
    back,
  };
};

export default useVisualMode;
