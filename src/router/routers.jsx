import { createBrowserRouter } from "react-router-dom";
import Nav from "../components/Nav";
import Document from "../components/Document";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import HomePage from "../Pages/HomePage";
import About from "../components/About";
import Contact from "../components/Contact";
import FormatPage from "../Pages/FormatPage";



export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <HomePage></HomePage>
        {/* <AddBlogPostForm></AddBlogPostForm> */}
      </>
    ),
  },
  {
    path: "/document/:allPara",
    element: (
      <>
        <Nav></Nav>
        <Document></Document>
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        {/* <Nav></Nav> */}
        <SignUp></SignUp>
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login></Login>
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
     <FormatPage>
        <About></About>
        </FormatPage>
      </>
    ),
  },
  {
    path: "/contact",
    element: (
      <>
     <FormatPage>
        <Contact></Contact>
        </FormatPage>
      </>
    ),
  },

]);
