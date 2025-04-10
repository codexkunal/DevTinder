// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { addConnections } from './utils/connectionSlice'
// import axios from 'axios'
// import { Link } from 'react-router-dom';
// const BASE_URL = import.meta.env.VITE_BASE_URL;


// const Connections = () => {
//   const connections = useSelector((store) => store.connections);
//   const dispatch = useDispatch();
//   const fetchConnections = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/user/connection`, {
//         withCredentials: true,
//       });
//       dispatch(addConnections(res.data.data));
//     } catch (err) {
//       // Handle Error Case
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   if (!connections) return;

//   if (connections.length === 0) return <h1> No Connections Found</h1>;

//   return (
//     <div className="text-center my-10">
//       <h1 className="text-bold text-white text-3xl">Connections</h1>

//       {connections.map((connection) => {
//         const { _id, firstName, lastName, profileUrl, age, gender, about } =
//           connection;
//           console.log(profileUrl)

//         return (
//           <div
//             key={_id}
//             className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
//           >
//             <div>
//               <img
//                 alt="photo"
//                 className="w-20 h-20 rounded-full object-cover"
//                 src={profileUrl}
//               />
//             </div>
//             <div className="text-left mx-4 ">
//               <h2 className="font-bold text-xl">
//                 {firstName + " " + lastName}
//               </h2>
//               {age && gender && <p>{age + ", " + gender}</p>}
//               <p>{about}</p>
//             </div>
//             <Link to={"/chat/" + _id}>
//               <button className="btn btn-primary">Chat</button>
//             </Link>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// export default Connections;


// ==========================================================

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from './utils/connectionSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, User2, Calendar, ArrowRight } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connection`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No Connections Yet</h2>
            <p className="text-gray-400 mb-6">
              Start exploring and connecting with other developers to build your network!
            </p>
            <Link
              to="/feed"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Explore Developers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Your Connections</h1>
          <Link
            to="/feed"
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Find More
          </Link>
        </div>

        <div className="grid gap-4">
          {connections.map((connection) => {
            const { _id, firstName, lastName, profileUrl, age, gender, about } = connection;

            return (
              <div
                key={_id}
                className="bg-gray-800 rounded-xl p-4 flex items-center gap-6 transform transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="flex-shrink-0">
                  <img
                    alt={`${firstName}'s profile`}
                    className="w-24 h-24 rounded-xl object-cover"
                    src={profileUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'}
                  />
                </div>
                
                <div className="flex-grow">
                  <h2 className="text-xl font-bold text-white mb-1">
                    {firstName} {lastName}
                  </h2>
                  <div className="flex items-center gap-4 text-gray-400 text-sm mb-2">
                    {age && gender && (
                      <>
                        <span className="flex items-center gap-1">
                          <User2 className="w-4 h-4" />
                          {gender}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {age} years
                        </span>
                      </>
                    )}
                  </div>
                  {about && (
                    <p className="text-gray-300 text-sm line-clamp-2">{about}</p>
                  )}
                </div>

                <Link
                  to={`/chat/${_id}`}
                  className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;