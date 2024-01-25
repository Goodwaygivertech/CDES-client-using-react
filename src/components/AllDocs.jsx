import React, { useEffect, useState, useContext } from "react";
import { userContext } from "./context/ContextProvider";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllDocs() {
  const [docs, setDocs] = useState([]);
  const { user, setUser } = useContext(userContext);

  const getAllDocsByUser = async () => {
    const response = await axios.get(
      `https://cdes-backend.vercel.app/api/getDocs/${user.data._id}`
    );
    // Set the response in the state
    const responseData = response.data;
    setDocs(responseData);
  };

  useEffect(() => {
    getAllDocsByUser();
  }, []);

  return (
    <>
      <p className="dark:text-white font-bold font-rubik text-center my-2">
        ALL DOCUMENTS
      </p>
      <div className="max-w-screen-xl mx-auto">
        {docs && docs.length > 0 ? (
          docs.map((item, i) => {
            return (
              <>
                {/* navigate(`/document/${formData.docName}-${responseData._id}`) */}
                <div className="border-2 rounded-[10px] mb-2 p-4 " key={i}>
                  <Link
                    target="_black"
                    to={`/document/${item.docName}-${item._id}`}
                  >
                    <div className="flex gap-4">
                      <p className="text-bold font-rubik dark:text-white">
                        {item.docName}
                      </p>
                      <p className="dark:text-white">{item._id}</p>
                    </div>

                    <p className="dark:text-white border p-2 rounded-md">
                      Shared With :-{" "}
                      {item.sharedWith.map((email, i) => (
                        <span key={i} className="dark:text-white mx-2">
                          {email}
                        </span>
                      ))}
                    </p>
                    <p className="dark:text-white">{item.owner}</p>
                  </Link>
                </div>
              </>
            );
          })
        ) : (
          <p className="text-[red] font-bold font-rubik text-center mt-5">
            LOOKING LIKE NO DOCUMENT IS HERE
          </p>
        )}

        <div className="text-center mt-5">
          {user && user.created ? (
            <>
              <button
                data-modal-target="authentication-modal"
                data-modal-toggle="authentication-modal"
                type="button"
                className="default-btn"
                style={{ margin: "0px", marginRight: "10px" }}
              >
                + New Doc
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
        </div>
      </div>
    </>
  );
}
