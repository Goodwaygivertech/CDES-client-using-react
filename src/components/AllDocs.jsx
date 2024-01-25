import React,{useEffect,useState,useContext} from 'react'
import { userContext } from './context/ContextProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllDocs() {
const [docs,setDocs] = useState([])
const {user, setUser} = useContext(userContext);

const getAllDocsByUser = async ()=>{
  const response = await axios.get(`http://localhost:5000/api/getDocs/${user.data._id}`);
      // Set the response in the state
      const responseData = response.data;
      setDocs(responseData)

}

  useEffect(() => {
    getAllDocsByUser()
  }, [])
  
  return (
 <>
 <p className="dark:text-white font-bold font-rubik text-center my-2">
        ALL DOCUMENTS
    </p>
 <div className='max-w-screen-xl mx-auto'>
 {docs.map((item, i)=>{
  return (
    <>
          {/* navigate(`/document/${formData.docName}-${responseData._id}`) */}

    <Link target='_black' to={`/document/${item.docName}-${item._id}`}>

<div className='border-2 rounded-[10px] mb-2 p-4 '>
  <div className='flex gap-4'>
<p className='text-bold font-rubik dark:text-white'>{item.docName}</p>
  <p className="dark:text-white">{item._id}</p>
  </div>
  
  <p className="dark:text-white border p-2 rounded-md">Shared With :- {item.sharedWith.map((email)=>  <span className="dark:text-white mx-2">{email}</span>)}</p>
  <p className="dark:text-white">{item.owner}</p>

</div>

    </Link>
 


    
    </>
  )
 })}

 </div>
 </>
  )
}




