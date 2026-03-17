import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ArrowRight, Users, Heart, Zap, Terminal, GitBranch, ChevronRight, Star } from 'lucide-react';

const Landing = () => {
  return (
    <div style={{ background: 'var(--bg-primary)' }} className="min-h-screen">

      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-6">
                <span className="dt-badge-cyan font-mono text-xs">v2.0 BETA</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>• Join 500+ devs</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Find your perfect{' '}
                <span style={{ color: 'var(--accent-cyan)' }} className="glow-cyan-text">coding</span>{' '}
                match
              </h1>

              <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)', maxWidth: '480px' }}>
                The ultimate networking platform for developers. Swipe, connect, and collaborate on your next big project with tech-minded peers.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/login" className="dt-btn-primary text-base px-8 py-3 no-underline">
                  Join Now
                </Link>
                <button className="dt-btn-outline text-base px-8 py-3">
                  View Demo
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
                    'https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=40&h=40&fit=crop',
                  ].map((src, i) => (
                    <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 object-cover"
                      style={{ borderColor: 'var(--bg-primary)' }} />
                  ))}
                </div>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <strong className="text-white">500+</strong> developers joined today
                </span>
              </div>
            </div>

            {/* Right — Code Card */}
            <div className="hidden lg:block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="code-block animate-float" style={{ maxWidth: '440px', marginLeft: 'auto' }}>
                <div className="code-block-header">
                  <div className="ide-dots-row">
                    <span className="ide-dot ide-dot--red"></span>
                    <span className="ide-dot ide-dot--yellow"></span>
                    <span className="ide-dot ide-dot--green"></span>
                  </div>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>developer_match.js</span>
                </div>
                <div className="code-block-body">
                  <div><span className="syn-keyword">const</span> <span className="syn-property">developer</span> <span className="syn-bracket">=</span> <span className="syn-bracket">{'{'}</span></div>
                  <div style={{ paddingLeft: '20px' }}><span className="syn-property">name</span>: <span className="syn-string">"You"</span>,</div>
                  <div style={{ paddingLeft: '20px' }}><span className="syn-property">stack</span>: [<span className="syn-string">"React"</span>, <span className="syn-string">"Node"</span>, <span className="syn-string">"Rust"</span>],</div>
                  <div style={{ paddingLeft: '20px' }}><span className="syn-property">seeking</span>: <span className="syn-string">"project_partner"</span>,</div>
                  <div><span className="syn-bracket">{'}'}</span>;</div>
                  <div className="mt-4"><span className="syn-comment">// Looking for a match...</span></div>
                </div>
                {/* Swipe buttons */}
                <div className="flex items-center justify-center gap-4 py-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                  <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,95,87,0.15)', color: '#ff5f57', border: '1px solid rgba(255,95,87,0.3)' }}>✕</button>
                  <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-cyan-dim)', color: 'var(--accent-cyan)', border: '1px solid rgba(13,185,242,0.3)' }}>♥</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'Active Developers', value: '50k+', sub: '+49% this month', icon: Users },
              { label: 'Successful Matches', value: '120k+', sub: '+89% this month', icon: Heart },
              { label: 'Projects Launched', value: '15k+', sub: '+100 this month', icon: Zap },
            ].map((stat, i) => (
              <div key={i} className="dt-card p-6 text-center">
                <p className="text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                <p className="text-4xl font-bold mb-2 text-white">{stat.value}</p>
                <p className="text-xs flex items-center justify-center gap-1" style={{ color: 'var(--accent-green)' }}>
                  <ArrowRight className="w-3 h-3 rotate-[-45deg]" /> {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROCESS SECTION ========== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="section-label mb-3">THE PROCESS</p>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
            Networking built for the terminal generation
          </h2>
          <p className="mb-14 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            We've optimized the connection process so you can spend less time searching and more time enjoying code.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Terminal, num: '01', title: 'Create Profile',
                desc: 'Import your GitHub repos and select preferences to showcase your skills automatically.'
              },
              {
                icon: GitBranch, num: '02', title: 'Swipe & Match',
                desc: 'Our algorithm finds compatible partners based on language compatibility and coding style.'
              },
              {
                icon: Code2, num: '03', title: 'Start Coding',
                desc: "Start a real DM or email directly, to start building something amazing together."
              },
            ].map((step, i) => (
              <div key={i} className="dt-card p-8 text-left relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--accent-cyan-dim)', color: 'var(--accent-cyan)' }}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-3xl font-bold" style={{ color: 'var(--border-color)' }}>{step.num}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SUCCESS STORIES ========== */}
      <section style={{ background: 'var(--bg-secondary)' }} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-3">SUCCESS STORIES</p>
              <h2 className="text-3xl font-bold mb-8 text-white">From matches to unicorns</h2>
              <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                Real developers found their co-founders and project partners here. Join thousands of successful collaborations.
              </p>

              {/* Testimonials */}
              <div className="space-y-6">
                {[
                  {
                    quote: '"Finding my co-founder for SailFlow on DevTinder was magical. We matched because we both loved the same OSS frameworks!"',
                    name: 'Alex L., CTO of SailFlow',
                  },
                  {
                    quote: '"The language filter is a lifesaver. Found three Go developers to help me launch my microservices project in a week."',
                    name: 'Sarah M., Independent Developer',
                  },
                ].map((t, i) => (
                  <div key={i} className="dt-card p-5">
                    <p className="text-sm mb-3 italic" style={{ color: 'var(--text-secondary)' }}>{t.quote}</p>
                    <p className="text-xs font-semibold" style={{ color: 'var(--accent-cyan)' }}>— {t.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right image panel */}
            <div className="hidden lg:block">
              <div className="dt-card overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="Developers collaborating"
                  className="w-full h-80 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">The Nebula Project</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        Founded via DevTinder ★ 8.2k
                      </p>
                    </div>
                    <Star className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="dt-card p-12 lg:p-16" style={{ background: 'linear-gradient(135deg, #0d1b24 0%, #0B1114 100%)' }}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
              Ready to build something legendary?
            </h2>
            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
              Stop solo-coding and start collaborating. Your next co-founder is just a swipe away.
            </p>
            <Link to="/login" className="dt-btn-primary text-base px-10 py-3.5 no-underline">
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* ========== LANDING FOOTER ========== */}
      <footer style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
                <span className="font-bold text-white">DevTinder</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Connecting the world's developers through meaningful collaboration.
              </p>
            </div>
            {[
              { heading: 'Product', links: ['Explore', 'Algorithm', 'Integrations', 'Pricing'] },
              { heading: 'Company', links: ['About Us', 'Careers', 'Blog', 'Press'] },
              { heading: 'Social', links: ['GitHub', 'Twitter', 'Discord'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-sm font-semibold text-white mb-3">{col.heading}</h4>
                <ul className="space-y-2 list-none p-0 m-0">
                  {col.links.map((l, j) => (
                    <li key={j}>
                      <a href="#" className="text-xs no-underline transition-colors duration-200"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-cyan)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-6"
            style={{ borderTop: '1px solid var(--border-color)' }}>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              © 2024 DevTinder Inc. Built for the terminal generation.
            </p>
            <div className="flex gap-4 mt-3 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l, i) => (
                <a key={i} href="#" className="text-xs no-underline" style={{ color: 'var(--text-muted)' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
