import React from 'react'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from './utils/feedSlice'
const BASE_URL = import.meta.env.VITE_BASE_URL;


const UserCard = ({user}) => {
    // console.log(user, "in the usercard")
    // console.log(user.data[0].firstName , "first user")
const { _id, firstName, lastName, profileUrl, age, skills, about, gender} = user
console.log(profileUrl , "this is the profile url from the user card section")
const dispatch = useDispatch()
const handleSendRequest = async(status, userId) =>{
  try {
    const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {},{ withCredentials : true})
    dispatch(removeUserFromFeed(userId))
  } catch (error) {
    
  }
}

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={profileUrl}
      alt="user profile"/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <p>{gender}</p>
    <p>{about}</p>
    <p>{age}</p>
    <p>{skills}</p>
    <div className="card-actions justify-center mt-3.5">
      <button className="btn btn-secondary" onClick={()=> handleSendRequest("ignore", _id)}>Ignore</button>
      <button className="btn btn-primary" onClick={()=> handleSendRequest("interested", _id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard