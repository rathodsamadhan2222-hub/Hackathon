import { useState, useRef, useCallback } from 'react';

const TESTIMONIALS = [
  {
    id: 0,
    quote: 'AetherData transformed how we handle massive batch loads. What used to take hours of manual engineering now happens automatically in seconds.',
    detail: 'Pipeline throughput jumped 8× on day one — the team was speechless.',
    name: 'Sarah Kim',
    role: 'Chief Technology Officer',
    company: 'Lumara Logic',
    initials: 'SK',
    accent: '#b4c5ff',
    avatarFrom: '#2563eb',
    avatarTo: '#4f46e5',
    stars: 5,
  },
  {
    id: 1,
    quote: "The AI-powered schema evolution is a revelation. In six months our pipeline complexity dropped by 60% without a single breaking change.",
    detail: 'Zero migration headaches. The schema just… learned our patterns.',
    name: 'Marcus Flores',
    role: 'Head of Data Engineering',
    company: 'Artivio',
    initials: 'MF',
    accent: '#d0bcff',
    avatarFrom: '#571bc1',
    avatarTo: '#7c3aed',
    stars: 5,
  },
  {
    id: 2,
    quote: "Security was our top concern. AetherData's encryption layers gave our compliance team peace of mind at enterprise scale.",
    detail: 'SOC 2 audit completed in record time thanks to the immutable audit trail.',
    name: 'Olivia Rodriguez',
    role: 'Director of Security',
    company: 'DropShip',
    initials: 'OR',
    accent: '#6ee7b7',
    avatarFrom: '#065f46',
    avatarTo: '#059669',
    stars: 5,
  },
];

/* ── Verified badge SVG ── */
function VerifiedBadge({ color }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-label="Verified" style={{ flexShrink: 0 }}>
      <path
        d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        fill={`${color}18`}
      />
    </svg>
  );
}

/* ── Star row ── */
function Stars({ count, color }) {
  return (
    <div style={{ display: 'flex', gap: 3 }} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={i < count ? color : 'rgba(255,255,255,0.1)'}
          />
        </svg>
      ))}
    </div>
  );
}

