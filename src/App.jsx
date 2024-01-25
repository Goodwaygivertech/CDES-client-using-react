import { useState ,useContext,} from 'react'
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routers";
import { userContext } from './components/context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const {user, setUser} = useContext(userContext)


  return (
    <>
    
          <RouterProvider router={router} /> 
          <ToastContainer />


    </>
  )
}

export default App
