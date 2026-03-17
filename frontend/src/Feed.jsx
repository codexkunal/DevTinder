import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from './utils/feedSlice';
import UserCard from './UserCard';
import { Code2, RefreshCw } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!feed) return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <RefreshCw className="w-8 h-8 animate-spin" style={{ color: 'var(--accent-cyan)' }} />
    </div>
  );

  if (feed.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: 'var(--accent-cyan-dim)' }}>
          <Code2 className="w-10 h-10" style={{ color: 'var(--accent-cyan)' }} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">No more profiles</h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          You've seen all available developers. Check back soon for new matches!
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;