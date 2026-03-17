import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../src/utils/SocketContext";
import { useSelector } from "react-redux";
import axios from "axios";
import { Send, Plus, Image, Code2, Smile, MoreVertical } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [connections, setConnections] = useState([]);
  const [targetUser, setTargetUser] = useState(null);
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // Use global socket instead of creating a new one
  const socket = useSocket();

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 1. Fetch user's connections for the sidebar
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connection`, { withCredentials: true });
      setConnections(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch connections", err);
    }
  };

  // 2. Fetch Chat History when target changes
  const fetchChatHistory = async () => {
    if (!targetUserId) return;
    try {
      const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, { withCredentials: true });
      const history = res.data?.message?.map(m => ({
        firstName: m.senderId.firstName,
        text: m.text,
        createdAt: m.createdAt,
      })) || [];
      setMessages(history);
    } catch (err) {
      console.error("Failed to fetch chat history", err);
    }
  };

  // Find target user details from connections
  useEffect(() => {
    if (connections.length > 0 && targetUserId) {
      const connUser = connections.find(c => c._id === targetUserId);
      if (connUser) {
        setTargetUser(connUser);
      }
    }
  }, [targetUserId, connections]);

  useEffect(() => {
    fetchConnections();
  }, []);

  // Socket Connection Lifecycle (only runs once or when targetUserId/socket changes)
  useEffect(() => {
    if (!userId || !targetUserId || !socket) {
      console.log("Chat useEffect returned early:", { userId, targetUserId, socket: !!socket });
      return;
    }

    console.log("Chat useEffect running. Calling fetchChatHistory...");
    fetchChatHistory();

    const joinChatRoom = () => {
      console.log("Emitting joinChat for user:", user.firstName, "=> Target:", targetUserId);
      socket.emit("joinChat", {
        firstName: user.firstName,
        userId,
        targetUserId,
      });
    };

    // Join immediately if connected
    if (socket.connected) {
      console.log("Socket already connected, calling joinChatRoom immediately.");
      joinChatRoom();
    } else {
      console.log("Socket NOT connected yet.");
    }

    // Also join anytime it reconnects
    socket.on("connect", joinChatRoom);

    // Handle receiving messages inside the active room
    const messageHandler = (newMsg) => {
      console.log("messageReceived event fired!", newMsg);
      setMessages((prevMessages) => {
        // Prevent dupes if this message arrived from history fetch simultaneously
        if (prevMessages.some(m => m.createdAt === newMsg.createdAt && m.text === newMsg.text)) {
          return prevMessages;
        }
        return [...prevMessages, newMsg];
      });
    };

    socket.on("messageReceived", messageHandler);

    return () => {
      console.log("Cleaning up chat socket listeners.");
      socket.off("connect", joinChatRoom);
      socket.off("messageReceived", messageHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, targetUserId, socket]);

  const sendMessage = () => {
    console.log("sendMessage called. newMessage:", newMessage, "socket:", !!socket);
    if (!newMessage.trim() || !socket) return;
    
    // We intentionally DO NOT update local state here; we wait for the socket back.
    console.log("Emitting sendMessage event to backend.");
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isCodeMessage = (text) => {
    return text && (text.includes('<') || text.includes('{') || text.includes('const ') || text.includes('function'));
  };

  const formatMessageTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  const getDayLabel = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (isSameDay(date, today)) {
      return "Today";
    } else if (isSameDay(date, yesterday)) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="flex flex-1 h-full min-h-0" style={{ background: 'var(--bg-primary)' }}>

      {/* ===== LEFT SIDEBAR ===== */}
      <div className="hidden md:flex flex-col w-80"
        style={{ borderRight: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
        
        <div className="p-5">
          <h2 className="text-xl font-bold text-white mb-2">Connections</h2>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Select a developer to start chatting</p>
        </div>

        {/* Dynamic Connection List */}
        <div className="flex-1 overflow-y-auto">
          {connections.map((connectionUser, i) => {
            const isActive = connectionUser._id === targetUserId;

            return (
              <div key={i} onClick={() => navigate(`/chat/${connectionUser._id}`)}
                className="flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors duration-200"
                style={{
                  background: isActive ? 'rgba(13, 185, 242, 0.08)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--accent-cyan)' : '3px solid transparent',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                  style={{ background: 'var(--bg-card)', border: isActive ? '2px solid var(--accent-cyan)' : 'none' }}>
                  <img src={connectionUser.profileUrl || `https://ui-avatars.com/api/?name=${connectionUser.firstName}+${connectionUser.lastName}&background=1A2229&color=0db9f2`}
                    alt={connectionUser.firstName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-white truncate block">
                    {connectionUser.firstName} {connectionUser.lastName}
                  </span>
                  {connectionUser.skills && connectionUser.skills.length > 0 && (
                     <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                       {connectionUser.skills[0]}
                     </p>
                  )}
                </div>
              </div>
            );
          })}
          
          {connections.length === 0 && (
             <div className="p-5 text-center px-8">
               <p className="text-xs" style={{ color: 'var(--text-muted)' }}>You don't have any connections yet. Go swipe and match!</p>
             </div>
          )}
        </div>
      </div>

      {/* ===== MAIN CHAT AREA ===== */}
      <div className="flex-1 flex flex-col">
        
        {targetUserId && targetUser ? (
          <>
            {/* Dynamic Chat Header */}
            <div className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden"
                  style={{ border: '2px solid var(--accent-cyan)' }}>
                  <img src={targetUser.profileUrl || `https://ui-avatars.com/api/?name=${targetUser.firstName}+${targetUser.lastName}&background=1A2229&color=0db9f2`}
                    alt={targetUser.firstName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{targetUser.firstName} {targetUser.lastName}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-cyan)' }}></span>
                    <span className="text-xs font-mono" style={{ color: 'var(--accent-cyan)' }}>Connected</span>
                  </div>
                </div>
              </div>
              {/* Removed static Video/Phone call buttons, kept More options */}
              <div className="flex items-center gap-2">
                <button className="dt-btn-ghost p-2 rounded-lg"><MoreVertical className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} /></button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'var(--accent-cyan-dim)' }}>
                    <Code2 className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">Start the conversation</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Say hello to {targetUser.firstName} and start collaborating!
                  </p>
                </div>
              )}

              {messages.map((msg, index) => {
                const isOwnMessage = msg.firstName === user?.firstName;
                const isCode = isCodeMessage(msg.text);
                const prevMsg = index > 0 ? messages[index - 1] : null;
                const showDayDivider = !prevMsg || (!isSameDay(msg.createdAt, prevMsg.createdAt) && msg.createdAt);
                
                return (
                  <React.Fragment key={index}>
                    {showDayDivider && (
                      <div className="flex justify-center my-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium" 
                          style={{ background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
                          {getDayLabel(msg.createdAt)}
                        </span>
                      </div>
                    )}
                    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} gap-3 mb-4`}>
                    {!isOwnMessage && (
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1"
                        style={{ background: 'var(--bg-card)' }}>
                        <img src={targetUser.profileUrl || `https://ui-avatars.com/api/?name=${targetUser.firstName}+${targetUser.lastName}&background=1A2229&color=0db9f2`}
                          alt={msg.firstName} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className={`max-w-md ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                      {!isOwnMessage && (
                        <span className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-muted)' }}>
                          {msg.firstName}
                        </span>
                      )}
                      
                      {isCode ? (
                        /* Code Block Message */
                        <div>
                          <div className="rounded-xl px-4 py-3 mb-1" style={{
                            background: isOwnMessage ? 'var(--accent-cyan)' : 'var(--bg-card)',
                            color: isOwnMessage ? '#000' : 'var(--text-primary)',
                          }}>
                            <p className="text-sm">Sharing a code snippet:</p>
                          </div>
                          <div className="code-block mt-1">
                            <div className="code-block-header">
                              <div className="ide-dots-row">
                                <span className="ide-dot ide-dot--red" style={{ width: '8px', height: '8px' }}></span>
                                <span className="ide-dot ide-dot--yellow" style={{ width: '8px', height: '8px' }}></span>
                                <span className="ide-dot ide-dot--green" style={{ width: '8px', height: '8px' }}></span>
                              </div>
                            </div>
                            <div className="code-block-body text-xs">
                              <pre className="whitespace-pre-wrap m-0" style={{ color: 'var(--accent-cyan)' }}>{msg.text}</pre>
                            </div>
                            <span className={`text-[10px] mt-1 block ${isOwnMessage ? 'text-right' : 'text-left'}`} style={{ color: 'var(--text-muted)' }}>
                              {formatMessageTime(msg.createdAt)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* Normal Message */
                        <div className="flex flex-col">
                          <div className="rounded-xl px-4 py-3" style={{
                            background: isOwnMessage ? 'var(--accent-cyan)' : 'var(--bg-card)',
                            color: isOwnMessage ? '#000' : 'var(--text-primary)',
                            border: isOwnMessage ? 'none' : '1px solid var(--border-color)',
                          }}>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <span className={`text-[10px] mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`} style={{ color: 'var(--text-muted)' }}>
                            {formatMessageTime(msg.createdAt)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

            {/* Message Input */}
            <div className="px-6 py-4" style={{ borderTop: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1">
                  <button className="dt-btn-ghost p-2 rounded-lg"><Plus className="w-5 h-5" style={{ color: 'var(--text-muted)' }} /></button>
                  <button className="dt-btn-ghost p-2 rounded-lg"><Image className="w-5 h-5" style={{ color: 'var(--text-muted)' }} /></button>
                  <button className="dt-btn-ghost p-2 rounded-lg"><Code2 className="w-5 h-5" style={{ color: 'var(--text-muted)' }} /></button>
                </div>
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a message or paste code..."
                  className="dt-input flex-1 text-sm"
                />
                <button className="dt-btn-ghost p-2 rounded-lg"><Smile className="w-5 h-5" style={{ color: 'var(--text-muted)' }} /></button>
                <button 
                  onClick={sendMessage}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
                  style={{ background: 'var(--accent-cyan)', color: '#000', border: 'none' }}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{ background: 'var(--accent-cyan-dim)' }}>
              <Code2 className="w-10 h-10" style={{ color: 'var(--accent-cyan)' }} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your Developer Inbox</h2>
            <p className="text-sm max-w-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              Select a connection from the left to start collaborating, share code snippets, and build something together.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
