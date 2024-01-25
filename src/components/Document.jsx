import React, { useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
// import Editor from "react-simple-wysiwyg";
// import FroalaEditor  from "react-froala-wysiwyg"
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/save.min.js";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { userContext,requestStateContext } from "./context/ContextProvider";
export default function Document() {
  const socket = useMemo(
    () =>
      io("http://localhost:5000", {
        withCredentials: true,
      }),
    []
  );
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("myroom");
  const [docId, setDocId] = useState("");
  const [docName, setDocName] = useState("");
  const [doc, setDoc] = useState([]);
  const [isDocAccessForThisUser, setIsDocAccessForThisUser] = useState(false);
  const [model, setModel] = useState("");
  const { user, setUser } = useContext(userContext);
  const { isRequestDone, setIsRequestDone } = useContext(requestStateContext);

  // ind 0 => doc name
  // ind 1 => doc _id
  const params = useParams();
  
  const handleChangeModel = (html) => {
    // alert("in handlesubmit");
setModel(html)
    socket.emit("message", { model: html, roomName });
    // console.log("model=>>>>>>>",model)
    console.log("html=>>>>>>>", html);
    // setMessage("");
  };

  const joinRoomHandler = () => {
    socket.emit("join-room", roomName);
    // alert("joind", roomName);
    // setRoomName("");
  };

  const getDocumentData = async () => {
    setIsRequestDone(true)
    // http://localhost:5000/api/getDoc/65b11b0467f5291f3ce2a846
    let { allPara } = params;
    const splitedparams = allPara.split("-");
    //   setDocName(splitedparams[0])
    //  setDocId(splitedparams[1])
    const response = await axios.get(
      `http://localhost:5000/api/getDoc/${splitedparams[1]}`
    );
    // Set the response in the state
    const responseData = response.data;
    if (responseData.success) {
      setDoc(responseData.document);
      setModel(responseData.document.docData);
      if (
        responseData.document.owner === user.data.email ||
        responseData.document.sharedWith.includes(user.data.email)
      ) {
        setIsDocAccessForThisUser(true);
        joinRoomHandler();
      }
    }
    setIsRequestDone(false)
  };

  useEffect(() => {
    let { allPara } = params;
    const splitedparams = allPara.split("-");
    setDocName(splitedparams[0]);
    setDocId(splitedparams[1]);
    getDocumentData();
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log("data in receive-message =>>>>>", data);
      // setMessages((messages) => [...messages, data]);
      setModel(data);
    });



  }, []);

  //

  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle form submission and make the API call
  const handelShareLinkCreation = async (e) => {
    setIsRequestDone(true)
    e.preventDefault();
    setEmail("")
    try {
      const bodyData = {
        documentId: docId,
        userEmailToShareWith: email,
      };
      const response = await axios.put(
        "http://localhost:5000/api/share-doc",
        bodyData
      );
      const responseData = response.data;
      
    } catch (error) {
      // Handle errors
      setResponse(null);
      setError(error.message || "An error occurred");
    }
    setIsRequestDone(false)
  };

  const handleEmailChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmail(value);
  };


const handleUpdateDocData = async(e)=>{
  setIsRequestDone(true)
  e.preventDefault()
  let bodyData = {
    "newDocData":model
  }
  // http://localhost:5000/api/update-doc-data/65b13b0998fa5407d503c009
  const response = await axios.put(
    `http://localhost:5000/api/update-doc-data/${doc._id}`,
    bodyData
  );
 const responseData = response.data;
 if(responseData.success){
  toast("updated successfully ")
 }
 setIsRequestDone(false)

}

  return (
    <>
    <section className="max-w-screen-xl mx-auto">
      <div className="flex gap-4 mb-4 border-2 rounded-md">
      <p className="dark:text-white font-medium font-rubik p-1">Name:- {docName}</p>
      <p className="dark:text-white font-medium font-rubik p-1">Id:- {docId}</p>
</div>
      <button
        data-modal-target="authentication-modal2"
        data-modal-toggle="authentication-modal2"
        type="button"
        className={`default-btn ${!isDocAccessForThisUser ? "pointer-events-none":null}`}
       
        style={{ margin: "0px", marginRight: "10px" }}
      >
        Share With Other
      </button>
      <button    onClick={(e)=>handleUpdateDocData(e)} type="button" title="save doc in database for save preview in future" class={`green-btn ${!isDocAccessForThisUser? "pointer-events-none":null}`}>Save Document in DataBase</button>

</section>
      <div
        id="authentication-modal2"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Enter email you want to share with
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal2"
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
              <form className="space-y-4" onSubmit={handelShareLinkCreation}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="My new document"
                    required=""
                    onChange={handleEmailChange}
                  />
                 <div className="my-1 dark:text-white">
               Already:-  {doc.sharedWith && doc.sharedWith.map((email)=><span className="border dark:text-white rounded-md">{email} </span>)}
               </div> 
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  data-modal-hide="authentication-modal2"
                >
                  Craete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {isDocAccessForThisUser ? (
        <>
          {" "}
          <FroalaEditor
            model={model}
            onModelChange={(e) => {handleChangeModel(e);}}
            config={{
              // placeholderText:""
              // saveInteval: 10,
              // events: {
              //   "save.before": function (html) {
              //     console.log(html);
              //     handleChangeModel(html);
              //   },
              // },
            }}
            tag="textarea"
          />
        </>
      ) : (
        <p className="text-[red] font-bold font-rubik text-center">
        THIS FILE IS NOT ACCESSABLE FOR YOU, FILE IS PROTECTED 
    </p>
       
      )}
    </>
  );
}
