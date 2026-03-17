import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { removeUserFromFeed } from './utils/feedSlice';
import { Heart, X, Star, Code2, User2, Calendar } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, profileUrl, age, skills, about, gender } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error);
    }
  };

  // Generate random heatmap data for visual effect
  const heatmapLevels = ['', '--l1', '--l2', '--l3', '--l4'];
  const heatmapData = Array.from({ length: 20 }, () =>
    heatmapLevels[Math.floor(Math.random() * heatmapLevels.length)]
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Breadcrumb Path */}
      <div className="mb-4 font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
        <span style={{ color: 'var(--accent-cyan)' }}>~</span> / users / <span style={{ color: 'var(--text-secondary)' }}>{(firstName || 'user').toLowerCase()}_{(lastName || '').toLowerCase()}.js</span>
      </div>

      {/* IDE Window Card */}
      <div className="code-block overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
        {/* IDE Header */}
        <div className="code-block-header">
          <div className="ide-dots-row">
            <span className="ide-dot ide-dot--red"></span>
            <span className="ide-dot ide-dot--yellow"></span>
            <span className="ide-dot ide-dot--green"></span>
          </div>
          <span className="text-xs font-mono ml-3" style={{ color: 'var(--text-muted)' }}>PROFILE EDITOR</span>
        </div>

        {/* Card Content */}
        <div className="flex flex-col md:flex-row">
          {/* Left — Image */}
          <div className="md:w-2/5 relative">
            <img
              src={profileUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop'}
              alt={`${firstName}'s profile`}
              className="w-full h-64 md:h-full object-cover"
              style={{ filter: 'grayscale(30%)' }}
            />
            {/* Available badge */}
            <div className="absolute bottom-4 left-4">
              <span className="dt-badge-green font-mono text-xs px-3 py-1.5">
                AVAILABLE FOR COLLAB
              </span>
            </div>
          </div>

          {/* Right — Info */}
          <div className="md:w-3/5 p-6">
            {/* Name + Match */}
            <div className="flex items-baseline justify-between mb-1">
              <h2 className="font-mono text-2xl font-bold text-white">
                {firstName} {lastName}
                {age && <span style={{ color: 'var(--accent-cyan)' }}> , {age}</span>}
              </h2>
              <span className="font-mono text-sm font-bold" style={{ color: 'var(--accent-cyan)' }}>
                {Math.floor(Math.random() * 15) + 85}% MATCH
              </span>
            </div>

            {/* Role comment */}
            <p className="font-mono text-sm mb-5" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
              // {gender ? `${gender.charAt(0).toUpperCase() + gender.slice(1)} Developer` : 'Full Stack Developer'}
            </p>

            {/* Tech Stack */}
            {skills && skills.length > 0 && (
              <div className="mb-5">
                <p className="font-mono text-xs font-bold mb-3" style={{ color: 'var(--accent-cyan)' }}>
                  CONST STACK = [
                </p>
                <div className="grid grid-cols-2 gap-2 pl-4">
                  {skills.slice(0, 6).map((skill, i) => (
                    <div key={i} className="dt-tag text-xs font-mono">
                      <Code2 className="w-3 h-3" style={{ color: 'var(--accent-cyan)' }} />
                      {skill.trim()}
                    </div>
                  ))}
                </div>
                <p className="font-mono text-xs mt-2" style={{ color: 'var(--accent-cyan)' }}>];</p>
              </div>
            )}

            {/* Bio */}
            {about && (
              <div className="mb-5">
                <p className="font-mono text-xs mb-2" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  /** Bio */
                </p>
                <p className="font-mono text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  "{about}"
                </p>
              </div>
            )}

            {/* GitHub Contributions Heatmap */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>GITHUB_CONTRIBUTIONS</span>
                <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  {Math.floor(Math.random() * 1500) + 500} commits in 2024
                </span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {heatmapData.map((level, i) => (
                  <div key={i} className={`heatmap-square heatmap-square${level}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-5 mt-8">
        <button
          onClick={() => handleSendRequest('ignored', _id)}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff5f57'; e.currentTarget.style.color = '#ff5f57'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <X className="w-6 h-6" />
        </button>

        <button
          onClick={() => handleSendRequest('interested', _id)}
          className="px-10 py-4 rounded-full flex items-center gap-3 font-mono font-bold text-sm transition-all duration-200 cursor-pointer animate-pulse-glow"
          style={{
            background: 'var(--accent-cyan)',
            color: '#000',
            border: 'none',
          }}
        >
          <Heart className="w-5 h-5" />
          CONNECT
        </button>

        <button
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.color = 'var(--accent-cyan)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <Star className="w-6 h-6" />
        </button>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="flex items-center justify-center gap-6 mt-5">
        {[
          { key: 'ESC', label: 'Pass' },
          { key: 'ENTER', label: 'Connect' },
          { key: '/', label: 'View Profile' },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              {s.key}
            </span>
            <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;