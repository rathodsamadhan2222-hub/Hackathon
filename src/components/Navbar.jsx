import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      role="banner"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(14,14,16,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px) saturate(1.4)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'background 280ms cubic-bezier(0.4,0,0.2,1), border-color 280ms cubic-bezier(0.4,0,0.2,1), backdrop-filter 280ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <a href="/" aria-label="AetherData AI home" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect width="28" height="28" rx="8" fill="url(#logoGrad)" />
            <path d="M14 6L20 10V18L14 22L8 18V10L14 6Z" stroke="white" strokeWidth="1.5" fill="none" opacity="0.9"/>
            <circle cx="14" cy="14" r="3" fill="white" opacity="0.8"/>
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28">
                <stop stopColor="#2563eb"/>
                <stop offset="1" stopColor="#571bc1"/>
              </linearGradient>
            </defs>
          </svg>
          <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 700, fontSize: 16, color: '#e5e1e4', letterSpacing: '-0.02em' }}>AetherData AI</span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hidden md:flex">
          {['Platform', 'Workflows', 'Pricing', 'Docs'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">
              {link}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }} className="hidden md:flex">
          <a href="#" className="btn-ghost" style={{ fontSize: 13, padding: '7px 16px' }}>Log in</a>
          <a href="#pricing" className="btn-primary" style={{ fontSize: 13, padding: '7px 16px' }}>Get Started</a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e5e1e4', padding: 8 }}
          className="flex md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen
              ? <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
              : <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav aria-label="Mobile navigation" style={{ background: 'rgba(14,14,16,0.95)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {['Platform', 'Workflows', 'Pricing', 'Docs'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#c3c6d7', textDecoration: 'none' }}
            >{link}</a>
          ))}
          <a href="#pricing" className="btn-primary" style={{ marginTop: 8 }}>Get Started</a>
        </nav>
      )}
    </header>
  );
}
