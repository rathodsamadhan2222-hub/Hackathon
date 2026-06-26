import { useState, useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────────────────────────
   MINI VISUAL COMPONENTS
───────────────────────────────────────────── */

function BarSparkline({ bars, accent }) {
  return (
    <svg width="100%" height="48" viewBox="0 0 140 48" preserveAspectRatio="none" aria-hidden="true">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 18 + 4}
          y={48 - h}
          width={12}
          height={h}
          rx={3}
          fill={accent}
          opacity={0.25 + (i / bars.length) * 0.65}
        />
      ))}
    </svg>
  );
}

function LineSparkline({ points, accent }) {
  const pts = points.map((p, i) => `${(i / (points.length - 1)) * 130 + 5},${44 - p * 38}`);
  const fill = [...pts, '135,44', '5,44'].join(' ');
  const line = pts.join(' ');
  return (
    <svg width="100%" height="48" viewBox="0 0 140 48" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="lsg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fill} fill="url(#lsg)" />
      <polyline points={line} fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldVisual({ accent }) {
  return (
    <div style={{ position: 'relative', width: 80, height: 80, margin: '8px auto' }}>
      {[40, 56, 72].map((s, i) => (
        <div key={i} style={{
          position: 'absolute', top: '50%', left: '50%',
          width: s, height: s,
          transform: 'translate(-50%,-50%)',
          borderRadius: '50%',
          border: `1px solid ${accent}`,
          opacity: 0.12 + i * 0.1,
          animation: `pulse-ring ${1.8 + i * 0.6}s ease-out infinite`,
          animationDelay: `${i * 0.4}s`,
        }} />
      ))}
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4z"
          stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={`${accent}18`} />
        <path d="M9 12l2 2 4-4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function PipelineVisual({ accent }) {
  const nodes = ['Ingest', 'Transform', 'Classify', 'Route', 'Deliver'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', overflowX: 'auto', paddingBottom: 2 }}>
      {nodes.map((label, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <div style={{
            background: `${accent}14`,
            border: `1px solid ${accent}44`,
            borderRadius: 8,
            padding: '5px 10px',
            fontSize: 11,
            color: accent,
            fontFamily: 'JetBrains Mono, monospace',
            whiteSpace: 'nowrap',
            animation: 'node-glow 2.4s ease-in-out infinite',
            animationDelay: `${i * 0.35}s`,
          }}>{label}</div>
          {i < nodes.length - 1 && (
            <div style={{ display: 'flex', alignItems: 'center', margin: '0 4px' }}>
              <div style={{ width: 14, height: 1, background: `${accent}44` }} />
              <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: `5px solid ${accent}55` }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function DashboardMock({ accent }) {
  const barH = [24, 36, 28, 44, 32, 40, 48];
  return (
    <div style={{
      background: 'rgba(14,14,16,0.7)', borderRadius: 10,
      border: '1px solid rgba(255,255,255,0.06)', padding: '12px 14px', fontSize: 11,
    }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        {[
          { label: 'Throughput', val: '2.4M/s', c: accent },
          { label: 'Latency', val: '0.3ms', c: '#d0bcff' },
          { label: 'Uptime', val: '99.99%', c: '#6ee7b7' },
        ].map(m => (
          <div key={m.label} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '6px 8px' }}>
            <div style={{ color: '#8d90a0', fontSize: 9, fontFamily: 'JetBrains Mono,monospace', marginBottom: 2 }}>{m.label}</div>
            <div style={{ color: m.c, fontWeight: 700, fontSize: 13, fontFamily: 'Geist,sans-serif' }}>{m.val}</div>
          </div>
        ))}
      </div>
      <svg width="100%" height="44" viewBox="0 0 140 44" preserveAspectRatio="none" aria-hidden="true">
        {barH.map((h, i) => (
          <rect key={i} x={i * 20 + 2} y={44 - h} width={14} height={h} rx={3} fill={accent} opacity={0.15 + (i / 7) * 0.5} />
        ))}
        <polyline
          points="9,22 29,14 49,20 69,6 89,14 109,8 129,2"
          fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function TimelineVisual({ accent }) {
  const events = [
    { label: 'Schema v3.1 deployed', time: '09:14', done: true },
    { label: 'Pipeline auto-scaled ×4', time: '10:02', done: true },
    { label: 'Anomaly detected & fixed', time: '11:30', done: true },
    { label: 'Report generated', time: '12:00', done: false },
  ];
  return (
    <div style={{ position: 'relative', paddingLeft: 22 }}>
      <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 1, background: `${accent}30` }} />
      {events.map((ev, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: i < events.length - 1 ? 13 : 0, position: 'relative' }}>
          <div style={{
            position: 'absolute', left: -22 + 4, top: 4,
            width: 9, height: 9, borderRadius: '50%',
            background: ev.done ? accent : 'transparent',
            border: `1.5px solid ${accent}`,
            boxShadow: ev.done ? `0 0 8px ${accent}60` : 'none',
          }} />
          <div>
            <div style={{ fontSize: 12, color: ev.done ? '#e5e1e4' : '#8d90a0', fontFamily: 'Inter,sans-serif', lineHeight: 1.3 }}>{ev.label}</div>
            <div style={{ fontSize: 10, color: '#8d90a0', fontFamily: 'JetBrains Mono,monospace', marginTop: 2 }}>{ev.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURE DATA
───────────────────────────────────────────── */
const FEATURES = [
  {
    id: 0,
    title: 'Live Dashboard',
    eyebrow: 'observability',
    desc: 'Monitor every byte with high-fidelity telemetry. Real-time throughput, latency percentiles, and uptime SLA — all in one pane.',
    accent: '#b4c5ff',
    colSpan: 2, rowSpan: 2,
    tag: '2.4M events/s',
    visual: <DashboardMock accent="#b4c5ff" />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="14" rx="2" stroke="#b4c5ff" strokeWidth="1.5"/>
        <path d="M3 17l4-5 4 3 4-6 4 3" stroke="#b4c5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 21h8M12 17v4" stroke="#b4c5ff" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 1,
    title: 'Quantum Security',
    eyebrow: 'protection',
    desc: 'Military-grade key rotation and post-quantum cryptography. Zero-trust enforced at the transport layer.',
    accent: '#6ee7b7',
    colSpan: 1, rowSpan: 2,
    tag: 'SOC 2 Type II',
    visual: <ShieldVisual accent="#6ee7b7" />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4z" stroke="#6ee7b7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="#6ee7b7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'AI Workflow Engine',
    eyebrow: 'automation',
    desc: 'Visual DAG builder with LLM-powered step suggestions. Drag, connect, and deploy data pipelines in minutes.',
    accent: '#d0bcff',
    colSpan: 2, rowSpan: 1,
    tag: '−90% manual ops',
    visual: <PipelineVisual accent="#d0bcff" />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="#d0bcff" strokeWidth="1.5"/>
        <path d="M12 5V3M12 21v-2M5 12H3M21 12h-2" stroke="#d0bcff" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7.05 7.05L5.64 5.64M18.36 18.36l-1.41-1.41M7.05 16.95l-1.41 1.41M18.36 5.64l-1.41 1.41" stroke="#d0bcff" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Predictive Analytics',
    eyebrow: 'intelligence',
    desc: 'ML-driven forecasting surfaces anomalies before they impact SLAs. Confidence-weighted signals at every layer.',
    accent: '#f9a8d4',
    colSpan: 1, rowSpan: 1,
    tag: '8× faster insights',
    visual: <LineSparkline points={[0.2,0.5,0.3,0.7,0.55,0.85,0.65,0.9,0.75,1.0]} accent="#f9a8d4" />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 17l4-5 4 3 4-6 4 3" stroke="#f9a8d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 21H3V3" stroke="#f9a8d4" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Audit Timeline',
    eyebrow: 'traceability',
    desc: 'Immutable, tamper-evident log of every schema change, pipeline run, and auto-remediation action across your stack.',
    accent: '#fcd34d',
    colSpan: 2, rowSpan: 1,
    tag: 'Full traceability',
    visual: <TimelineVisual accent="#fcd34d" />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#fcd34d" strokeWidth="1.5"/>
        <path d="M12 7v5l3 3" stroke="#fcd34d" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: 'KPI Intelligence',
    eyebrow: 'metrics',
    desc: 'Auto-surface and track the metrics that matter. Smart alerts fire before human eyes catch the drift.',
    accent: '#fb923c',
    colSpan: 1, rowSpan: 1,
    tag: 'Zero missed KPIs',
    visual: <BarSparkline bars={[18,28,22,36,30,42,38]} accent="#fb923c" />,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M8 6l-4 6 4 6M16 6l4 6-4 6" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.5 4l-5 16" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────
   BENTO CARD
───────────────────────────────────────────── */
function BentoCard({ feature, isActive, onActivate }) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
      const tx = ((e.clientX - rect.left) / rect.width - 0.5) * 5;
      const ty = ((e.clientY - rect.top) / rect.height - 0.5) * -5;
      card.style.setProperty('--tx', `${tx}deg`);
      card.style.setProperty('--ty', `${ty}deg`);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--tx', '0deg');
    card.style.setProperty('--ty', '0deg');
  }, []);

  const { accent, colSpan, rowSpan } = feature;

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => onActivate(feature.id)}
      className="bento-card spotlight-card"
      aria-label={feature.title}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        '--accent': accent,
        outline: isActive ? `1.5px solid ${accent}55` : '1px solid rgba(255,255,255,0.07)',
        transform: isActive ? 'rotateX(var(--ty,0deg)) rotateY(var(--tx,0deg)) translateY(-3px)' : 'none',
        zIndex: isActive ? 2 : 1,
      }}
    >
      <div className="bento-spotlight" aria-hidden="true" />
      {isActive && <div className="bento-glow-border" aria-hidden="true" style={{ '--accent': accent }} />}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="bento-icon-wrap" style={{ '--accent': accent }}>
            {feature.icon}
          </div>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, opacity: 0.8, marginBottom: 2 }}>
              {feature.eyebrow}
            </div>
            <h3 style={{ fontFamily: 'Geist,sans-serif', fontWeight: 600, fontSize: 16, color: '#e5e1e4', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {feature.title}
            </h3>
          </div>
        </div>
        <span className="bento-tag" style={{ '--accent': accent }}>{feature.tag}</span>
      </div>

      <div className="bento-visual">{feature.visual}</div>

      <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#8d90a0', lineHeight: 1.65, marginTop: 14 }}>
        {feature.desc}
      </p>

      <div className="bento-bottom-line" style={{ '--accent': accent }} aria-hidden="true" />
    </article>
  );
}

/* ─────────────────────────────────────────────
   ACCORDION ITEM
───────────────────────────────────────────── */
function AccordionItem({ feature, isOpen, onToggle }) {
  const { accent } = feature;
  return (
    <div
      className="glass-card"
      style={{
        marginBottom: 8, overflow: 'hidden',
        borderColor: isOpen ? `${accent}44` : undefined,
        boxShadow: isOpen ? `0 0 20px ${accent}15` : undefined,
        transition: 'border-color 300ms, box-shadow 300ms',
      }}
    >
      <button
        aria-expanded={isOpen}
        aria-controls={`acc-content-${feature.id}`}
        id={`acc-header-${feature.id}`}
        onClick={onToggle}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: '18px 20px', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="bento-icon-wrap" style={{ '--accent': accent, width: 36, height: 36 }}>
            {feature.icon}
          </div>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, opacity: 0.8, marginBottom: 2 }}>
              {feature.eyebrow}
            </div>
            <span style={{ fontFamily: 'Geist,sans-serif', fontWeight: 600, fontSize: 15, color: '#e5e1e4' }}>
              {feature.title}
            </span>
          </div>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0, transition: 'transform 300ms ease-in-out', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: '#8d90a0' }}>
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div
        id={`acc-content-${feature.id}`}
        role="region"
        aria-labelledby={`acc-header-${feature.id}`}
        className={`accordion-content${isOpen ? ' open' : ''}`}
      >
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ marginBottom: 12, padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
            {feature.visual}
          </div>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#8d90a0', lineHeight: 1.65, marginBottom: 10 }}>
            {feature.desc}
          </p>
          <span className="bento-tag" style={{ '--accent': accent }}>{feature.tag}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function Features() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [activeIndex, setActiveIndex] = useState(null);
  const prevIsMobileRef = useRef(isMobile);

  useEffect(() => {
    const onResize = () => {
      const nowMobile = window.innerWidth < 768;
      if (nowMobile !== prevIsMobileRef.current) {
        prevIsMobileRef.current = nowMobile;
        setIsMobile(nowMobile);
        // activeIndex shared — preserves active card across resize
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleActivate = (id) => setActiveIndex(id);
  const handleAccordionToggle = (id) => setActiveIndex(prev => prev === id ? null : id);

  return (
    <section
      id="platform"
      aria-labelledby="features-heading"
      style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}
      className="bg-dark"
    >
      {/* Floating blurred blobs */}
      <div aria-hidden="true" className="float-blob float-blob-a" style={{ width: 520, height: 520, top: '-12%', left: '-8%', background: 'rgba(37,99,235,0.11)' }} />
      <div aria-hidden="true" className="float-blob float-blob-b" style={{ width: 400, height: 400, bottom: '-8%', right: '-6%', background: 'rgba(87,27,193,0.10)' }} />
      <div aria-hidden="true" className="float-blob float-blob-c" style={{ width: 280, height: 280, top: '45%', right: '20%', background: 'rgba(180,197,255,0.05)' }} />


      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
        <div className="reveal" style={{ marginBottom: 56, textAlign: 'center' }}>
          <p className="section-eyebrow">Platform Capabilities</p>
          <h2 id="features-heading" className="section-title" style={{ marginBottom: 16 }}>
            Engineered for Complexity
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Integrate with your entire tech stack — autonomous scaling, real-time monitoring, and AI-powered observability for your most critical data flows.
          </p>
        </div>

        {/* DESKTOP: Bento Grid */}
        {!isMobile && (
          <div className="features-bento-grid">
            {FEATURES.map(f => (
              <BentoCard key={f.id} feature={f} isActive={activeIndex === f.id} onActivate={handleActivate} />
            ))}
          </div>
        )}

        {/* MOBILE: Accordion */}
        {isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FEATURES.map(f => (
              <AccordionItem key={f.id} feature={f} isOpen={activeIndex === f.id} onToggle={() => handleAccordionToggle(f.id)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
