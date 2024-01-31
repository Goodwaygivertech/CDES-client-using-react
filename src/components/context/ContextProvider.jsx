import React, { createContext, useState } from "react";

export const userContext = createContext();
export const requestStateContext = createContext();
export const fetchDocContext = createContext();
// export const latestPost = createContext();


const ContextProvider = ({ children }) => {
  const storedUserData = localStorage.getItem("userData");
  const initialUserState = storedUserData ? JSON.parse(storedUserData) : { created: false, data: { fname: "", lname: "", email: "" } };
  
  const [user, setUser] = useState(initialUserState);
  const [isRequestDone, setIsRequestDone] = useState(false);
  const [fetchDoc, setFetchDoc] = useState(0);




  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        <requestStateContext.Provider value={{ isRequestDone, setIsRequestDone }} >
        <fetchDocContext.Provider value={{ fetchDoc, setFetchDoc}} >
                  {children}
         </fetchDocContext.Provider>      
         </requestStateContext.Provider>      
      </userContext.Provider>
    </>
  );
};

export default ContextProvider;