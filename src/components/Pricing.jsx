import { useState } from 'react';

/**
 * PRICING MATRIX — Multi-dimensional config object
 * Structure: MATRIX[tier][currency] = base monthly rate (before discount)
 * Annual multiplier: 0.80 (20% off)
 * Regional tariff variables baked into currency-specific rates
 */
const PRICING_MATRIX = {
  starter: {
    USD: { monthly: 23, tariff: 1.00 },
    INR: { monthly: 1899, tariff: 1.00 },
    EUR: { monthly: 21, tariff: 1.08 },
  },
  professional: {
    USD: { monthly: 79, tariff: 1.00 },
    INR: { monthly: 6499, tariff: 1.00 },
    EUR: { monthly: 73, tariff: 1.08 },
  },
  enterprise: {
    USD: null,
    INR: null,
    EUR: null,
  },
};

const ANNUAL_MULTIPLIER = 0.80;

const CURRENCY_SYMBOLS = { USD: '$', INR: '₹', EUR: '€' };
const CURRENCY_LABELS = { USD: 'USD', INR: 'INR', EUR: 'EUR' };

function computePrice(tier, currency, isAnnual) {
  const config = PRICING_MATRIX[tier][currency];
  if (!config) return null;
  const base = config.monthly * config.tariff;
  return isAnnual ? Math.round(base * ANNUAL_MULTIPLIER) : Math.round(base);
}

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currency, setCurrency] = useState('USD');

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

  const TIERS = [
    {
      id: 'starter',
      name: 'Starter',
      desc: 'Perfect for early-stage projects.',
      features: ['5 Active Pipelines', '50 Data Rows /mo', '5 GB Data Retention'],
      cta: 'Choose Starter',
      featured: false,
    },
    {
      id: 'professional',
      name: 'Professional',
      desc: 'For growing data teams.',
      features: ['Unlimited Pipelines', '500k Data Rows /mo', 'Advanced AI Schema Mapping', 'Key Retention'],
      cta: 'Choose Pro',
      featured: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      desc: 'Full power for large organizations.',
      features: ['Dedicated Infrastructure', 'Custom SLA & Support', 'Employee Deployment'],
      cta: 'Contact Sales',
      featured: false,
    },
  ];

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}
      className="bg-light-tinted"
    >
      {/* Floating blurred blobs */}
      <div aria-hidden="true" className="float-blob float-blob-c" style={{ width: 600, height: 600, top: '-20%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(37,99,235,0.07)' }} />
      <div aria-hidden="true" className="float-blob float-blob-a" style={{ width: 300, height: 300, bottom: '10%', right: '-5%', background: 'rgba(87,27,193,0.08)' }} />
      <div aria-hidden="true" className="float-blob float-blob-b" style={{ width: 250, height: 250, top: '30%', left: '-4%', background: 'rgba(180,197,255,0.06)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }} className="px-4 md:px-12">
        <div style={{ marginBottom: 56, textAlign: 'center' }} className="reveal">
          <p className="section-eyebrow">Simple, Transparent Pricing</p>
          <h2 id="pricing-heading" className="section-title" style={{ marginBottom: 16 }}>
            Scale Without Surprises
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Every tier is calculated from a live pricing matrix. Switch currencies or billing cycles — only the price nodes update.
          </p>
        </div>

        {/* Controls row — billing toggle + currency switcher */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginBottom: 48, flexWrap: 'wrap' }}>

          {/* Billing toggle */}
          <div role="group" aria-label="Billing cycle" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#8d90a0' }}>Monthly</span>

            <button
              id="billing-toggle-track"
              role="switch"
              aria-checked={isAnnual}
              aria-label="Toggle annual billing"
              onClick={() => setIsAnnual(prev => !prev)}
              style={{
                width: 44, height: 24,
                background: isAnnual ? '#2563eb' : 'var(--surface-high)',
                borderColor: isAnnual ? '#2563eb' : 'var(--outline-variant)',
                borderRadius: 9999,
                border: '1px solid var(--outline-variant)',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 200ms ease-out, border-color 200ms ease-out',
              }}
            >
              <span
                id="billing-toggle-thumb"
                aria-hidden="true"
                style={{
                  position: 'absolute', top: 3, left: 3,
                  width: 16, height: 16,
                  background: '#fff',
                  borderRadius: '50%',
                  transform: isAnnual ? 'translateX(20px)' : 'translateX(0px)',
                  transition: 'transform 200ms ease-out',
                  display: 'block',
                }}
              />
            </button>

            <span id="billing-label" style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#8d90a0' }}>
              {isAnnual ? 'Yearly' : 'Monthly'}
            </span>

            <span
              id="annual-badge"
              className="chip chip-blue"
              style={{
                opacity: isAnnual ? 1 : 0,
                transform: isAnnual ? 'scale(1)' : 'scale(0.85)',
                transition: 'opacity 200ms cubic-bezier(0.34,1.4,0.64,1), transform 200ms cubic-bezier(0.34,1.4,0.64,1)',
                fontSize: 10,
                padding: '3px 8px'
              }}
              aria-live="polite"
            >
              Save 20%
            </span>
          </div>

          {/* Currency switcher */}
          <div role="group" aria-label="Currency selector" style={{ display: 'flex', gap: 6 }}>
            {['USD', 'INR', 'EUR'].map(c => (
              <button
                key={c}
                id={`currency-btn-${c}`}
                onClick={() => setCurrency(c)}
                aria-pressed={c === currency}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  padding: '6px 14px',
                  borderRadius: 6,
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'all 200ms ease-out',
                  background: c === currency ? 'rgba(37,99,235,0.15)' : 'transparent',
                  borderColor: c === currency ? 'rgba(37,99,235,0.5)' : 'rgba(255,255,255,0.1)',
                  color: c === currency ? '#b4c5ff' : '#8d90a0',
                }}
              >
                {CURRENCY_SYMBOLS[c]} {c}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, alignItems: 'stretch' }} className="md:grid-cols-3">
          {TIERS.map(tier => (
            <article
              key={tier.id}
              aria-label={`${tier.name} plan`}
              className={`glass-card spotlight-card${tier.featured ? ' pricing-featured' : ' pricing-card'}`}
              style={{ padding: '32px 28px', position: 'relative', display: 'flex', flexDirection: 'column' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {tier.featured && (
                <div
                  aria-label="Most popular"
                  className="chip chip-blue"
                  style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: 10 }}
                >
                  ✦ Most Popular
                </div>
              )}

              <header>
                <h3 style={{ fontFamily: 'Geist, sans-serif', fontWeight: 700, fontSize: 22, color: '#e5e1e4', letterSpacing: '-0.02em', marginBottom: 8 }}>
                  {tier.name}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#8d90a0', marginBottom: 24 }}>
                  {tier.desc}
                </p>

                {/* Price display */}
                <div style={{ marginBottom: 24 }}>
                  {tier.id !== 'enterprise' ? (
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                      <span
                        aria-live="polite"
                        aria-label={`${tier.name} price`}
                        style={{ fontFamily: 'Geist, sans-serif', fontWeight: 700, fontSize: 42, color: '#e5e1e4', letterSpacing: '-0.04em' }}
                      >
                        {CURRENCY_SYMBOLS[currency]}{computePrice(tier.id, currency, isAnnual)}
                      </span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#8d90a0' }}>/mo</span>
                    </div>
                  ) : (
                    <div style={{ fontFamily: 'Geist, sans-serif', fontWeight: 700, fontSize: 42, color: '#e5e1e4', letterSpacing: '-0.04em' }}>
                      Custom
                    </div>
                  )}
                </div>
              </header>

              {/* Features list */}
              <ul style={{ listStyle: 'none', marginBottom: 28, flex: 1 }} aria-label={`${tier.name} plan features`}>
                {tier.features.map(f => (
                  <li key={f} className="pricing-feature-item" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#c3c6d7' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <circle cx="7" cy="7" r="6.5" stroke="rgba(37,99,235,0.4)"/>
                      <path d="M4.5 7l2 2 3-3" stroke="#b4c5ff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={tier.id === 'enterprise' ? '#' : '#'}
                className={tier.featured ? 'btn-primary' : 'btn-ghost'}
                style={{ textAlign: 'center', justifyContent: 'center', display: 'flex' }}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>

        {/* Bridge into Testimonials */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: 60 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#434655', marginBottom: 12 }}>
            Not sure yet? Hear from teams already running on AetherData.
          </p>
          <a href="#customers" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: 14,
            color: '#b4c5ff', textDecoration: 'none',
            transition: 'gap 200ms ease-out',
          }}
          onMouseEnter={e => e.currentTarget.style.gap = '10px'}
          onMouseLeave={e => e.currentTarget.style.gap = '6px'}
          >
            Read customer stories
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