/* ── Single conversation card ── */
function ConvoCard({ t, delay }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty('--mx', `${mx}%`);
      el.style.setProperty('--my', `${my}%`);
      const tx = ((e.clientX - r.left) / r.width - 0.5) * 7;
      const ty = ((e.clientY - r.top) / r.height - 0.5) * -7;
      el.style.setProperty('--tx', `${tx}deg`);
      el.style.setProperty('--ty', `${ty}deg`);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--tx', '0deg');
    el.style.setProperty('--ty', '0deg');
    setHovered(false);
  }, []);

  return (
    <figure
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="convo-card"
      style={{
        '--accent': t.accent,
        animationDelay: `${delay}ms`,
        transform: hovered
          ? 'rotateX(var(--ty,0deg)) rotateY(var(--tx,0deg)) translateY(-6px) scale(1.015)'
          : 'rotateX(0) rotateY(0) translateY(0) scale(1)',
        outline: hovered ? `1.5px solid ${t.accent}44` : '1px solid rgba(255,255,255,0.07)',
      }}
      aria-label={`Testimonial from ${t.name}`}
    >
      {/* Spotlight overlay */}
      <div className="convo-spotlight" aria-hidden="true" />

      {/* ── Top: avatar + name + verified ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>

        {/* Avatar */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div
            aria-hidden="true"
            style={{
              width: 48, height: 48, borderRadius: '50%',
              background: `linear-gradient(135deg, ${t.avatarFrom}, ${t.avatarTo})`,
              border: `2px solid ${t.accent}44`,
              boxShadow: `0 0 0 3px ${t.accent}14, 0 4px 14px rgba(0,0,0,0.4)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Geist, sans-serif', fontWeight: 700, fontSize: 15,
              color: '#fff', letterSpacing: '0.02em',
              transition: 'box-shadow 250ms ease-out',
            }}
          >
            {t.initials}
          </div>
          {/* Online dot */}
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: 1, right: 1,
            width: 10, height: 10, borderRadius: '50%',
            background: '#6ee7b7',
            border: '2px solid #131315',
            boxShadow: '0 0 6px #6ee7b780',
          }} />
        </div>

        {/* Name / role / company */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <span style={{
              fontFamily: 'Geist, sans-serif', fontWeight: 700,
              fontSize: 15, color: '#e5e1e4', letterSpacing: '-0.01em',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {t.name}
            </span>
            <VerifiedBadge color={t.accent} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#8d90a0' }}>
              {t.role}
            </span>
            <span aria-hidden="true" style={{ color: '#434655', fontSize: 10 }}>·</span>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              color: t.accent, opacity: 0.85,
              background: `${t.accent}14`,
              border: `1px solid ${t.accent}28`,
              borderRadius: 4, padding: '1px 6px',
            }}>
              {t.company}
            </span>
          </div>
        </div>

        {/* Stars top-right */}
        <div style={{ flexShrink: 0 }}>
          <Stars count={t.stars} color={t.accent} />
        </div>
      </div>

      {/* ── Chat bubble ── */}
      <blockquote style={{ margin: 0, position: 'relative' }}>
        {/* Bubble tail */}
        <div aria-hidden="true" className="bubble-tail" style={{ '--accent': t.accent }} />

        <div className="chat-bubble" style={{ '--accent': t.accent }}>
          {/* Quote mark */}
          <span aria-hidden="true" style={{
            fontFamily: 'Georgia, serif', fontSize: 52, lineHeight: 0.8,
            color: t.accent, opacity: 0.2,
            position: 'absolute', top: 12, left: 16,
            userSelect: 'none', pointerEvents: 'none',
          }}>&#8220;</span>

          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#c3c6d7',
            lineHeight: 1.75, margin: 0,
            paddingLeft: 28, position: 'relative', zIndex: 1,
          }}>
            {t.quote}
          </p>

          {/* Hover-reveal detail line */}
          <div className={`bubble-detail${hovered ? ' visible' : ''}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke={t.accent} strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: t.accent, opacity: 0.9, fontStyle: 'italic' }}>
              {t.detail}
            </span>
          </div>
        </div>
      </blockquote>

      {/* Bottom accent line */}
      <div aria-hidden="true" className="convo-bottom-line" style={{ '--accent': t.accent }} />
    </figure>
  );
}

/* ── Section ── */
export default function SocialProof() {
  return (
    <section
      id="customers"
      aria-labelledby="testimonials-heading"
      style={{ padding: '110px 0', position: 'relative', overflow: 'hidden' }}
      className="bg-mesh-dark"
    >
      {/* Floating blurred blobs */}
      <div aria-hidden="true" className="float-blob float-blob-a" style={{ width: 500, height: 500, top: '5%', right: '-8%', background: 'rgba(87,27,193,0.10)' }} />
      <div aria-hidden="true" className="float-blob float-blob-b" style={{ width: 380, height: 380, bottom: '-5%', left: '-5%', background: 'rgba(37,99,235,0.09)' }} />
      <div aria-hidden="true" className="float-blob float-blob-c" style={{ width: 220, height: 220, top: '50%', left: '40%', background: 'rgba(180,197,255,0.04)' }} />



      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div style={{ marginBottom: 64, textAlign: 'center' }} className="reveal">
          <p className="section-eyebrow">Trusted by Engineering Leaders</p>
          <h2 id="testimonials-heading" className="section-title" style={{ marginBottom: 16 }}>
            Built for Teams That Can't Afford Downtime
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Hear from the engineers, architects, and security leads who run mission-critical data flows on AetherData.
          </p>
        </div>

        {/* Conversation cards grid */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
            perspective: '1200px',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <ConvoCard key={t.id} t={t} delay={i * 120} />
          ))}
        </div>

        {/* Trust logos row */}
        <div style={{ marginTop: 80, textAlign: 'center' }} className="reveal">
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: '#434655', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28,
          }}>
            Powering data infra at
          </p>
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            {['Lumara Logic', 'Artivio', 'DropShip', 'NexaCorp', 'Veridian'].map(name => (
              <span
                key={name}
                className="trust-logo"
                style={{ fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 14, color: '#c3c6d7', letterSpacing: '-0.01em' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
