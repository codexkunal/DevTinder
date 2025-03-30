import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { removeUser } from './utils/userSlice'

const Navbar = () => {
const user = useSelector((store) => store.user)
const dispatch = useDispatch()
const navigate = useNavigate()
// console.log(user)
const handleLogOut = async() => {
  try{
    await axios.post("http://localhost:3000/logout",{},{
      withCredentials : true
    })
dispatch(removeUser())
navigate("/login")
  }catch(err){
   console.log(err)
  }
}

  return (
    <div className="navbar bg-base-300 shadow-sm bottom-0">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">daisyUI</Link>
  </div>

  {user && (

  <div className="flex gap-2">
    <span className='flex justify-center py-2'>Welcome, {user.firstName}</span>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user?.profileUrl || "https://www.google.com/imgres?q=user%20image&imgurl=https%3A%2F%2Ffreesvg.org%2Fimg%2F1459344336.png&imgrefurl=https%3A%2F%2Ffreesvg.org%2Ffemale-user-icon&docid=KAUwNXKfGoRxKM&tbnid=KQ6_O_8WK9hD-M&vet=12ahUKEwi2_qregrSLAxVem68BHbpDMEMQM3oECGEQAA..i&w=600&h=600&hcb=2&ved=2ahUKEwi2_qregrSLAxVem68BHbpDMEMQM3oECGEQAA-profile.jpg"}  />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile"  className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connection</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><a onClick={handleLogOut}>Logout</a></li>
      </ul>
    </div>
  </div>
  )}
</div>
  )
}

export default Navbar;