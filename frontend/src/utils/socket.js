import { io} from "socket.io-client"
const BASE_URL = import.meta.env.VITE_BASE_URL;



const createSocketConnection = () =>{
    return io(BASE_URL, {
        withCredentials: true,
      })
}

export default createSocketConnection