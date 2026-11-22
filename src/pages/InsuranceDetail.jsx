import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import './detail.css';

export const route = {
  path: '/insurance/:type',
  layout: 'public',
  access: 'public'
};

const content = {
  life: {
    name: 'Life Insurance',
    eyebrow: 'PROTECTING PEOPLE AND FAMILIES',
    definition: 'Life insurance is a contract that provides financial protection to your family, paying out money on death or when policy conditions are met.',
    features: [
      'Provides financial protection against the risk of death.',
      'Requires payment of premiums.',
      'Offers coverage for a specified period or lifetime, depending on the policy.',
      'Some policies provide maturity benefits.',
      'Benefits depend on policy terms and conditions.'
    ],
    benefits: [
      'Provides financial security to family members.',
      'Helps replace lost income.',
      'Supports long-term financial planning.',
      'Some policies offer savings and maturity benefits.',
      'Provides peace of mind.'
    ]
  },
  fire: {
    name: 'Fire Insurance',
    eyebrow: 'PROTECTING PROPERTY AND BUSINESS',
    definition: 'Fire insurance is a contract that provides financial compensation for covered losses or damage to property caused by fire.',
    features: [
      'Covers insured property against specified fire-related risks.',
      'Requires payment of premiums.',
      'Coverage depends on policy terms and conditions.',
      'Provides compensation for covered losses.',
      'Requires assessment of damage before settlement.'
    ],
    benefits: [
      'Protects businesses and property financially.',
      'Helps recover from unexpected fire losses.',
      'Reduces financial uncertainty.',
      'Supports business recovery.',
      'Provides peace of mind to property owners.'
    ]
  },
  marine: {
    name: 'Marine Insurance',
    eyebrow: 'PROTECTING GOODS IN TRANSIT',
    definition: 'Marine insurance provides financial protection against covered losses or damage to ships, cargo and goods during transportation by sea.',
    features: [
      'Covers ships and vessels under applicable policies.',
      'Provides protection for goods during marine transportation.',
      'Covers specified risks during transit.',
      'Requires payment of premiums.',
      'Compensation depends on policy conditions.'
    ],
    benefits: [
      'Reduces financial risks during transportation.',
      'Protects valuable cargo.',
      'Supports international trade.',
      'Helps businesses manage transportation losses.',
      'Provides financial security to traders and shipping businesses.'
    ]
  },
  health: {
    name: 'Health Insurance',
    eyebrow: 'PROTECTING HEALTH AND WELLBEING',
    definition: 'Health insurance is a contract that helps cover eligible medical and hospital expenses in exchange for regular premium payments.',
    features: [
      'Provides coverage for eligible medical expenses.',
      'Offers cashless treatment at network hospitals where available.',
      'May cover hospitalisation expenses.',
      'Different policies offer different coverage limits.',
      'Coverage depends on policy terms, exclusions and waiting periods.'
    ],
    benefits: [
      'Reduces the financial burden of medical treatment.',
      'Provides access to eligible healthcare services.',
      'Helps protect personal savings.',
      'Offers financial support during medical emergencies.',
      'Provides peace of mind.'
    ]
  }
};

const tones = {
  life: { label: '01', theme: 'life', symbol: 'heart' },
  fire: { label: '02', theme: 'fire', symbol: 'flame' },
  marine: { label: '03', theme: 'marine', symbol: 'waves' },
  health: { label: '04', theme: 'health', symbol: 'shield' }
};

function DetailSymbol({ type }) {
  if (type === 'heart') {
    return <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 78 19 49C1 30 27 8 45 26l5 6 5-6c18-18 44 4 26 23L50 78Z" /><path d="M16 57c10-8 20-8 29 0l5 5 5-5c9-8 19-8 29 0" /></svg>;
  }
  if (type === 'flame') {
    return <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M54 10c4 17-5 22-1 34 3 8 10 9 12 19 2 10-5 20-16 20-14 0-23-10-22-23 1-11 8-18 10-29 8 6 10 13 10 18 8-10 9-23 7-39Z" /><path d="M49 53c2 8-5 11-4 18 1 5 4 8 9 8 7 0 11-6 9-12-1-4-5-7-7-12-1 5-3 7-7 8" /></svg>;
  }
  if (type === 'waves') {
    return <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M10 39c10-10 20-10 30 0s20 10 30 0 20-10 20 0M10 57c10-10 20-10 30 0s20 10 30 0 20-10 20 0M10 75c10-10 20-10 30 0s20 10 30 0 20-10 20 0" /></svg>;
  }
  return <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 9 82 21v25c0 21-13 35-32 45C31 81 18 67 18 46V21L50 9Z" /><path d="M50 31v35M32.5 48.5h35" /></svg>;
}

function PointsSection({ title, points, kind }) {
  return (
    <section className={`detail-points-section ${kind}`}>
      <div className="detail-section-heading">
        <span className="detail-overline">COMMERCE CITY / {kind === 'features' ? '01' : '02'}</span>
        <h2>{title}</h2>
      </div>
      <ol className="detail-points">
        {points.map((point, index) => (
          <li key={point}>
            <span className="detail-point-number">{String(index + 1).padStart(2, '0')}</span>
            <p>{point}</p>
            <span className="detail-point-rule" />
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function InsuranceDetail() {
  const { type } = useParams();
  const item = content[type];
  const tone = tones[type];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [type]);

  if (!item || !tone) return <Navigate to="/" replace />;

  return (
    <main className={`insurance-detail ${tone.theme}`}>
      <div className="detail-pattern" aria-hidden="true" />
      <header className="detail-header">
        <Link to="/" className="detail-brand"><span className="detail-brand-mark" /> COMMERCE CITY</Link>
        <Link to="/" className="back-home"><span aria-hidden="true">←</span> BACK TO HOME</Link>
      </header>

      <section className="detail-hero">
        <div className="detail-hero-copy">
          <span className="detail-kicker">INSURANCE GUIDE <i /> TYPE {tone.label}</span>
          <h1>{item.name}</h1>
          <p>{item.eyebrow}</p>
        </div>
        <div className="detail-hero-symbol"><DetailSymbol type={tone.symbol} /></div>
      </section>

      <section className="detail-definition">
        <span className="detail-overline">UNDERSTANDING THE CONCEPT</span>
        <h2>DEFINITION</h2>
        <p>{item.definition}</p>
      </section>

      <PointsSection title={`FEATURES OF ${item.name.toUpperCase()}`} points={item.features} kind="features" />
      <PointsSection title={`BENEFITS OF ${item.name.toUpperCase()}`} points={item.benefits} kind="benefits" />

      <nav className="detail-explore" aria-label="Explore other insurance types">
        <span className="detail-overline">CONTINUE EXPLORING</span>
        <div>
          {Object.entries(content).filter(([key]) => key !== type).map(([key, value]) => (
            <Link key={key} to={`/insurance/${key}`}>{value.name}<span aria-hidden="true">↗</span></Link>
          ))}
        </div>
      </nav>

      <footer className="detail-footer">
        <span>S N PUBLIC SCHOOL</span>
        <span>CLASS XI · BUSINESS STUDIES</span>
      </footer>
    </main>
  );
}
