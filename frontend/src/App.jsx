// import Navbar from "./Navbar"
import Body from "./Body"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"
import { Provider} from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./Feed"
import Profile from "./Profile"
import Connections from "./Connections"
import Requests from "./Requests"

function App() {

  return (
    <>
    <Provider store={appStore}>
     <BrowserRouter basename="/">
     <Routes>
      <Route path="/" element={<Body/>}>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/connections" element={<Connections/>} />
        <Route path="/requests" element={<Requests/>} />

      </Route>
     </Routes>
   </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
