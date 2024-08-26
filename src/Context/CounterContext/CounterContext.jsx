import { createContext, useState } from "react";

export let counterContext = createContext(0);

export default function CounterContextProvider(props) {
  const [counter, setCounter] = useState(0);
  function changeCounter(){
    setCounter(Math.random())
  }

  return (
    <counterContext.Provider value={{ counter, changeCounter }}>
      {props.children}
    </counterContext.Provider>
  );
}