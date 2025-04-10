// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addUser } from "./utils/userSlice";
// import { useNavigate } from "react-router-dom";
// const BASE_URL = import.meta.env.VITE_BASE_URL;

// const Login = () => {
//   const [email, setEmailId] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [isLoginForm, setisLoginForm] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handlelogin = async () => {
//     try {
//       console.log(email);
//       console.log(password);
//       const res = await axios.post(
//         `${BASE_URL}/login`,
//         {
//           email,
//           password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json", // Ensure JSON format
//           },
//           withCredentials: true, // Include cookies if required
//         }
//       );
//       console.log(res);
//       dispatch(addUser(res.data));
//       return navigate("/feed");
//     } catch (err) {
//       console.log(err);
//     }
//   };

   
//   const handlesignup = async ()=>{
//     try {
//       const res = await axios.post(`${BASE_URL}/signup`,{firstName,lastName,email,password},{withCredentials:true})
//       dispatch(addUser(res.data.data))
//       return navigate("/profile")
//     } catch (error) {
      
//     }
//   }
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="card card-side bg-base-200 shadow-sm w-fit flex justify-center">
//         <figure>
//           <img
//             src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
//             alt="Movie"
//           />
//         </figure>
//         <div className="card-body justify-center">
//           <h2 className="flex justify-center text-3xl font-bold pb-5">
//            {!isLoginForm ? "Login" : "sign Up"}
//           </h2>

//           {isLoginForm && (
//             <>
//               <div className="label*">
//                 <span className="label-next">First Name</span>
//               </div>
//               {/* // first name  */}
//               <label className="input validator p-">
//                 <svg
//                   className="h-[1em] opacity-50"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                 >
//                   <g
//                     strokeLinejoin="round"
//                     strokeLinecap="round"
//                     strokeWidth="2.5"
//                     fill="none"
//                     stroke="currentColor"
//                   >
//                     <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
//                     <circle cx="12" cy="7" r="4"></circle>
//                   </g>
//                 </svg>
//                 <input
//                   type="input"
//                   required
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   placeholder="firstName"
//                   pattern="[A-Za-z][A-Za-z0-9\-]*"
//                   minlength="3"
//                   maxlength="30"
//                   title="Only letters, numbers or dash"
//                 />
//               </label>
//               <p className="validator-hint hidden">
//                 Must be 3 to 30 characters
//                 <br />
//                 containing only letters, numbers or dash
//               </p>
//               {/* last name */}
//               <div className="label*">
//                 <span className="label-next">Last Name</span>
//               </div>
//               {/*  */}
//               <label className="input validator">
//                 <svg
//                   className="h-[1em] opacity-50"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                 >
//                   <g
//                     strokeLinejoin="round"
//                     strokeLinecap="round"
//                     strokeWidth="2.5"
//                     fill="none"
//                     stroke="currentColor"
//                   >
//                     <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
//                     <circle cx="12" cy="7" r="4"></circle>
//                   </g>
//                 </svg>
//                 <input
//                   type="input"
//                   required
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   placeholder="Lastname"
//                   pattern="[A-Za-z][A-Za-z0-9\-]*"
//                   minlength="3"
//                   maxlength="30"
//                   title="Only letters, numbers or dash"
//                 />
//               </label>
//               <p className="validator-hint hidden">
//                 Must be 3 to 30 characters
//                 <br />
//                 containing only letters, numbers or dash
//               </p>
//             </>
//           )}

//           {/*  */}
//           <div className="label*">
//             <span className="label-next">Email ID</span>
//           </div>
//           <label className="input validator">
//             <svg
//               className="h-[1em] opacity-50"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//             >
//               <g
//                 strokeLinejoin="round"
//                 strokeLinecap="round"
//                 strokeWidth="2.5"
//                 fill="none"
//                 stroke="currentColor"
//               >
//                 <rect width="20" height="16" x="2" y="4" rx="2"></rect>
//                 <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
//               </g>
//             </svg>
//             <input
//               type="email"
//               placeholder="dev@gmail.com"
//               required
//               value={email}
//               onChange={(e) => setEmailId(e.target.value)}
//             />
//           </label>
//           <div className="validator-hint hidden">Enter valid email address</div>
//           {/* next */}

//           <div className="label*">
//             <span className="label-next py-0">Password</span>
//           </div>
//           <label className="input validator">
//             <svg
//               className="h-[1em] opacity-50"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//             >
//               <g
//                 strokeLinejoin="round"
//                 strokeLinecap="round"
//                 strokeWidth="2.5"
//                 fill="none"
//                 stroke="currentColor"
//               >
//                 <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
//                 <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
//               </g>
//             </svg>
//             <input
//               type="password"
//               required
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               minlength="8"
//               pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
//               title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
//             />
//           </label>
//           <p className="validator-hint hidden">
//             Must be more than 8 characters, including
//             <br />
//             At least one number
//             <br />
//             At least one lowercase letter
//             <br />
//             At least one uppercase letter
//           </p>
//           <div className="validator-hint hidden">Enter valid email address</div>
//           <div className="card-actions justify-center pt-5">
//             <button className="btn btn-primary" onClick={isLoginForm ? handlesignup : handlelogin }>
//             {isLoginForm ? " Sign up" : "Login"}
//             </button>
//           </div>
//           <p className="flex justify-center text-blue-600 underline cursor-pointer" onClick={()=>setisLoginForm(value => !value)}>
//             {!isLoginForm ? "New User? sign up" : "Existing User ? Login Here"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



// ============================
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "./utils/userSlice";
import { Eye, EyeOff, Code2, Mail, Lock, User } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
                `${BASE_URL}/login`,
                {
                  email,
                  password,
                },
                {
                  headers: {
                    "Content-Type": "application/json", // Ensure JSON format
                  },
                  withCredentials: true, // Include cookies if required
                }
              );
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex rounded-2xl shadow-2xl overflow-hidden bg-gray-800">
        {/* Left side - Image */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Developer workspace"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/90 to-transparent flex items-center justify-center">
            <div className="p-8 text-white">
              <Code2 className="w-16 h-16 mb-4" />
              <h2 className="text-3xl font-bold mb-2">DevTinder</h2>
              <p className="text-gray-300">Connect with developers who share your passion for code</p>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLoginForm ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-400">
              {isLoginForm ? "Join the developer community" : "Login to your account"}
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {isLoginForm && (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                  placeholder="dev@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isLoginForm && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-gray-400">
                  <input type="checkbox" className="mr-2 rounded bg-gray-700 border-gray-600" />
                  Remember me
                </label>
                <a href="#" className="text-blue-500 hover:text-blue-400">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              onClick={isLoginForm ? handleSignup : handleLogin}
              className="w-full btn btn-primary text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              {isLoginForm ? "Create Account" : "Sign In"}
            </button>

            <div className="text-center mt-4">
              <button
                onClick={() => setIsLoginForm(!isLoginForm)}
                className="text-blue-500 hover:text-blue-400 text-sm"
              >
                {isLoginForm
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
