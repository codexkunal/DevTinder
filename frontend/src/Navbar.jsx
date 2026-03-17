import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { removeUser } from './utils/userSlice';
import { clearMessages, clearRequests } from './utils/notificationSlice';
import { Code2, Search, Bell, Settings, MessageSquare, ChevronDown, LogOut, User, Users, Heart } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const unreadMessages = useSelector((store) => store.notifications.unreadMessages);
  const unreadRequests = useSelector((store) => store.notifications.unreadRequests);

  const handleLogOut = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Clear messages automatically if we are currently looking at a chat
  useEffect(() => {
    if (location.pathname.startsWith('/chat')) {
      dispatch(clearMessages());
    }
  }, [location.pathname, dispatch]);

  const navLinks = [
    { to: '/feed', label: 'Swipe' },
    { to: '/connections', label: 'Matches' },
    { to: '/requests', label: 'Requests' },
  ];

  const isActive = (path) => location.pathname === path;

  // Clear notifications when navigating
  const handleMessagesClick = () => {
    dispatch(clearMessages());
  };

  const handleRequestsClick = () => {
    dispatch(clearRequests());
  };

  return (
    <nav style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}
      className="sticky top-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to={user ? "/feed" : "/"} className="flex items-center gap-2 no-underline">
          <div style={{ color: 'var(--accent-cyan)' }} className="flex items-center gap-2">
            <Code2 className="w-7 h-7" />
            <span className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              DevTinder
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        {user && (
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={link.to === '/requests' ? handleRequestsClick : undefined}
                className="relative py-2 text-sm font-medium no-underline transition-colors duration-200"
                style={{
                  color: isActive(link.to) ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                }}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: 'var(--accent-cyan)' }} />
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Right Section */}
        {user && (
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <Search className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search developers..."
                className="bg-transparent border-none outline-none text-sm w-40"
                style={{ color: 'var(--text-primary)' }}
              />
            </div>

            {/* Icon Buttons */}
            <Link to="/connections"
              onClick={handleMessagesClick}
              className="dt-btn-ghost rounded-lg p-2 no-underline relative"
              title="Messages">
              <MessageSquare className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              {unreadMessages > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                  style={{ background: 'var(--accent-cyan)' }} />
              )}
            </Link>

            <Link to="/requests"
              onClick={handleRequestsClick}
              className="dt-btn-ghost rounded-lg p-2 relative" title="Notifications">
              <Bell className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              {unreadRequests > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                  style={{ background: 'var(--accent-cyan)' }} />
              )}
            </Link>

            {/* Profile Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full transition-all duration-200"
                style={{
                  border: '2px solid var(--border-color)',
                }}
              >
                <img
                  alt="Profile"
                  src={user?.profileUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden z-50 shadow-xl"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                    }}>
                    <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <p className="text-sm font-semibold text-white">{user.firstName} {user.lastName}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link to="/profile" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm no-underline transition-colors duration-200"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <Link to="/connections" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm no-underline transition-colors duration-200"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Users className="w-4 h-4" /> Connections
                      </Link>
                      <Link to="/requests" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm no-underline transition-colors duration-200"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Heart className="w-4 h-4" /> Requests
                      </Link>
                    </div>
                    <div style={{ borderTop: '1px solid var(--border-color)' }} className="py-1">
                      <button
                        onClick={() => { setDropdownOpen(false); handleLogOut(); }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm w-full border-none cursor-pointer transition-colors duration-200"
                        style={{ color: '#ff5f57', background: 'transparent' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,95,87,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Not logged in */}
        {!user && (
          <div className="flex items-center gap-3">
            <Link to="/login" className="dt-btn-outline text-sm no-underline">Log In</Link>
            <Link to="/login" className="dt-btn-primary text-sm no-underline">Join Now</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;