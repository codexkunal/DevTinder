import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { incrementMessages, incrementRequests } from "./notificationSlice";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Connect when user exists
    if (user) {
      const newSocket = io(import.meta.env.VITE_BASE_URL, {
        withCredentials: true,
      });

      // Join personal room upon connection
      newSocket.on("connect", () => {
        console.log("Socket connected ✅ ID:", newSocket.id);
        console.log("joining personal room...");
        newSocket.emit("joinPersonalRoom", { userId: user._id });
      });
      
      newSocket.on("disconnect", (reason) => {
        console.log("Socket disconnected ❌ reason:", reason);
      });
      
      newSocket.on("connect_error", (error) => {
        console.log("Socket connection error:", error);
      });

      // If socket connects very fast, the event might have fired already
      if (newSocket.connected) {
        newSocket.emit("joinPersonalRoom", { userId: user._id });
      }

      // Listen for global real-time notifications
      newSocket.on("newMessageNotification", (data) => {
        console.log("Global Notification Received:", data);
        dispatch(incrementMessages());
      });

      newSocket.on("newRequestNotification", () => {
        dispatch(incrementRequests());
      });

      setSocket(newSocket);

      return () => {
        console.log("SocketProvider unmounting, disconnecting socket");
        newSocket.disconnect();
        setSocket(null);
      };
    } else {
      // Only tear down if no user and we still had a socket
      if (socket) {
        console.log("User logged out, disconnecting socket");
        socket.disconnect();
        setSocket(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]); // Re-run only if the actual user ID changes to prevent infinite mount loops

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
