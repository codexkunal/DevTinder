import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from './utils/requestSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Users, Check, X, User2, Calendar, ArrowRight } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/pending`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] p-4">
        <div className="dt-card p-10 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'var(--accent-cyan-dim)' }}>
            <Users className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No Pending Requests</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Keep exploring and connecting with developers. Your next collaboration is around the corner!
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
            <h1 className="text-2xl font-bold text-white">Connection Requests</h1>
            <p className="text-xs font-mono mt-1" style={{ color: 'var(--text-muted)' }}>
              {requests.length} pending request{requests.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link to="/feed" className="dt-btn-outline text-xs no-underline">
            <Users className="w-3.5 h-3.5" /> Find More
          </Link>
        </div>

        {/* Request Cards */}
        <div className="space-y-3">
          {requests.map((request) => {
            const { _id, firstName, lastName, profileUrl, age, gender, about } = request.fromUserId;

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

                {/* Action Buttons */}
                <div className="flex-shrink-0 flex gap-2">
                  <button
                    onClick={() => reviewRequest("reject", request._id)}
                    className="px-5 py-2.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all duration-200 cursor-pointer"
                    style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff5f57'; e.currentTarget.style.color = '#ff5f57'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <X className="w-3.5 h-3.5" /> Decline
                  </button>
                  <button
                    onClick={() => reviewRequest("accepted", request._id)}
                    className="dt-btn-primary text-xs px-5 py-2.5"
                  >
                    <Check className="w-3.5 h-3.5" /> Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;