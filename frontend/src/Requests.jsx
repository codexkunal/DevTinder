import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from './utils/requestSlice'

const Requests = () => {
const requests = useSelector((store) => store.requests)
const dispatch = useDispatch()

const reviewRequest = async (status, _id) => {
  try {
    const res = await axios.post(`http://localhost:3000/request/review/${status}/${_id}` , {}, {withCredentials : true})
    dispatch(removeRequest(_id))
    
  } catch (error) {
    
  }
}

const fetchRequests = async () =>{
  try {
    const res = await axios.get("http://localhost:3000/user/requests/pending",{
      withCredentials:true
    })

 dispatch(addRequests(res.data.data))
    
  } catch (error) {
    
  }
}

useEffect(()=>{
  fetchRequests()
},[])
if (!requests) return;

if (requests.length === 0) return <h1> No Requests Found</h1>;

return (
  <div className="text-center my-10">
    <h1 className="text-bold text-white text-3xl">Connections</h1>

    {requests.map((request) => {
      const { _id, firstName, lastName, profileUrl, age, gender, about } =
        request.fromUserId;
        console.log(profileUrl)

      return (
        <div
          key={_id}
          className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
        >
          <div>
            <img
              alt="photo"
              className="w-20 h-20 rounded-full object-cover"
              src={profileUrl}
            />
          </div>
          <div className="text-left mx-4 ">
            <h2 className="font-bold text-xl">
              {firstName + " " + lastName}
            </h2>
            {age && gender && <p>{age + ", " + gender}</p>}
            <p>{about}</p>
          </div>
          <div>
            <button className='btn btn-primary mx-2' onClick={()=>reviewRequest("reject", request._id)}>Reject</button>
            <button className='btn btn-secondary mx-2' onClick={()=>reviewRequest("accepted", request._id)}>Accept</button>
          </div>
        
        </div>
      );
    })}
  </div>
);
};
export default Requests;