import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // or your preferred routing library
import axios from "axios";
import { userContext, requestStateContext } from "./context/ContextProvider";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, setUser } = useContext(userContext);
  const { isRequestDone, setIsRequestDone } = useContext(requestStateContext);
  const [formData, setFormData] = useState({
    docName: "",
    docData: "non",
    userId: user.data._id,
    owner: user.data.email,
  });

  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle form submission and make the API call
  const handelNewDocSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the API call using Axios
      const response = await axios.post(
        "http://localhost:5000/api/addDoc",
        formData
      );
      // Set the response in the state
      const responseData = response.data;
      // setResponse(responseData);
      // setError(null);
      navigate(`/document/${formData.docName}-${responseData._id}`);
    } catch (error) {
      // Handle errors
      setResponse(null);
      setError(error.message || "An error occurred");
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {/* Modal toggle */}

      {/* Main modal */}
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sign in to our platform
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handelNewDocSubmit}>
                <div>
                  <label
                    htmlFor="docName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Document Name
                  </label>
                  <input
                    type="text"
                    name="docName"
                    id="docName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="My new document"
                    required=""
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  data-modal-hide="authentication-modal"
                >
                  Create a document
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b-2 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXQgUC93Ys3Fox4V5uUFUEai59O870QsUxlPTrRYcW-w&s"
              className="h-8 rounded-full"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              CGES
            </span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user && user.created ? (
              <>
                <button
                  data-modal-target="authentication-modal"
                  data-modal-toggle="authentication-modal"
                  type="button"
                  className="default-btn"
                  style={{ margin: "0px", marginRight: "10px" }}
                >
                  New Doc
                </button>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST_9OY8asGNGiiQPK8U-AcQLN2KrumXD1r7iTO87WFyA&s"
                    alt="user photo"
                  />
                </button>
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="default-btn"
                  style={{ margin: "0px", marginRight: "10px" }}
                >
                  Login{" "}
                </Link>
                <Link
                  to={"/signup"}
                  className="default-btn"
                  style={{ margin: "0px", marginRight: "10px" }}
                >
                  SignUP{" "}
                </Link>
              </>
            )}

            <div
              className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user.data.fname} {user.data.lname}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {user.data.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem("userData");
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          {isRequestDone && (
            <div className="fixed top-[0.7rem] h-[2.2rem] w-[2.2rem] rounded-full bg-black right-5 z-[49] ">
              <span
                className="loading loading-spinner loading-[2rem] z-50 fixed top-[0.7rem] right-6 mt-[4px] text-white dark:dark:text-red-800 md:dark:text-black"
                style={{
                  background:
                    "linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)",
                }}
              ></span>
            </div>
          )}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
