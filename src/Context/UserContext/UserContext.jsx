import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export default function UserContextProvider(props) {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
   
    
    if (localStorage.getItem("userToken")) {
     
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);
  

  return (
    <userContext.Provider value={{ userToken, setUserToken }}>
      {props.children}
    </userContext.Provider>
  );
}
