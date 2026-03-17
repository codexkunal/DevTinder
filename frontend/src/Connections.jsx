import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from './utils/connectionSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, User2, Calendar, ArrowRight, Code2 } from 'lucide-react';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] p-4">
        <div className="dt-card p-10 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'var(--accent-cyan-dim)' }}>
            <Users className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No Connections Yet</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Start exploring and connecting with other developers to build your network!
          </p>
          <Link to="/feed" className="dt-btn-primary no-underline text-sm">
            Explore Developers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 lg:px-8" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Your Connections</h1>
            <p className="text-xs font-mono mt-1" style={{ color: 'var(--text-muted)' }}>
              {connections.length} developer{connections.length !== 1 ? 's' : ''} in your network
            </p>
          </div>
          <Link to="/feed" className="dt-btn-outline text-xs no-underline">
            <Users className="w-3.5 h-3.5" /> Find More
          </Link>
        </div>

        {/* Connection Cards */}
        <div className="space-y-3">
          {connections.map((connection) => {
            const { _id, firstName, lastName, profileUrl, age, gender, about } = connection;

            return (
              <div key={_id} className="dt-card p-4 flex items-center gap-5">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    alt={`${firstName}'s profile`}
                    className="w-16 h-16 rounded-xl object-cover"
                    src={profileUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop'}
                    style={{ border: '1px solid var(--border-color)' }}
                  />
                </div>

                {/* Info */}
                <div className="flex-grow min-w-0">
                  <h2 className="text-base font-semibold text-white">{firstName} {lastName}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    {gender && (
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <User2 className="w-3 h-3" /> {gender}
                      </span>
                    )}
                    {age && (
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <Calendar className="w-3 h-3" /> {age} yrs
                      </span>
                    )}
                  </div>
                  {about && (
                    <p className="text-xs mt-1 truncate" style={{ color: 'var(--text-secondary)' }}>{about}</p>
                  )}
                </div>

                {/* Chat Button */}
                <Link to={`/chat/${_id}`}
                  className="dt-btn-primary text-xs no-underline flex-shrink-0 px-5 py-2.5">
                  <MessageSquare className="w-3.5 h-3.5" /> Chat
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