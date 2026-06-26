/* ── Dashboard Preview Section ────────────────────
   Visual proof. Shows the product UI as a live
   code/metrics mockup. Bridges Features → Results.
──────────────────────────────────────────────── */
import { useEffect, useRef, useState } from 'react';

/* Animated number counter */
function Counter({ to, suffix = '', duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* Tiny sparkline SVG */
function Sparkline({ values, color }) {
  const w = 80, h = 28;
  const max = Math.max(...values), min = Math.min(...values);
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} aria-hidden="true" style={{ overflow: 'visible' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts.split(' ').pop().split(',')[0]} cy={pts.split(' ').pop().split(',')[1]} r="2.5" fill={color} />
    </svg>
  );
}

const PIPELINE_ROWS = [
  { name: 'Salesforce → Snowflake', status: 'running', latency: '12ms', rows: '1.2M', color: '#22c55e' },
  { name: 'Kafka → BigQuery', status: 'running', latency: '8ms', rows: '4.8M', color: '#22c55e' },
  { name: 'Postgres → Redshift', status: 'healing', latency: '34ms', rows: '890K', color: '#f59e0b' },
  { name: 'S3 → Databricks', status: 'running', latency: '19ms', rows: '2.1M', color: '#22c55e' },
];

const KPI_CARDS = [
  { label: 'Data Processed Today', value: 24, suffix: 'TB', delta: '+18%', sparkValues: [8, 10, 12, 11, 14, 18, 20, 22, 24], accent: '#2563eb' },
  { label: 'Pipelines Running', value: 247, suffix: '', delta: '+12', sparkValues: [220, 225, 228, 232, 238, 241, 245, 246, 247], accent: '#7c3aed' },
  { label: 'Cost Saved (MTD)', value: 42, suffix: '%', delta: 'vs baseline', sparkValues: [10, 18, 22, 28, 30, 35, 38, 40, 42], accent: '#0891b2' },
];

export default function Dashboard() {
  const [activeRow, setActiveRow] = useState(null);

  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-heading"
      style={{ padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}
      className="bg-light-tinted"
    >
      {/* Floating blobs */}
      <div aria-hidden="true" className="float-blob float-blob-a" style={{ width: 500, height: 500, top: '-15%', left: '-8%', background: 'rgba(37,99,235,0.07)' }} />
      <div aria-hidden="true" className="float-blob float-blob-b" style={{ width: 380, height: 380, bottom: '-10%', right: '-5%', background: 'rgba(124,58,237,0.07)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className="section-eyebrow">Real Product, Real Data</p>
          <h2 id="dashboard-heading" className="section-title" style={{ marginBottom: 18 }}>
            Your Entire Data Stack —{' '}
            <span style={{ background: 'linear-gradient(135deg, #b4c5ff, #d0bcff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              One Screen
            </span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 480 }}>
            Watch pipelines heal themselves, costs drop in real time, and data arrive before your team needs it.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="reveal glass-card" style={{
          padding: 0, overflow: 'hidden',
          background: 'rgba(10,10,16,0.9)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(180,197,255,0.08)',
        }}>

          {/* Window chrome */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px',
            background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
              <div key={c} aria-hidden="true" style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
            ))}
            <div style={{ flex: 1 }} />
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              color: '#434655', letterSpacing: '0.06em',
              background: 'rgba(255,255,255,0.04)', padding: '3px 10px',
              borderRadius: 4, border: '1px solid rgba(255,255,255,0.06)',
            }}>
              app.aetherdata.ai / dashboard
            </div>
            <div style={{ flex: 1 }} />
          </div>

          <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {KPI_CARDS.map(k => (
              <div key={k.label} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10, padding: '18px',
                transition: 'border-color 200ms ease-out, background 200ms ease-out',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${k.accent}40`; e.currentTarget.style.background = `${k.accent}08`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
              >
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#434655', marginBottom: 8, letterSpacing: '0.03em' }}>{k.label}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 700, fontSize: 28, color: '#e5e1e4', letterSpacing: '-0.03em' }}>
                    <Counter to={k.value} suffix={k.suffix} />
                  </span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: k.accent, letterSpacing: '0.04em' }}>{k.delta}</span>
                </div>
                <Sparkline values={k.sparkValues} color={k.accent} />
              </div>
            ))}
          </div>

          {/* Pipeline table */}
          <div style={{ padding: '0 24px 24px' }}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#434655', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '18px 0 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              Active Pipelines
            </p>
            {PIPELINE_ROWS.map((row, i) => (
              <div
                key={row.name}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr auto auto auto',
                  alignItems: 'center', gap: 16,
                  padding: '11px 0',
                  borderBottom: i < PIPELINE_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                  cursor: 'default',
                  transition: 'background 150ms ease-out',
                  borderRadius: 6, paddingLeft: 8, paddingRight: 8, marginLeft: -8, marginRight: -8,
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: '50%', background: row.color, boxShadow: `0 0 6px ${row.color}80`, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#c3c6d7' }}>{row.name}</span>
                </div>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.06em',
                  color: row.status === 'healing' ? '#f59e0b' : '#22c55e',
                  background: row.status === 'healing' ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)',
                  padding: '2px 8px', borderRadius: 9999,
                }}>
                  {row.status}
                </span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#434655' }}>{row.latency}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#8d90a0', textAlign: 'right' }}>{row.rows} rows</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bridge into Business Results */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: 64 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#c3c6d7', lineHeight: 1.65 }}>
            This isn't a mockup — it's what your team sees on day one.<br />
            <strong style={{ color: '#e5e1e4', fontFamily: 'Geist, sans-serif' }}>And the business results follow immediately.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
