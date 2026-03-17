import React from 'react';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';
import { Code2, MapPin, Globe, Linkedin, Mail, Send, Briefcase, ExternalLink, GitFork, Star } from 'lucide-react';

// Circular Progress Ring component
const ProgressRing = ({ percentage, label, size = 80, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="progress-ring">
        <circle
          stroke="var(--border-color)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="progress-ring-circle"
          stroke="var(--accent-cyan)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <text
          x="50%" y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill="var(--text-primary)"
          fontSize="14"
          fontWeight="bold"
          fontFamily="'Space Grotesk', sans-serif"
          transform={`rotate(90, ${size / 2}, ${size / 2})`}
        >
          {percentage}%
        </text>
      </svg>
      <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  );
};

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) return null;

  const {
    firstName, lastName, email, profileUrl, title, location,
    github, linkedin, portfolio, interests, languages, projects, about
  } = user;

  const hasLinks = github || linkedin || portfolio;
  const hasLanguages = languages && languages.length > 0;
  const hasProjects = projects && projects.length > 0;
  const hasInterests = interests && interests.length > 0;

  return (
    <div className="min-h-screen py-8 px-4 lg:px-8" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[320px_1fr] gap-8">

        {/* ===== LEFT SIDEBAR ===== */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="dt-card p-6 text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4"
              style={{ border: '3px solid var(--accent-cyan)' }}>
              <img
                src={profileUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'}
                alt={firstName}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-white">{firstName} {lastName}</h2>
            {title && (
              <p className="text-sm font-medium mt-1" style={{ color: 'var(--accent-cyan)' }}>{title}</p>
            )}
            {location && (
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                <MapPin className="w-3 h-3 inline mr-1" />{location}
              </p>
            )}
            {about && (
              <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{about}</p>
            )}
          </div>

          {/* Contact Links */}
          {(email || hasLinks) && (
            <div className="dt-card overflow-hidden">
              {email && (
                <div className="p-3 flex items-center gap-3"
                  style={{ background: 'var(--accent-cyan-dim)', borderBottom: '1px solid var(--border-color)' }}>
                  <Mail className="w-4 h-4" style={{ color: 'var(--accent-cyan)' }} />
                  <span className="text-sm" style={{ color: 'var(--accent-cyan)' }}>{email}</span>
                </div>
              )}
              {github && (
                <a href={github.startsWith('http') ? github : `https://${github}`} target="_blank" rel="noopener noreferrer"
                  className="p-3 flex items-center gap-3 no-underline transition-colors duration-200"
                  style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <Code2 className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-sm flex-1 truncate">{github}</span>
                  <ExternalLink className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                </a>
              )}
              {linkedin && (
                <a href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`} target="_blank" rel="noopener noreferrer"
                  className="p-3 flex items-center gap-3 no-underline transition-colors duration-200"
                  style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <Linkedin className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-sm flex-1 truncate">{linkedin}</span>
                  <ExternalLink className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                </a>
              )}
              {portfolio && (
                <a href={portfolio.startsWith('http') ? portfolio : `https://${portfolio}`} target="_blank" rel="noopener noreferrer"
                  className="p-3 flex items-center gap-3 no-underline transition-colors duration-200"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <Globe className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-sm flex-1 truncate">{portfolio}</span>
                  <ExternalLink className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                </a>
              )}
            </div>
          )}

          {/* Interests */}
          {hasInterests && (
            <div className="dt-card p-5">
              <h3 className="text-sm font-bold text-white mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, i) => (
                  <span key={i} className="dt-badge-cyan font-mono text-xs">{interest}</span>
                ))}
              </div>
            </div>
          )}

          {/* Edit Profile */}
          <EditProfile user={user} />
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="space-y-8">

          {/* Top Languages */}
          {hasLanguages && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="font-mono" style={{ color: 'var(--accent-cyan)' }}>{'[ ]'}</span> Top Languages
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {languages.map((lang, i) => (
                  <div key={i} className="dt-card p-5 flex flex-col items-center">
                    <ProgressRing percentage={lang.proficiency} label={lang.name} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {hasProjects && (
            <div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} /> Projects
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((project, i) => (
                  <div key={i} className="dt-card overflow-hidden">
                    {project.imageUrl && (
                      <img src={project.imageUrl} alt={project.name} className="w-full h-36 object-cover" />
                    )}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">{project.name}</h3>
                        {project.repoUrl && (
                          <a href={project.repoUrl.startsWith('http') ? project.repoUrl : `https://${project.repoUrl}`}
                            target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                          </a>
                        )}
                      </div>
                      {project.description && (
                        <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
                      )}
                      <div className="flex items-center gap-3">
                        {project.stars > 0 && (
                          <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                            <Star className="w-3 h-3" /> {project.stars}
                          </span>
                        )}
                        {project.forks > 0 && (
                          <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                            <GitFork className="w-3 h-3" /> {project.forks}
                          </span>
                        )}
                        {project.tag && (
                          <span className="dt-badge-cyan text-xs ml-auto">{project.tag}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!hasLanguages && !hasProjects && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'var(--accent-cyan-dim)' }}>
                <Code2 className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Complete Your Profile</h3>
              <p className="text-sm max-w-sm" style={{ color: 'var(--text-muted)' }}>
                Add your programming languages, projects, and interests using the edit panel on the left to make your profile shine!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;