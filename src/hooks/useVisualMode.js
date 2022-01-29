import { useState } from "react";
//Custom hook used to move between display modes
const useVisualMode = (initialMode) => {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace=false) => {  //This function determines how to set a new mode
    setMode(newMode);
    setHistory(prev=>[...prev, newMode]);

    if(replace && history.length>=2){  //We need at least 2 modes + the current one to do that
      let currentHistory=[...history];
      let lastElement=currentHistory.slice(-1)[0]; //Last element of the history array
      currentHistory.pop();
      let secondLastElement=currentHistory.slice(-1)[0]; //Lats element of the history array
      currentHistory.pop();
      currentHistory=[...currentHistory,newMode,secondLastElement,lastElement];
      
        setHistory(currentHistory);
    }
  };
  const back = () => {  //This function shows how to go back in mode list
    let tempHistory = [...history];
    tempHistory.pop();

    if (tempHistory.length >= 1) {
      setHistory(tempHistory);
      setMode(tempHistory[tempHistory.length-1]);
    }
  };

  return {
    mode,
    transition,
    back,
  };
};

export default useVisualMode;
