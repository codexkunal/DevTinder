import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "./utils/userSlice";
import { Eye, EyeOff, Code2, Mail, Lock, User, ArrowRight } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Login failed. Please try again.");
    }
  };

  const handleSignup = async () => {
    setError("");
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden"
        style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>

        {/* Left side — Code Panel */}
        <div className="hidden md:flex w-1/2 flex-col relative" style={{ background: 'var(--bg-primary)' }}>
          {/* IDE Header */}
          <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <div className="ide-dots-row">
              <span className="ide-dot ide-dot--red"></span>
              <span className="ide-dot ide-dot--yellow"></span>
              <span className="ide-dot ide-dot--green"></span>
            </div>
            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>welcome.jsx</span>
          </div>

          {/* Code Content */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            <div className="font-mono text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              <div><span className="syn-keyword">import</span> <span className="syn-type">{'{ Developer }'}</span> <span className="syn-keyword">from</span> <span className="syn-string">"devtinder"</span>;</div>
              <div className="mt-3"><span className="syn-keyword">const</span> <span className="syn-property">welcome</span> = () =&gt; {'{'}</div>
              <div className="pl-5"><span className="syn-keyword">return</span> (</div>
              <div className="pl-10"><span className="syn-bracket">&lt;</span><span className="syn-type">Developer</span></div>
              <div className="pl-14"><span className="syn-property">passion</span>=<span className="syn-string">"infinite"</span></div>
              <div className="pl-14"><span className="syn-property">coffee</span>=<span className="syn-string">"required"</span></div>
              <div className="pl-10"><span className="syn-bracket">/&gt;</span></div>
              <div className="pl-5">);</div>
              <div>{'}'}</div>
            </div>

            {/* Branding */}
            <div className="mt-auto">
              <div className="flex items-center gap-3 mb-3">
                <Code2 className="w-10 h-10" style={{ color: 'var(--accent-cyan)' }} />
                <span className="text-2xl font-bold text-white">DevTinder</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Connect with developers who share your passion for code
              </p>
            </div>
          </div>
        </div>

        {/* Right side — Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-10">
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center gap-2 mb-6">
            <Code2 className="w-7 h-7" style={{ color: 'var(--accent-cyan)' }} />
            <span className="text-xl font-bold text-white">DevTinder</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isLoginForm ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {isLoginForm ? "Join the developer community" : "Login to your account"}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: 'rgba(255,95,87,0.1)', border: '1px solid rgba(255,95,87,0.3)', color: '#ff5f57' }}>
              {typeof error === 'string' ? error : 'An error occurred'}
            </div>
          )}

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {isLoginForm && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5 font-mono" style={{ color: 'var(--text-muted)' }}>
                    FIRST_NAME
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                    <input
                      type="text" value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="dt-input pl-10 text-sm" placeholder="John"
                      autoComplete="given-name" required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 font-mono" style={{ color: 'var(--text-muted)' }}>
                    LAST_NAME
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                    <input
                      type="text" value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="dt-input pl-10 text-sm" placeholder="Doe"
                      autoComplete="family-name" required
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium mb-1.5 font-mono" style={{ color: 'var(--text-muted)' }}>
                EMAIL
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="email" value={email}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="dt-input pl-10 text-sm" placeholder="dev@example.com"
                  autoComplete="email" required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 font-mono" style={{ color: 'var(--text-muted)' }}>
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="dt-input pl-10 pr-10 text-sm" placeholder="••••••••"
                  autoComplete={isLoginForm ? "new-password" : "current-password"} required
                />
                <button type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                  style={{ color: 'var(--text-muted)' }}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              onClick={isLoginForm ? handleSignup : handleLogin}
              className="dt-btn-primary w-full py-3 text-sm mt-2"
            >
              {isLoginForm ? "Create Account" : "Sign In"}
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center mt-4">
              <button
                onClick={() => { setIsLoginForm(!isLoginForm); setError(""); }}
                className="text-sm bg-transparent border-none cursor-pointer"
                style={{ color: 'var(--accent-cyan)' }}
              >
                {isLoginForm
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
