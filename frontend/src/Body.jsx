import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { addUser } from './utils/userSlice'

import { SocketProvider } from './utils/SocketContext'

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
    if (userData) return
    try {
      const res = await axios.get(`${BASE_URL}/profile`, {
        withCredentials: true
      })
      dispatch(addUser(res.data))
    } catch (err) {
      if (err?.response?.status === 401) {
        // Only redirect to login if on a protected page
        const publicPaths = ['/', '/login']
        if (!publicPaths.includes(location.pathname)) {
          navigate("/login")
        }
      }
    }
  }

  useEffect(() => {
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isLandingPage = location.pathname === '/'
  const isLoginPage = location.pathname === '/login'
  const hideNavFooter = isLoginPage || (isLandingPage && !userData)
  const isChatPage = location.pathname.startsWith('/chat')

  return (
    <SocketProvider>
      <div className={`flex flex-col ${isChatPage ? 'h-screen overflow-hidden' : 'min-h-screen'}`} style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        {!hideNavFooter && <Navbar />}
        <main className={`flex-grow ${isChatPage ? 'flex flex-col min-h-0' : ''}`}>
          <Outlet />
        </main>
        {!hideNavFooter && !isLandingPage && !isChatPage && <Footer />}
      </div>
    </SocketProvider>
  )
}

export default Body
