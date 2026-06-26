import { useState } from 'react';

const FAQS = [
  { q: 'How does the AI optimization work?', a: 'AetherData analyzes your pipeline topology, query patterns, and resource utilization in real time. Our neural scheduling engine adjusts thread pools, pre-fetches schema branches, and reroutes traffic automatically — no configuration needed.' },
  { q: 'Can I integrate from legacy systems like Tableau?', a: 'Yes. Our connector library supports 300+ sources including Tableau, SAP, Oracle, and legacy flat-file systems. Custom connectors can be built using our TypeScript SDK in under an hour.' },
  { q: 'What cloud providers are supported?', a: 'AWS, GCP, Azure, and Alibaba Cloud are natively supported with region-aware routing. Hybrid and on-premise deployments are available on the Enterprise plan.' },
  { q: 'How is billing calculated for partial months?', a: 'All paid tiers are pro-rated to the day. If you upgrade mid-month, you only pay for the remainder of that billing cycle at the new tier rate.' },
  { q: 'Is there a free trial?', a: 'The Starter plan is free forever with no credit card required. Paid tiers include a 14-day trial with full feature access.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}
      className="bg-gradient-dark"
    >
      {/* Floating blurred blobs */}
      <div aria-hidden="true" className="float-blob float-blob-a" style={{ width: 440, height: 440, top: '-8%', right: '5%', background: 'rgba(87,27,193,0.11)' }} />
      <div aria-hidden="true" className="float-blob float-blob-b" style={{ width: 320, height: 320, bottom: '-5%', left: '10%', background: 'rgba(37,99,235,0.08)' }} />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 48px' }} className="px-4 md:px-12">
        <div style={{ marginBottom: 56, textAlign: 'center' }} className="reveal">
          <p className="section-eyebrow">FAQ</p>
          <h2 id="faq-heading" className="section-title">Frequently Asked Questions</h2>
        </div>

        <div className="reveal">
          {FAQS.map((item, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                transition: 'border-color 200ms ease-out',
              }}
            >
              <button
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', textAlign: 'left', background: 'none', border: 'none',
                  padding: '20px 0', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                }}
              >
                <span style={{ fontFamily: 'Geist, sans-serif', fontWeight: 500, fontSize: 16, color: open === i ? '#e5e1e4' : '#c3c6d7', transition: 'color 200ms ease-out' }}>
                  {item.q}
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                  style={{ flexShrink: 0, color: '#8d90a0', transition: 'transform 300ms ease-in-out', transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                className={`accordion-content${open === i ? ' open' : ''}`}
              >
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#8d90a0', lineHeight: 1.7, paddingBottom: 20 }}>
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
