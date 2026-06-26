import { useRef, useState } from 'react';

/* ── Newsletter form — no external deps ── */
function Newsletter() {
  const inputRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | loading | done | error

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = inputRef.current?.value?.trim();
    if (!val || !val.includes('@')) { setStatus('error'); return; }
    setStatus('loading');
    // Simulate async
    setTimeout(() => { setStatus('done'); }, 900);
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Newsletter sign-up" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label htmlFor="newsletter-email" style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#8d90a0', marginBottom: 2 }}>
        Stay ahead of the data curve.
      </label>
      {status === 'done' ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 8, background: 'rgba(110,231,183,0.08)', border: '1px solid rgba(110,231,183,0.25)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6ee7b7' }}>You're on the list.</span>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            ref={inputRef}
            id="newsletter-email"
            type="email"
            placeholder="you@company.com"
            aria-invalid={status === 'error'}
            onChange={() => status === 'error' && setStatus('idle')}
            style={{
              flex: 1, minWidth: 0,
              fontFamily: 'Inter, sans-serif', fontSize: 13,
              color: '#e5e1e4',
              background: 'rgba(255,255,255,0.04)',
              border: status === 'error' ? '1px solid rgba(255,180,171,0.5)' : '1px solid rgba(255,255,255,0.10)',
              borderRadius: 8,
              padding: '9px 14px',
              outline: 'none',
              transition: 'border-color 180ms ease-out',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(180,197,255,0.35)'}
            onBlur={e => e.target.style.borderColor = status === 'error' ? 'rgba(255,180,171,0.5)' : 'rgba(255,255,255,0.10)'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              flexShrink: 0,
              fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 13,
              color: '#fff',
              background: 'linear-gradient(135deg, #2563eb 0%, #571bc1 100%)',
              border: 'none', borderRadius: 8,
              padding: '9px 18px',
              cursor: status === 'loading' ? 'wait' : 'pointer',
              transition: 'transform 180ms cubic-bezier(0.34,1.4,0.64,1), box-shadow 180ms ease-out, opacity 150ms ease-out',
              opacity: status === 'loading' ? 0.7 : 1,
              position: 'relative', overflow: 'hidden',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(37,99,235,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {status === 'loading' ? '…' : 'Subscribe'}
          </button>
        </div>
      )}
      {status === 'error' && (
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,180,171,0.9)', marginTop: -4 }}>
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}

/* ── Social icon button ── */
function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        width: 36, height: 36,
        borderRadius: 9,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#8d90a0',
        textDecoration: 'none',
        transition: 'background 180ms ease-out, border-color 180ms ease-out, color 180ms ease-out, transform 200ms cubic-bezier(0.34,1.4,0.64,1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(180,197,255,0.08)';
        e.currentTarget.style.borderColor = 'rgba(180,197,255,0.25)';
        e.currentTarget.style.color = '#b4c5ff';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
        e.currentTarget.style.color = '#8d90a0';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </a>
  );
}

