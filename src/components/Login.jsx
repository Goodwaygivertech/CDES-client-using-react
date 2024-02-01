import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { userContext } from "./context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Login() {
  const { user, setUser } = useContext(userContext);
  const [doneLoging, setDoneLoging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleTogglePasswordVisibility = () => {
    setPasswordVisible((prevVisibility) => !prevVisibility);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const { email, password } = formData;
    const requestData = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        requestData
      );
      const responseData = response.data;

      if (responseData.created) {
        const { fname, lname, email, _id } = responseData.user;

        // Convert user data to a string before storing in localStorage
        localStorage.setItem(
          "userData",
          JSON.stringify({ created: true, data: { fname, lname, email, _id } })
        );
        // navigate("/")
        setDoneLoging(true);
        setLoading(false)
        toast.success("User LogedIn Successfully ");
      }
    } catch (error) {
      // Handle error
      setLoading(false)
      toast.error("Error While User Loging");

      console.error("Login error:", error);
    }
  };

  //  window.location.reload()

  return (
    <>
      <Link
        to="/"
        className="flex justify-center space-x-3 rtl:space-x-reverse py-4"
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
      <form className="max-w-md mx-auto pt-4 h-[80vh]" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required=""
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
        <input
          type={passwordVisible ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          id="floating_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required=""
        />
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
        <div
          className="absolute top-3 right-3 cursor-pointer"
          onClick={handleTogglePasswordVisibility}
        >
          {!passwordVisible ? (
            <span>Show</span>
          ) : (
            <span>Hide</span>
          )}
        </div>
      </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {!doneLoging ? "Submit" : "User Created"}
          {loading && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
        </button>
        <a
          className={`green-btn ml-2`}
          href="/"
        >
          Go To Home
        </a>
        <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-300 mt-4">
        Not registered?{" "}
        <Link
          to="/signup"
          className="text-blue-700 hover:underline dark:text-blue-500"
        >
          Create account
        </Link>
      </div>
      </form>

    </>
  );
}
