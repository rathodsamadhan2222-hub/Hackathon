/* ── How AI Works ─────────────────────────────────
   The "aha moment" section. Explains the mechanism.
   3-step process with animated connector and a
   bridge into the Features section.
──────────────────────────────────────────────── */

const STEPS = [
  {
    num: '01',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    label: 'Connect Everything',
    sub: 'Unified data mesh',
    body: 'One agent scans your entire stack — 300+ connectors, APIs, warehouses, streams. Schema drift, auth, and version mismatches are resolved automatically.',
    accent: '#2563eb',
    highlights: ['300+ connectors', 'Zero-config auth', 'Auto schema reconciliation'],
  },
  {
    num: '02',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    label: 'AI Understands Intent',
    sub: 'Neural scheduling engine',
    body: 'AetherData\'s model reads your query patterns, business calendars, and SLA contracts. It builds a dependency graph and predicts failure before it reaches production.',
    accent: '#7c3aed',
    highlights: ['Predictive failure detection', 'SLA-aware scheduling', 'Self-healing pipelines'],
  },
  {
    num: '03',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    label: 'Insight in Milliseconds',
    sub: 'Real-time delivery layer',
    body: 'Data arrives at your BI tools, ML pipelines, and operational systems in under 40ms — complete, clean, and semantically enriched by the time your team needs it.',
    accent: '#0891b2',
    highlights: ['< 40ms latency', 'Semantic enrichment', 'Multi-destination fan-out'],
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      style={{ padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}
      className="bg-dark"
    >
      {/* Floating blobs */}
      <div aria-hidden="true" className="float-blob float-blob-a" style={{ width: 460, height: 460, top: '-10%', right: '-6%', background: 'rgba(124,58,237,0.09)' }} />
      <div aria-hidden="true" className="float-blob float-blob-c" style={{ width: 340, height: 340, bottom: '-5%', left: '10%', background: 'rgba(8,145,178,0.07)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
          <p className="section-eyebrow">The AI Mechanism</p>
          <h2 id="how-heading" className="section-title" style={{ marginBottom: 18 }}>
            Three Steps From{' '}
            <span style={{ background: 'linear-gradient(135deg, #b4c5ff, #d0bcff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Chaos to Clarity
            </span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 500 }}>
            AetherData doesn't just move data. It understands it — and acts on it before you even write a query.
          </p>
        </div>

        {/* 3-step horizontal flow */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 0, marginBottom: 80, position: 'relative' }}>
          {STEPS.map((step, i) => (
            <div key={step.id} style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {/* Horizontal connector line (desktop) */}
              {i < STEPS.length - 1 && (
                <div aria-hidden="true" style={{
                  position: 'absolute', top: 42, right: 0, width: '50%', height: 1,
                  background: `linear-gradient(90deg, ${step.accent}60, ${STEPS[i+1].accent}60)`,
                  zIndex: 2,
                }} />
              )}

              <div
                className="glass-card spotlight-card"
                style={{
                  padding: '36px 28px',
                  margin: '0 12px',
                  flex: 1,
                  borderTop: `2px solid ${step.accent}50`,
                  position: 'relative',
                }}
                onMouseMove={e => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
                  e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
                }}
              >
                {/* Step number */}
                <div style={{
                  position: 'absolute', top: 20, right: 20,
                  fontFamily: 'Geist, sans-serif', fontWeight: 800, fontSize: 48,
                  color: `${step.accent}12`, letterSpacing: '-0.04em', lineHeight: 1,
                  userSelect: 'none',
                }}>{step.num}</div>

                {/* Icon */}
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `${step.accent}18`,
                  border: `1px solid ${step.accent}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: step.accent, marginBottom: 24,
                }}>
                  {step.icon}
                </div>

                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: step.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {step.sub}
                </p>
                <h3 style={{ fontFamily: 'Geist, sans-serif', fontWeight: 700, fontSize: 20, color: '#e5e1e4', letterSpacing: '-0.02em', marginBottom: 12 }}>
                  {step.label}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#8d90a0', lineHeight: 1.7, marginBottom: 24 }}>
                  {step.body}
                </p>

                {/* Highlights */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {step.highlights.map(h => (
                    <li key={h} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: '50%', background: step.accent, flexShrink: 0, opacity: 0.7 }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#c3c6d7' }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bridge into Features */}
        <div className="reveal" style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#434655', marginBottom: 16, letterSpacing: '0.01em' }}>
            Ready to see every capability in detail?
          </p>
          <a href="#platform" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 14,
            color: '#b4c5ff', textDecoration: 'none',
            transition: 'gap 200ms ease-out',
          }}
          onMouseEnter={e => e.currentTarget.style.gap = '12px'}
          onMouseLeave={e => e.currentTarget.style.gap = '8px'}
          >
            Explore the full platform
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
