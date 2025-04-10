// import React from 'react'
// import { useDispatch } from 'react-redux'
// import axios from 'axios'
// import { removeUserFromFeed } from './utils/feedSlice'
// const BASE_URL = import.meta.env.VITE_BASE_URL;


// const UserCard = ({user}) => {
   
// const { _id, firstName, lastName, profileUrl, age, skills, about, gender} = user
// console.log(profileUrl , "this is the profile url from the user card section")
// const dispatch = useDispatch()
// const handleSendRequest = async(status, userId) =>{
//   console.log(status , userId)
//   try {
//     const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {},{ withCredentials : true})
//     console.log(res)
//     dispatch(removeUserFromFeed(userId))
//   } catch (error) {
//     console.log(error)
//   }
// }

//   return (
//     <div className="card bg-base-300 w-96 shadow-sm">
//   <figure>
//     <img
//       src={profileUrl}
//       alt="user profile"/>
//   </figure>
//   <div className="card-body">
//     <h2 className="card-title">{firstName + " " + lastName}</h2>
//     <p>{gender}</p>
//     <p>{about}</p>
//     <p>{age}</p>
//     <p>{skills}</p>
//     <div className="card-actions justify-center mt-3.5">
//       <button className="btn btn-secondary" onClick={()=> handleSendRequest("ignored", _id)}>Ignore</button>
//       <button className="btn btn-primary" onClick={()=> handleSendRequest("interested", _id)}>Interested</button>
//     </div>
//   </div>
// </div>
//   )
// }

// export default UserCard

// =============================================

import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { removeUserFromFeed } from './utils/feedSlice';
import { Heart, X, Code2, Calendar, User2 } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, profileUrl, age, skills, about, gender } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error);
    }
  };

  const renderSkillBadges = (skillsArray) => {
    if (!skillsArray || !Array.isArray(skillsArray)) return null;
  
    return skillsArray.map((skill, index) => (
      <span
        key={index}
        className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full flex items-center gap-1"
      >
        <Code2 className="w-3 h-3" />
        {skill.trim()}
      </span>
    ));
  };
  

  return (
    <div className="w-full max-w-sm max-h-[90vh] overflow-y-auto bg-gray-800 rounded-xl shadow-lg">
      {/* Profile Image */}
    {/* Image Section */}
<div className="relative h-90">
  <img
    src={profileUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80'}
    alt={`${firstName}'s profile`}
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
</div>


      {/* Content */}
      <div className="relative -mt-20 px-4 sm:px-6 pb-6">
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white mb-1">
              {firstName} {lastName}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-gray-400 text-sm">
              <span className="flex items-center gap-1">
                <User2 className="w-4 h-4" />
                {gender}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {age} years
              </span>
            </div>
          </div>

          {/* About */}
          <p className="text-gray-300 mb-4 text-sm">{about}</p>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">SKILLS</h3>
            <div className="flex flex-wrap gap-2">
              {skills && renderSkillBadges(skills)}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleSendRequest('ignored', _id)}
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
              Pass
            </button>
            <button
              onClick={() => handleSendRequest('interested', _id)}
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors duration-200"
            >
              <Heart className="w-5 h-5" />
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;