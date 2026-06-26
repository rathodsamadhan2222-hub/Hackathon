const STEPS = [
  {
    id: 'extract',
    label: 'Extract',
    desc: 'Seamlessly pull data from 300+ native connectors including Salesforce, Snowflake, and Databricks.',
    color: '#b4c5ff',
  },
  {
    id: 'transform',
    label: 'Transform',
    desc: 'No-code SQL generation and Python integration for complex data transformations at scale.',
    color: '#d0bcff',
  },
  {
    id: 'automate',
    label: 'Automate',
    desc: 'Event-driven triggers and smart scheduling activate your workflows only when they need to run.',
    color: '#b4c5ff',
  },
  {
    id: 'optimize',
    label: 'Optimize',
    desc: 'Self-healing pipelines that adjust resources dynamically to save up to 40% in cloud costs.',
    color: '#d0bcff',
  },
];

export default function Lifecycle() {
  return (
    <section
      id="workflows"
      aria-labelledby="lifecycle-heading"
      style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}
      className="bg-gradient-section"
    >
      {/* Floating blurred blobs */}
      <div aria-hidden="true" className="float-blob float-blob-b" style={{ width: 480, height: 480, top: '-10%', right: '-5%', background: 'rgba(87,27,193,0.13)' }} />
      <div aria-hidden="true" className="float-blob float-blob-a" style={{ width: 360, height: 360, bottom: '-5%', left: '5%', background: 'rgba(37,99,235,0.10)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }} className="px-4 md:px-12">
        <div style={{ marginBottom: 64, textAlign: 'center' }} className="reveal">
          <p className="section-eyebrow">The Intelligent Lifecycle</p>
          <h2 id="lifecycle-heading" className="section-title">
            From Raw Signal to Decisive Action
          </h2>
        </div>

        {/* Timeline steps */}
        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
          {/* Vertical connector line */}
          <div aria-hidden="true" style={{
            position: 'absolute', left: '50%', top: 24, bottom: 24,
            width: 1, background: 'linear-gradient(180deg, transparent 0%, rgba(180,197,255,0.3) 20%, rgba(208,188,255,0.3) 80%, transparent 100%)',
            transform: 'translateX(-50%)',
          }} />

          {STEPS.map((step, i) => (
            <div
              key={step.id}
              className="reveal"
              style={{
                display: 'flex',
                flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                alignItems: 'center',
                gap: 32,
                marginBottom: 48,
              }}
            >
              {/* Content card */}
              <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                <div className="glass-card" style={{ padding: '20px 24px', display: 'inline-block', maxWidth: 280, textAlign: 'left' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: step.color, marginBottom: 8 }}>
                    0{i + 1}
                  </div>
                  <h3 style={{ fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 18, color: '#e5e1e4', letterSpacing: '-0.02em', marginBottom: 8 }}>
                    {step.label}
                  </h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#8d90a0', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Node */}
              <div style={{ position: 'relative', zIndex: 2, flexShrink: 0 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(14,14,16,0.9)',
                  border: `2px solid ${step.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 20px ${step.color}30`,
                }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: step.color }} />
                </div>
              </div>

              {/* Spacer */}
              <div style={{ flex: 1 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
