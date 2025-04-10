import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((store) => store.user);
    // console.log(user, "in the profile from store")
  return (
    user && (
        <div><EditProfile user={user}/></div>
    )
  )
}

export default Profile