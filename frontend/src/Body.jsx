import React, { useEffect } from 'react'
import Navbar from './Navbar'
// import dotenv from 'dotenv'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { addUser } from './utils/userSlice'
const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);


const Body = () => {
 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((store) => store.user)
// console.log(BASE_URL)
  const fetchUser = async () => {
    if(userData) return
    try {
       const res = await axios.get(`${BASE_URL}/profile`,{
        withCredentials : true
       })
       dispatch(addUser(res.data))

    }catch(err){
      if(err.status === 401){
        navigate("/login")
      }
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchUser()
  }, [])

  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Body