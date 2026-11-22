import { Link } from 'react-router-dom';
import './home.css';

export const route = {
  path: '/',
  layout: 'public',
  access: 'public'
};

const insurance = [
  { id: 'life', number: '01', name: 'Life Insurance', short: 'Financial protection for the people who matter most.', tone: 'life', icon: 'life' },
  { id: 'fire', number: '02', name: 'Fire Insurance', short: 'Protection for property against covered fire-related losses.', tone: 'fire', icon: 'fire' },
  { id: 'marine', number: '03', name: 'Marine Insurance', short: 'Cover for ships, cargo and goods during sea transportation.', tone: 'marine', icon: 'marine' },
  { id: 'health', number: '04', name: 'Health Insurance', short: 'Support with eligible medical and hospital expenses.', tone: 'health', icon: 'health' }
];

function InsuranceMark({ type }) {
  if (type === 'life') {
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d="M50 78 19 49C1 30 27 8 45 26l5 6 5-6c18-18 44 4 26 23L50 78Z" />
        <path d="M16 57c10-8 20-8 29 0l5 5 5-5c9-8 19-8 29 0M25 72c9-5 17-4 25 3 8-7 16-8 25-3" />
        <path d="M33 45c5 1 9 4 13 9m21-9c-5 1-9 4-13 9" />
      </svg>
    );
  }
  if (type === 'fire') {
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d="M54 10c4 17-5 22-1 34 3 8 10 9 12 19 2 10-5 20-16 20-14 0-23-10-22-23 1-11 8-18 10-29 8 6 10 13 10 18 8-10 9-23 7-39Z" />
        <path d="M49 53c2 8-5 11-4 18 1 5 4 8 9 8 7 0 11-6 9-12-1-4-5-7-7-12-1 5-3 7-7 8" />
      </svg>
    );
  }
  if (type === 'marine') {
    return (
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d="M10 39c10-10 20-10 30 0s20 10 30 0 20-10 20 0M10 57c10-10 20-10 30 0s20 10 30 0 20-10 20 0M10 75c10-10 20-10 30 0s20 10 30 0 20-10 20 0" />
        <path d="M20 23c8-6 16-6 24 0m12 0c8-6 16-6 24 0" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 9 82 21v25c0 21-13 35-32 45C31 81 18 67 18 46V21L50 9Z" />
      <path d="M50 31v35M32.5 48.5h35" />
    </svg>
  );
}

function ChartBackdrop() {
  return (
    <div className="chart-backdrop" aria-hidden="true">
      <svg viewBox="0 0 520 360" preserveAspectRatio="xMidYMid meet">
        <path d="M28 310H492M28 250H492M28 190H492M28 130H492" />
        <rect x="68" y="218" width="34" height="92" rx="5" />
        <rect x="124" y="178" width="34" height="132" rx="5" />
        <rect x="180" y="142" width="34" height="168" rx="5" />
        <rect x="236" y="104" width="34" height="206" rx="5" />
        <rect x="292" y="70" width="34" height="240" rx="5" />
        <path d="m52 198 88-45 62 12 78-75 70 14 100-70" />
        <path d="m430 34 20 0-2 20" />
        <circle cx="140" cy="153" r="5" />
        <circle cx="202" cy="165" r="5" />
        <circle cx="280" cy="90" r="5" />
        <circle cx="350" cy="104" r="5" />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <main className="commerce-home">
      <div className="home-grid-pattern" aria-hidden="true" />
      <ChartBackdrop />
      <header className="home-header">
        <Link to="/" className="home-brand" aria-label="Commerce City home">
          <span className="brand-emblem"><span /></span>
          <span>COMMERCE <b>CITY</b></span>
        </Link>
        <span className="school-chip">S N PUBLIC SCHOOL <i /> CLASS XI</span>
      </header>

      <section className="home-hero">
        <p className="home-kicker"><span /> BUSINESS STUDIES EXHIBITION</p>
        <h1>WELCOME TO<br /><span>COMMERCE CITY</span></h1>
        <p className="school-name">S N PUBLIC SCHOOL</p>
        <div className="hero-rule"><span /><i /><span /></div>
        <p className="hero-intro">Understand how insurance helps protect lives, property, journeys and health.</p>
      </section>

      <section className="definition-section" aria-labelledby="definition-heading">
        <div className="section-heading compact-heading">
          <span className="section-index">01 / THE BASICS</span>
          <h2 id="definition-heading">WHAT IS INSURANCE?</h2>
        </div>
        <article className="definition-card">
          <div className="definition-symbol" aria-hidden="true">
            <svg viewBox="0 0 48 48"><path d="M24 4 40 10v12c0 11-7 18-16 22C15 40 8 33 8 22V10l16-6Z" /><path d="m16 24 5 5 11-12" /></svg>
          </div>
          <p>Insurance is a financial safety plan where you pay a premium and the company compensates you if a covered loss happens.</p>
        </article>
      </section>

      <section className="types-section" aria-labelledby="types-heading">
        <div className="section-heading">
          <div>
            <span className="section-index">02 / EXPLORE THE SUBJECT</span>
            <h2 id="types-heading">TYPES OF INSURANCE</h2>
          </div>
          <p>Four ways to understand financial protection.</p>
        </div>

        <div className="insurance-list">
          {insurance.map(item => (
            <Link className={`insurance-card ${item.tone}`} to={`/insurance/${item.id}`} key={item.id}>
              <span className="card-number">CARD {item.number}</span>
              <span className="insurance-mark"><InsuranceMark type={item.icon} /></span>
              <span className="insurance-copy">
                <strong>{item.name}</strong>
                <small>{item.short}</small>
              </span>
              <span className="card-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
              </span>
            </Link>
          ))}
        </div>
        <p className="tap-hint"><span /> Tap any type to explore details.</p>
      </section>

      <footer className="home-footer">
        <div><strong>COMMERCE CITY</strong><span>CLASS XI · BUSINESS STUDIES</span></div>
        <span>S N PUBLIC SCHOOL</span>
      </footer>
    </main>
  );
}
