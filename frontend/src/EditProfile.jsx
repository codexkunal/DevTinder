import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import {
  Save, Camera, User, FileText, Calendar, Users,
  MapPin, Briefcase, Github, Linkedin, Globe,
  Plus, X, Code2, Trash2, ChevronDown, ChevronUp
} from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditProfile = ({ user }) => {
  // Basic fields
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [profileUrl, setProfileUrl] = useState(user.profileUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");

  // New extended fields
  const [title, setTitle] = useState(user.title || "");
  const [location, setLocation] = useState(user.location || "");
  const [github, setGithub] = useState(user.github || "");
  const [linkedin, setLinkedin] = useState(user.linkedin || "");
  const [portfolio, setPortfolio] = useState(user.portfolio || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [interests, setInterests] = useState(user.interests || []);
  const [languages, setLanguages] = useState(user.languages || []);
  const [projects, setProjects] = useState(user.projects || []);

  // UI state
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedSection, setExpandedSection] = useState("basic");

  // Temp input state
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newLangName, setNewLangName] = useState("");
  const [newLangProf, setNewLangProf] = useState(50);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    setSaving(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName, lastName, profileUrl, age: age ? Number(age) : undefined,
          gender, about, title, location, github, linkedin, portfolio,
          skills, interests, languages, projects,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  // --- Helpers for array fields ---
  const addSkill = () => {
    if (newSkill.trim() && skills.length < 10) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  const removeSkill = (i) => setSkills(skills.filter((_, idx) => idx !== i));

  const addInterest = () => {
    if (newInterest.trim() && interests.length < 10) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };
  const removeInterest = (i) => setInterests(interests.filter((_, idx) => idx !== i));

  const addLanguage = () => {
    if (newLangName.trim() && languages.length < 10) {
      setLanguages([...languages, { name: newLangName.trim(), proficiency: Number(newLangProf) }]);
      setNewLangName("");
      setNewLangProf(50);
    }
  };
  const removeLanguage = (i) => setLanguages(languages.filter((_, idx) => idx !== i));
  const updateLanguageProf = (i, val) => {
    const updated = [...languages];
    updated[i] = { ...updated[i], proficiency: Number(val) };
    setLanguages(updated);
  };

  const addProject = () => {
    if (projects.length < 10) {
      setProjects([...projects, { name: "", description: "", imageUrl: "", repoUrl: "", stars: 0, forks: 0, tag: "" }]);
    }
  };
  const removeProject = (i) => setProjects(projects.filter((_, idx) => idx !== i));
  const updateProject = (i, field, value) => {
    const updated = [...projects];
    updated[i] = { ...updated[i], [field]: value };
    setProjects(updated);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  // eslint-disable-next-line no-unused-vars
  const SectionHeader = ({ id, icon: Icon, title, count }) => (
    <button
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between py-3 px-1 border-none bg-transparent cursor-pointer"
      style={{ borderBottom: '1px solid var(--border-color)' }}
    >
      <span className="flex items-center gap-2 text-sm font-semibold text-white">
        <Icon className="w-4 h-4" style={{ color: 'var(--accent-cyan)' }} />
        {title}
        {count !== undefined && (
          <span className="text-xs font-mono px-1.5 py-0.5 rounded"
            style={{ background: 'var(--accent-cyan-dim)', color: 'var(--accent-cyan)' }}>
            {count}
          </span>
        )}
      </span>
      {expandedSection === id
        ? <ChevronUp className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
        : <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
      }
    </button>
  );

  // eslint-disable-next-line no-unused-vars
  const InputField = ({ label, icon: Icon, value, onChange, type = "text", placeholder = "" }) => (
    <div>
      <label className="block text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
          className="dt-input pl-9 text-sm py-2" placeholder={placeholder} />
      </div>
    </div>
  );

  return (
    <>
      <div className="dt-card overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid var(--border-color)' }}>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="font-mono" style={{ color: 'var(--accent-cyan)' }}>{'//'}</span> Edit Profile
          </h3>
          <button onClick={saveProfile} disabled={saving}
            className="dt-btn-primary text-xs px-4 py-2" style={{ opacity: saving ? 0.6 : 1 }}>
            <Save className="w-3.5 h-3.5" /> {saving ? "Saving..." : "Save All"}
          </button>
        </div>

        <div className="px-5 py-3">
          {error && (
            <div className="mb-3 p-2.5 rounded-lg text-xs"
              style={{ background: 'rgba(255,95,87,0.1)', border: '1px solid rgba(255,95,87,0.3)', color: '#ff5f57' }}>
              {typeof error === 'string' ? error : 'An error occurred'}
            </div>
          )}

          {/* ===== BASIC INFO ===== */}
          <SectionHeader id="basic" icon={User} title="Basic Info" />
          {expandedSection === "basic" && (
            <div className="py-3 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <InputField label="FIRST_NAME" icon={User} value={firstName} onChange={setFirstName} />
                <InputField label="LAST_NAME" icon={User} value={lastName} onChange={setLastName} />
              </div>
              <InputField label="TITLE" icon={Briefcase} value={title} onChange={setTitle} placeholder="e.g. Senior Full Stack Engineer" />
              <InputField label="LOCATION" icon={MapPin} value={location} onChange={setLocation} placeholder="e.g. San Francisco, CA" />
              <InputField label="PHOTO_URL" icon={Camera} value={profileUrl} onChange={setProfileUrl} placeholder="https://..." />
              <div className="grid grid-cols-2 gap-3">
                <InputField label="AGE" icon={Calendar} value={age} onChange={setAge} type="number" />
                <div>
                  <label className="block text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>GENDER</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)}
                    className="dt-input text-sm py-2 cursor-pointer">
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>ABOUT</label>
                <textarea value={about} onChange={(e) => setAbout(e.target.value)}
                  className="dt-input text-sm py-2 resize-none" rows={3} maxLength={500}
                  placeholder="Tell others about yourself..." />
                <span className="text-xs font-mono block text-right mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {about.length}/500
                </span>
              </div>
            </div>
          )}

          {/* ===== LINKS ===== */}
          <SectionHeader id="links" icon={Globe} title="Links" />
          {expandedSection === "links" && (
            <div className="py-3 space-y-3">
              <InputField label="GITHUB" icon={Github} value={github} onChange={setGithub} placeholder="https://github.com/username" />
              <InputField label="LINKEDIN" icon={Linkedin} value={linkedin} onChange={setLinkedin} placeholder="https://linkedin.com/in/username" />
              <InputField label="PORTFOLIO" icon={Globe} value={portfolio} onChange={setPortfolio} placeholder="https://yoursite.dev" />
            </div>
          )}

          {/* ===== SKILLS ===== */}
          <SectionHeader id="skills" icon={Code2} title="Skills" count={skills.length} />
          {expandedSection === "skills" && (
            <div className="py-3">
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map((skill, i) => (
                  <span key={i} className="dt-tag text-xs group">
                    {skill}
                    <button onClick={() => removeSkill(i)} className="bg-transparent border-none cursor-pointer p-0 ml-1"
                      style={{ color: 'var(--text-muted)' }}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  className="dt-input text-sm py-2 flex-1" placeholder="Add a skill (e.g. React)" />
                <button onClick={addSkill} className="dt-btn-primary text-xs px-3 py-2">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs font-mono mt-1" style={{ color: 'var(--text-muted)' }}>
                {skills.length}/10 skills
              </p>
            </div>
          )}

          {/* ===== INTERESTS ===== */}
          <SectionHeader id="interests" icon={Users} title="Interests" count={interests.length} />
          {expandedSection === "interests" && (
            <div className="py-3">
              <div className="flex flex-wrap gap-2 mb-3">
                {interests.map((interest, i) => (
                  <span key={i} className="dt-badge-cyan text-xs flex items-center gap-1">
                    {interest}
                    <button onClick={() => removeInterest(i)} className="bg-transparent border-none cursor-pointer p-0"
                      style={{ color: 'var(--accent-cyan)' }}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={newInterest} onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                  className="dt-input text-sm py-2 flex-1" placeholder="Add interest (e.g. AI/ML)" />
                <button onClick={addInterest} className="dt-btn-primary text-xs px-3 py-2">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ===== PROGRAMMING LANGUAGES ===== */}
          <SectionHeader id="languages" icon={Code2} title="Programming Languages" count={languages.length} />
          {expandedSection === "languages" && (
            <div className="py-3 space-y-3">
              {languages.map((lang, i) => (
                <div key={i} className="p-3 rounded-lg flex items-center gap-3"
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{lang.name}</span>
                      <span className="font-mono text-xs" style={{ color: 'var(--accent-cyan)' }}>{lang.proficiency}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={lang.proficiency}
                      onChange={(e) => updateLanguageProf(i, e.target.value)}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                      style={{ background: `linear-gradient(to right, var(--accent-cyan) ${lang.proficiency}%, var(--border-color) ${lang.proficiency}%)` }}
                    />
                  </div>
                  <button onClick={() => removeLanguage(i)} className="dt-btn-ghost p-1.5 rounded"
                    style={{ color: '#ff5f57' }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>LANGUAGE</label>
                  <input value={newLangName} onChange={(e) => setNewLangName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                    className="dt-input text-sm py-2" placeholder="e.g. TypeScript" />
                </div>
                <div className="w-20">
                  <label className="block text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>PROF %</label>
                  <input type="number" min="0" max="100" value={newLangProf}
                    onChange={(e) => setNewLangProf(e.target.value)}
                    className="dt-input text-sm py-2 text-center" />
                </div>
                <button onClick={addLanguage} className="dt-btn-primary text-xs px-3 py-2 mb-0.5">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ===== PROJECTS ===== */}
          <SectionHeader id="projects" icon={Briefcase} title="Projects" count={projects.length} />
          {expandedSection === "projects" && (
            <div className="py-3 space-y-4">
              {projects.map((project, i) => (
                <div key={i} className="p-4 rounded-xl relative"
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                  <button onClick={() => removeProject(i)}
                    className="absolute top-3 right-3 dt-btn-ghost p-1.5 rounded" style={{ color: '#ff5f57' }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="space-y-2.5 pr-8">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>NAME</label>
                        <input value={project.name} onChange={(e) => updateProject(i, 'name', e.target.value)}
                          className="dt-input text-sm py-1.5" placeholder="Project name" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>TAG</label>
                        <input value={project.tag} onChange={(e) => updateProject(i, 'tag', e.target.value)}
                          className="dt-input text-sm py-1.5" placeholder="e.g. React" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>DESCRIPTION</label>
                      <input value={project.description} onChange={(e) => updateProject(i, 'description', e.target.value)}
                        className="dt-input text-sm py-1.5" placeholder="Short description" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>IMAGE_URL</label>
                        <input value={project.imageUrl} onChange={(e) => updateProject(i, 'imageUrl', e.target.value)}
                          className="dt-input text-sm py-1.5" placeholder="https://..." />
                      </div>
                      <div>
                        <label className="block text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>REPO_URL</label>
                        <input value={project.repoUrl} onChange={(e) => updateProject(i, 'repoUrl', e.target.value)}
                          className="dt-input text-sm py-1.5" placeholder="https://github.com/..." />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>STARS</label>
                        <input type="number" min="0" value={project.stars}
                          onChange={(e) => updateProject(i, 'stars', Number(e.target.value))}
                          className="dt-input text-sm py-1.5" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono mb-1" style={{ color: 'var(--text-muted)' }}>FORKS</label>
                        <input type="number" min="0" value={project.forks}
                          onChange={(e) => updateProject(i, 'forks', Number(e.target.value))}
                          className="dt-input text-sm py-1.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={addProject}
                className="w-full py-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200"
                style={{ border: '1px dashed var(--border-color)', background: 'transparent', color: 'var(--text-muted)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.color = 'var(--accent-cyan)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-up">
          <div className="px-4 py-3 rounded-xl text-sm font-medium"
            style={{ background: 'var(--accent-green-dim)', border: '1px solid rgba(0,230,118,0.3)', color: 'var(--accent-green)' }}>
            ✓ Profile saved successfully
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;