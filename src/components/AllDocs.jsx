import React, { useEffect, useState, useContext } from "react";
import { fetchDocContext, userContext } from "./context/ContextProvider";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllDocs() {
  const [docs, setDocs] = useState([]);
  const { user, setUser } = useContext(userContext);
  const { fetchDoc, setFetchDoc } = useContext(fetchDocContext);
  const [deletedDocs, setDeletedDocs] = useState([]); // Keep track of deleted documents

  const getAllDocsByUser = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/getDocs/${user.data._id}`
    );
    // Set the response in the state
    const responseData = response.data;
    setDocs(responseData);
  };
  const deleteDocById = async (id) => {
    try {
      // Send a delete request to the server
      await axios.delete(`http://localhost:5000/api/delete-doc/${id}`);

      // Update the state by filtering out the deleted document
      setDocs((prevDocs) => prevDocs.filter((doc) => doc._id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
      // Handle error (show a message, etc.)
    }
  };

  useEffect(() => {
    getAllDocsByUser();
  }, [fetchDoc]);

  return (
    <>
      <p className="dark:text-white font-bold font-rubik text-center my-2">
        ALL DOCUMENTS
      </p>
      <div className="max-w-screen-xl mx-auto min-h-[70vh]">
        {docs && docs.length > 0 ? (
          [...docs].reverse().map((item, i) => {
            // Check if the document is marked as deleted
            if (deletedDocs.includes(item._id)) {
              return null; // Skip rendering deleted document
            }

            return (
              <div className="border-2 rounded-[10px] mb-2 p-4 " key={i}>
                <Link
                  target="_black"
                  to={`/document/${item.docName}-${item._id}`}
                >
                  <div className="flex gap-4">
                    <p className="text-bold font-rubik dark:text-[aqua] underline">
                      {item.docName}
                    </p>
                  </div>

                  <p className="dark:text-white p-1">
                    Shared With :-{" "}
                    {item.sharedWith.map((email, i) => (
                      <span key={i} className="dark:text-white mx-2">
                        {email}
                      </span>
                    ))}
                  </p>
                  <p className="dark:text-lime-500">Owner : {item.owner}</p>
                </Link>
                {/* <button onClick={() => deleteDocById(item._id)}>Delete</button> */}
                <button
                  onClick={() => deleteDocById(item._id)}
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
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