/* ── Footer link ── */
function FooterLink({ href, children }) {
  return (
    <li>
      <a
        href={href}
        className="footer-link"
        style={{
          fontFamily: 'Inter, sans-serif', fontSize: 13,
          color: '#8d90a0', textDecoration: 'none',
          position: 'relative', display: 'inline-block',
          transition: 'color 180ms ease-out',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#c3c6d7'}
        onMouseLeave={e => e.currentTarget.style.color = '#8d90a0'}
      >
        {children}
      </a>
    </li>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════ */
export default function Footer() {
  return (
    <>
      {/* ── 1. STRONG CTA SECTION ── */}
      <section
        aria-labelledby="cta-heading"
        style={{ padding: '120px 32px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}
        className="bg-dark"
      >
        {/* Layered bloom */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 65% at 50% 55%, rgba(37,99,235,0.18) 0%, rgba(87,27,193,0.12) 50%, transparent 78%)', pointerEvents: 'none', zIndex: 0 }} />
        {/* Dot mesh */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none', zIndex: 0 }} />
        {/* Floating blobs */}
        <div aria-hidden="true" className="float-blob float-blob-a" style={{ width: 500, height: 500, top: '-25%', left: '-8%',  background: 'rgba(37,99,235,0.09)'  }} />
        <div aria-hidden="true" className="float-blob float-blob-b" style={{ width: 420, height: 420, bottom: '-20%', right: '-6%', background: 'rgba(87,27,193,0.09)'  }} />
        <div aria-hidden="true" className="float-blob float-blob-c" style={{ width: 260, height: 260, top: '20%', right: '22%', background: 'rgba(180,197,255,0.04)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
          {/* Eyebrow */}
          <div className="chip chip-violet" style={{ marginBottom: 28, display: 'inline-flex' }}>
            <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: '#d0bcff', display: 'inline-block' }} />
            Ready to Scale?
          </div>

          {/* Hero headline */}
          <h2
            id="cta-heading"
            style={{
              fontFamily: 'Geist, sans-serif', fontWeight: 700,
              fontSize: 'clamp(36px, 6vw, 72px)',
              lineHeight: 1.04, letterSpacing: '-0.04em',
              color: '#e5e1e4', marginBottom: 20,
            }}
          >
            Scale Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #b4c5ff 0%, #d0bcff 55%, #f9a8d4 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Intelligence
            </span>
            .
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#8d90a0', lineHeight: 1.65, marginBottom: 44,
            maxWidth: 540, margin: '0 auto 44px',
          }}>
            Join 1,000+ engineering teams who trust AetherData to move their most critical data — at any scale.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
            <a href="#pricing" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px', borderRadius: 10 }}>
              Start for Free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z" clipRule="evenodd"/>
              </svg>
            </a>
            <a href="#" className="btn-ghost" style={{ fontSize: 16, padding: '14px 32px', borderRadius: 10 }}>
              Schedule a Demo
            </a>
          </div>

          {/* Trust strip */}
          <div style={{ display: 'flex', gap: 28, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: '🔒', text: 'SOC 2 Type II' },
              { icon: '⚡', text: '99.99% SLA' },
              { icon: '🌐', text: '80+ regions' },
              { icon: '🤖', text: 'AI-native' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span aria-hidden="true" style={{ fontSize: 14 }}>{icon}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#434655', letterSpacing: '0.04em' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. FOOTER BODY ── */}
      <footer
        role="contentinfo"
        style={{ background: '#05050a', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}
      >
        {/* Subtle top gradient echo */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(37,99,235,0.06) 0%, transparent 100%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 32px 0', position: 'relative', zIndex: 1 }}>

          {/* ── Top row: Brand + Newsletter ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 64, marginBottom: 72, alignItems: 'start' }} className="footer-top-grid">

            {/* Brand block */}
            <div>
              {/* Logo lockup */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <rect width="28" height="28" rx="8" fill="url(#ftrGrad)" />
                  <path d="M14 6L20 10V18L14 22L8 18V10L14 6Z" stroke="white" strokeWidth="1.5" fill="none" opacity="0.9"/>
                  <circle cx="14" cy="14" r="3" fill="white" opacity="0.8"/>
                  <defs>
                    <linearGradient id="ftrGrad" x1="0" y1="0" x2="28" y2="28">
                      <stop stopColor="#2563eb"/><stop offset="1" stopColor="#571bc1"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 700, fontSize: 18, color: '#e5e1e4', letterSpacing: '-0.02em' }}>
                  AetherData AI
                </span>
              </div>

              {/* Large brand statement */}
              <p style={{
                fontFamily: 'Geist, sans-serif', fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 52px)',
                lineHeight: 1.08, letterSpacing: '-0.035em',
                color: 'rgba(229,225,228,0.12)',
                marginBottom: 20,
                userSelect: 'none',
              }} aria-hidden="true">
                AetherData.
              </p>

              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#8d90a0', lineHeight: 1.65, maxWidth: 280, marginBottom: 24 }}>
                The operating layer for intelligent, autonomous data infrastructure.
              </p>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: 8 }}>
                <SocialIcon href="#" label="GitHub">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </SocialIcon>
                <SocialIcon href="#" label="Twitter / X">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </SocialIcon>
                <SocialIcon href="#" label="LinkedIn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </SocialIcon>
              </div>
            </div>

            {/* Newsletter block */}
            <div style={{ minWidth: 280, maxWidth: 340 }}>
              <p style={{ fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 14, color: '#e5e1e4', marginBottom: 6, letterSpacing: '-0.01em' }}>
                The Intelligence Brief
              </p>
              <Newsletter />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#434655', marginTop: 10, lineHeight: 1.5 }}>
                Weekly insights on AI data engineering. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* ── Divider ── */}
          <div aria-hidden="true" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent)', marginBottom: 48 }} />

          {/* ── Link columns ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '32px 40px', marginBottom: 64 }}>
            {[
              {
                heading: 'Product',
                links: [
                  { label: 'Platform', href: '#platform' },
                  { label: 'Workflows', href: '#workflows' },
                  { label: 'Pricing', href: '#pricing' },
                  { label: 'Changelog', href: '#' },
                ],
              },
              {
                heading: 'Developers',
                links: [
                  { label: 'Documentation', href: '#' },
                  { label: 'API Reference', href: '#' },
                  { label: 'SDK', href: '#' },
                  { label: 'Status', href: '#' },
                ],
              },
              {
                heading: 'Company',
                links: [
                  { label: 'About', href: '#' },
                  { label: 'Blog', href: '#' },
                  { label: 'Careers', href: '#' },
                  { label: 'Press', href: '#' },
                ],
              },
              {
                heading: 'Legal',
                links: [
                  { label: 'Privacy', href: '#' },
                  { label: 'Terms', href: '#' },
                  { label: 'Security', href: '#' },
                  { label: 'GDPR', href: '#' },
                ],
              },
            ].map(col => (
              <nav key={col.heading} aria-label={`${col.heading} links`}>
                <p style={{
                  fontFamily: 'JetBrains Mono, monospace', fontWeight: 500,
                  fontSize: 10, color: '#434655',
                  letterSpacing: '0.10em', textTransform: 'uppercase',
                  marginBottom: 16,
                }}>{col.heading}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {col.links.map(({ label, href }) => (
                    <FooterLink key={label} href={href}>{label}</FooterLink>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* ── Bottom bar ── */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: 28, paddingBottom: 40,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 16,
          }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#2e2e38', letterSpacing: '0.01em' }}>
              © 2026 AetherData Systems, Inc. All rights reserved.
            </p>

            {/* System status pill */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: 'rgba(34,197,94,0.06)',
              border: '1px solid rgba(34,197,94,0.18)',
              borderRadius: 9999,
              padding: '5px 12px',
            }}>
              <span
                aria-hidden="true"
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 6px rgba(34,197,94,0.8)',
                  display: 'inline-block',
                  animation: 'status-pulse 2s ease-in-out infinite',
                }}
              />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(34,197,94,0.7)', letterSpacing: '0.06em' }}>
                All systems operational
              </span>
            </div>
          </div>
        </div>

        {/* ── Apple-style large ghost brand name ── */}
        <div aria-hidden="true" style={{
          overflow: 'hidden',
          textAlign: 'center',
          paddingBottom: 0,
          marginTop: -20,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: 'Geist, sans-serif', fontWeight: 800,
            fontSize: 'clamp(64px, 14vw, 180px)',
            lineHeight: 0.88,
            letterSpacing: '-0.06em',
            background: 'linear-gradient(180deg, rgba(229,225,228,0.04) 0%, rgba(229,225,228,0.01) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'block',
          }}>
            AetherData
          </span>
        </div>
      </footer>
    </>
  );
}
