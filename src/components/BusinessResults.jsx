/* ── Business Results Section ─────────────────────
   The "proof" moment. Hard numbers, named results,
   and a quote bridge into Pricing.
──────────────────────────────────────────────── */

const RESULTS = [
  {
    id: 'latency',
    metric: '97%',
    label: 'Latency Reduction',
    sub: 'From 4.2h batch delays to 40ms average delivery',
    accent: '#2563eb',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    id: 'cost',
    metric: '40%',
    label: 'Lower Cloud Spend',
    sub: 'Average across all paid customers in year one',
    accent: '#7c3aed',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    id: 'reliability',
    metric: '99.99%',
    label: 'Pipeline Uptime',
    sub: 'Guaranteed SLA with self-healing on every paid tier',
    accent: '#0891b2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    id: 'setup',
    metric: '< 1 day',
    label: 'Time to First Insight',
    sub: 'Median time from sign-up to live pipeline',
    accent: '#059669',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    id: 'engineers',
    metric: '6×',
    label: 'Engineer Productivity',
    sub: 'More pipelines shipped per engineer per quarter',
    accent: '#d97706',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    id: 'connectors',
    metric: '300+',
    label: 'Native Connectors',
    sub: 'Every major cloud, warehouse, and SaaS tool',
    accent: '#be185d',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="6" height="10" rx="1"/><rect x="16" y="7" width="6" height="10" rx="1"/>
        <path d="M8 12h8"/>
      </svg>
    ),
  },
];

const LOGOS = ['Lumara Logic', 'Artivio', 'DropShip', 'NexaCorp', 'Veridian', 'Synthex'];

export default function BusinessResults() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (card._pendingFrame) return;
    card._pendingFrame = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${((clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty('--my', `${((clientY - rect.top) / rect.height) * 100}%`);
      card._pendingFrame = null;
    });
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    if (card._pendingFrame) {
      cancelAnimationFrame(card._pendingFrame);
      card._pendingFrame = null;
    }
  };

  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      style={{ padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}
      className="bg-mesh-dark"
    >
      {/* Floating blobs */}
      <div aria-hidden="true" className="float-blob float-blob-a" style={{ width: 520, height: 520, top: '-10%', right: '-8%', background: 'rgba(37,99,235,0.09)'  }} />
      <div aria-hidden="true" className="float-blob float-blob-b" style={{ width: 400, height: 400, bottom: '-8%', left: '-6%',  background: 'rgba(124,58,237,0.08)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <p className="section-eyebrow">Measured. Verified. Repeatable.</p>
          <h2 id="results-heading" className="section-title" style={{ marginBottom: 18 }}>
            Results That Show Up{' '}
            <span style={{ background: 'linear-gradient(135deg, #b4c5ff, #6ee7b7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              in Your P&L
            </span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 500 }}>
            Not vanity metrics. These are the numbers 500+ engineering teams report after switching to AetherData.
          </p>
        </div>

        {/* Results grid */}
        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
          marginBottom: 80,
        }}>
          {RESULTS.map(r => (
            <div
              key={r.id}
              className="glass-card spotlight-card"
              style={{ padding: '28px', position: 'relative', overflow: 'hidden' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Left accent bar */}
              <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: 20, bottom: 20, width: 2, background: r.accent, borderRadius: 1, opacity: 0.5 }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 800, fontSize: 36, color: '#e5e1e4', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {r.metric}
                </span>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: `${r.accent}18`, border: `1px solid ${r.accent}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: r.accent, flexShrink: 0,
                }}>
                  {r.icon}
                </div>
              </div>

              <p style={{ fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 15, color: '#e5e1e4', marginBottom: 6, letterSpacing: '-0.01em' }}>
                {r.label}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#8d90a0', lineHeight: 1.6 }}>
                {r.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Divider + logos */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#2e2e38', letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 24 }}>
            Trusted at scale by
          </p>
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            {LOGOS.map(name => (
              <span key={name} className="trust-logo" style={{ fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 14, color: '#c3c6d7', letterSpacing: '-0.01em' }}>
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Pull-quote bridge into Pricing */}
        <div className="reveal" style={{
          maxWidth: 700, margin: '0 auto',
          background: 'rgba(37,99,235,0.06)',
          border: '1px solid rgba(37,99,235,0.20)',
          borderRadius: 20, padding: '36px 40px',
          position: 'relative', overflow: 'hidden',
          textAlign: 'center',
        }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.10), transparent 70%)', pointerEvents: 'none' }} />
          <p style={{ fontFamily: 'Geist, sans-serif', fontStyle: 'italic', fontSize: 'clamp(15px, 2vw, 18px)', color: '#c3c6d7', lineHeight: 1.7, marginBottom: 20, position: 'relative' }}>
            "We cut our data infra spend by 43% in the first quarter and shipped twice the number of pipelines. AetherData made our team of 3 feel like a team of 10."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, position: 'relative' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb40, #7c3aed40)',
              border: '1px solid rgba(180,197,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Geist, sans-serif', fontWeight: 700, fontSize: 12, color: '#b4c5ff',
            }}>JR</div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 13, color: '#e5e1e4' }}>Jordan Reeves</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#8d90a0' }}>VP of Data, NexaCorp</p>
            </div>
          </div>
          {/* Bridge arrow to Pricing */}
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#8d90a0' }}>Ready to see what it costs?</span>
            <a href="#pricing" style={{
              fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 13, color: '#b4c5ff', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 5,
              transition: 'gap 200ms ease-out',
            }}
            onMouseEnter={e => e.currentTarget.style.gap = '9px'}
            onMouseLeave={e => e.currentTarget.style.gap = '5px'}
            >
              View pricing
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
