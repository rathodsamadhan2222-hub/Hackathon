/* ── Problem Section ─────────────────────────────
   Sits directly after Hero. Raises the stakes by
   naming real pain before introducing the solution.
──────────────────────────────────────────────── */

const PAINS = [
  {
    id: 'fragmented',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 14L12 12M12 12L14 10M12 12L10 10M12 12L14 14"/>
        <circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="12" cy="5" r="2"/>
        <path d="M5 17L8 14M19 17L16 14M12 7L12 10"/>
      </svg>
    ),
    label: 'Fragmented Pipelines',
    stat: '73%',
    statLabel: 'of data teams manage 10+ disconnected tools',
    body: 'Your data travels through a maze of hand-stitched scripts, brittle ETL jobs, and vendor-locked SaaS tools — each one a single point of failure.',
    accent: '#f97316',
  },
  {
    id: 'latency',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    label: 'Hours-Old Data',
    stat: '4.2h',
    statLabel: 'average delay from event to insight',
    body: 'By the time your dashboards update, the window to act has closed. Batch pipelines built for yesterday cannot power decisions that need to happen now.',
    accent: '#ef4444',
  },
  {
    id: 'cost',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        <circle cx="12" cy="12" r="5"/>
      </svg>
    ),
    label: 'Runaway Cloud Costs',
    stat: '38%',
    statLabel: 'of data infra spend is wasted on idle compute',
    body: 'Over-provisioned clusters run 24/7 whether your pipelines need them or not. Manual tuning is a full-time job that your engineers didn\'t sign up for.',
    accent: '#a855f7',
  },
];

export default function Problem() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (card._pendingFrame) return;
    card._pendingFrame = requestAnimationFrame(() => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${((clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty('--my', `${((clientY - r.top) / r.height) * 100}%`);
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
      id="problem"
      aria-labelledby="problem-heading"
      style={{ padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}
      className="bg-gradient-section"
    >
      {/* Floating blobs */}
      <div aria-hidden="true" className="float-blob float-blob-b" style={{ width: 500, height: 500, top: '-15%', left: '-8%', background: 'rgba(249,115,22,0.07)' }} />
      <div aria-hidden="true" className="float-blob float-blob-c" style={{ width: 380, height: 380, bottom: '-10%', right: '-4%', background: 'rgba(168,85,247,0.07)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <p className="section-eyebrow">The Status Quo Is Broken</p>
          <h2 id="problem-heading" className="section-title" style={{ marginBottom: 18 }}>
            Data Teams Are Drowning<br />
            <span style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              in Complexity
            </span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 520 }}>
            Modern data infrastructure wasn't designed for the pace of AI-first business. The tools are disconnected. The costs are unpredictable. The latency is unacceptable.
          </p>
        </div>

        {/* Pain cards */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 72 }}>
          {PAINS.map(p => (
            <article
              key={p.id}
              className="glass-card spotlight-card"
              style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Accent top bar */}
              <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${p.accent}00, ${p.accent}, ${p.accent}00)` }} />

              {/* Icon */}
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${p.accent}15`,
                border: `1px solid ${p.accent}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: p.accent, marginBottom: 20,
              }}>
                {p.icon}
              </div>

              {/* Big stat */}
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 800, fontSize: 44, letterSpacing: '-0.04em', color: p.accent, lineHeight: 1 }}>
                  {p.stat}
                </span>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#8d90a0', marginTop: 4, lineHeight: 1.4 }}>
                  {p.statLabel}
                </p>
              </div>

              <h3 style={{ fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 17, color: '#e5e1e4', letterSpacing: '-0.02em', marginBottom: 10 }}>
                {p.label}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#8d90a0', lineHeight: 1.7 }}>
                {p.body}
              </p>
            </article>
          ))}
        </div>

        {/* Bridge — leads to HowItWorks */}
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 16,
            background: 'rgba(180,197,255,0.04)',
            border: '1px solid rgba(180,197,255,0.12)',
            borderRadius: 16, padding: '20px 32px',
          }}>
            <div style={{ width: 1, height: 36, background: 'linear-gradient(180deg, transparent, #b4c5ff, transparent)', flexShrink: 0 }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#c3c6d7', lineHeight: 1.6, textAlign: 'left', maxWidth: 520 }}>
              <strong style={{ color: '#e5e1e4', fontFamily: 'Geist, sans-serif' }}>There is a better way.</strong>{' '}
              What if your data infrastructure could think, heal, and scale itself — before you even notice a problem?
            </p>
            {/* Scroll cue */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b4c5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.6 }}>
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
