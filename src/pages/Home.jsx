import { useState } from 'react';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import './home.css';

export const route = {
  path: '/',
  layout: 'public',
  access: 'public'
};

const scenes = [
  {
    id: 'life',
    label: 'Life insurance',
    eyebrow: 'Protection for the people who matter',
    title: 'A family’s financial future, protected.',
    description: 'See how life insurance can help a family manage the financial impact of an unexpected loss.',
    benefits: [
      'Provides financial support to the nominee after the insured person’s death, subject to policy terms.',
      'Can help a family manage everyday expenses and outstanding loans.',
      'Some plans offer a maturity benefit if the insured person survives the policy term.',
      'Helps families plan for long-term financial security.'
    ],
    note: 'The actual benefit depends on the policy, exclusions and terms.'
  },
  {
    id: 'fire',
    label: 'Fire insurance',
    eyebrow: 'Cover for property and business',
    title: 'A business can recover after a fire.',
    description: 'Explore how fire insurance can help a shop owner recover from accidental fire damage.',
    benefits: [
      'Can cover insured loss or damage to buildings, stock and contents caused by fire.',
      'Helps reduce the financial burden of repairing or replacing insured property.',
      'Supports business recovery after a covered incident.',
      'Coverage depends on the sum insured, exclusions and policy conditions.'
    ],
    note: 'A claim is assessed under the policy wording and applicable conditions.'
  }
];

function BrandMark() {
  return (
    <Link to="/" className="brand" aria-label="Commerce City home">
      <span className="brand-mark"><ApperIcon name="shield-check" size={19} /></span>
      <span className="brand-copy">
        <strong>COMMERCE CITY</strong>
        <small>LEARN. UNDERSTAND. PROTECT.</small>
      </span>
    </Link>
  );
}

function CityScene({ type, replayKey }) {
  return (
    <div className={`scene scene-${type}`} key={replayKey} aria-label={type === 'life' ? 'Illustrated family protection scenario' : 'Illustrated shop fire insurance scenario'} role="img">
      <div className="scene-sky" />
      <div className="scene-sun" />
      <div className="scene-cloud cloud-one" />
      <div className="scene-cloud cloud-two" />
      <div className="scene-building building-one"><span /><span /><span /></div>
      <div className="scene-building building-two"><span /><span /><span /></div>
      <div className="scene-road"><i /><i /><i /></div>
      {type === 'life' ? (
        <>
          <div className="scene-home"><div className="roof" /><div className="home-body"><span className="home-window" /><span className="home-door" /></div></div>
          <div className="family-figure adult"><i /><b /><em /></div>
          <div className="family-figure child"><i /><b /><em /></div>
          <div className="scene-shield"><ApperIcon name="shield-check" size={28} /></div>
          <div className="scene-caption">A family's tomorrow matters.</div>
        </>
      ) : (
        <>
          <div className="shop-front"><div className="shop-awning" /><div className="shop-sign">YOUR SHOP</div><div className="shop-window" /><div className="shop-door" /></div>
          <div className="flame flame-a" />
          <div className="flame flame-b" />
          <div className="smoke smoke-a" />
          <div className="shop-owner"><i /><b /><em /></div>
          <div className="scene-shield"><ApperIcon name="shield-check" size={28} /></div>
          <div className="scene-caption">A stronger path to recovery.</div>
        </>
      )}
      <div className="scene-label">{type === 'life' ? 'LIFE PROTECTION' : 'PROPERTY PROTECTION'}</div>
    </div>
  );
}

function BenefitsFrame({ scene, onClose }) {
  return (
    <div className="benefit-backdrop" role="presentation" onClick={onClose}>
      <section className="benefit-frame" role="dialog" aria-modal="true" aria-labelledby="benefit-heading" onClick={event => event.stopPropagation()}>
        <div className="frame-corner corner-tl" />
        <div className="frame-corner corner-tr" />
        <div className="frame-corner corner-bl" />
        <div className="frame-corner corner-br" />
        <div className="frame-emblem"><ApperIcon name="shield-check" size={22} /></div>
        <p className="frame-kicker">THE VALUE OF PROTECTION</p>
        <h2 id="benefit-heading">{scene.label} benefits</h2>
        <div className="frame-rule"><span /><i /><span /></div>
        <ol className="benefit-list">
          {scene.benefits.map((benefit, index) => (
            <li key={benefit}>
              <span className="benefit-number">{String(index + 1).padStart(2, '0')}</span>
              <p>{benefit}</p>
            </li>
          ))}
        </ol>
        <p className="frame-note">{scene.note}</p>
        <button className="frame-close" onClick={onClose}>Continue exploring <ApperIcon name="arrow-right" size={16} /></button>
      </section>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [showBenefits, setShowBenefits] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const scene = scenes[active];

  const selectScene = index => {
    setActive(index);
    setShowBenefits(false);
    setReplayKey(value => value + 1);
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <BrandMark />
        <nav className="top-nav" aria-label="Main navigation">
          <a href="#explore">Explore</a>
          <a href="#about">About the project</a>
          <a href="#learn">Key concepts</a>
        </nav>
        <a className="top-cta" href="#explore">Explore insurance <ApperIcon name="arrow-up-right" size={15} /></a>
      </header>

      <main>
        <section className="hero" id="about">
          <div className="hero-copy">
            <p className="eyebrow"><span /> CLASS XI · BUSINESS STUDIES PROJECT</p>
            <h1>Welcome to<br /><em>Commerce City.</em></h1>
            <p className="hero-description">Understand how insurance protects people, families and businesses when the unexpected happens.</p>
            <div className="hero-actions">
              <a className="button-primary" href="#explore">Explore the experience <ApperIcon name="arrow-down" size={17} /></a>
              <span className="hero-caption"><ApperIcon name="book-open" size={16} /> An interactive learning project</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Illustration of a protected city">
            <div className="hero-art-sun" />
            <div className="hero-city-line city-back"><i /><i /><i /><i /></div>
            <div className="hero-city-line city-front"><i /><i /><i /><i /><i /></div>
            <div className="hero-road"><span /></div>
            <div className="hero-protection"><ApperIcon name="shield-check" size={48} /><span>PEACE OF MIND</span></div>
            <div className="hero-art-label">A CITY BUILT ON SECURITY</div>
          </div>
          <div className="hero-bottomline"><span>01 / 02</span><span>PEOPLE · PROPERTY · PEACE OF MIND</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section className="intro-strip" id="learn">
          <div><span className="strip-index">01</span><p><strong>What is insurance?</strong><br />A contract that helps protect against specified financial losses.</p></div>
          <div><span className="strip-index">02</span><p><strong>Why does it matter?</strong><br />It helps people and businesses prepare for uncertainty.</p></div>
          <div><span className="strip-index">03</span><p><strong>What will you explore?</strong><br />Life insurance and fire insurance through scenarios.</p></div>
        </section>

        <section className="experience-section" id="explore">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> THE INTERACTIVE EXPERIENCE</p>
              <h2>Protection, in real life.</h2>
            </div>
            <p className="section-aside">Choose a situation. Watch what happens.<br />Discover how insurance can help.</p>
          </div>

          <div className="experience-tabs" role="tablist" aria-label="Choose an insurance scenario">
            {scenes.map((item, index) => (
              <button
                key={item.id}
                className={active === index ? 'experience-tab active' : 'experience-tab'}
                role="tab"
                aria-selected={active === index}
                onClick={() => selectScene(index)}
              >
                <span className="tab-icon"><ApperIcon name={index === 0 ? 'heart-handshake' : 'flame'} size={19} /></span>
                <span><small>0{index + 1} / INSURANCE TYPE</small><strong>{item.label}</strong></span>
                <ApperIcon name="arrow-up-right" size={18} />
              </button>
            ))}
          </div>

          <div className="experience-panel">
            <div className="scenario-copy">
              <p className="scenario-kicker">{scene.eyebrow}</p>
              <h3>{scene.title}</h3>
              <p>{scene.description}</p>
              <div className="scenario-meta"><span className="live-dot" /> SHORT SCENARIO · ABOUT 5 SECONDS</div>
              <button className="button-primary scenario-button" onClick={() => setReplayKey(value => value + 1)}>
                Replay scenario <ApperIcon name="refresh-cw" size={16} />
              </button>
              <button className="text-action" onClick={() => setShowBenefits(true)}>View insurance benefits <ApperIcon name="arrow-right" size={15} /></button>
            </div>
            <div className="scenario-visual">
              <CityScene type={scene.id} replayKey={replayKey} />
              <div className="visual-footer"><span>SCENARIO {active + 1} OF 2</span><span>ILLUSTRATIVE EDUCATIONAL VISUAL</span></div>
            </div>
          </div>
          <div className="benefit-prompt">
            <div className="prompt-seal"><ApperIcon name="sparkles" size={21} /></div>
            <div><strong>What does this protection offer?</strong><p>Open the framed benefit summary to learn the key points.</p></div>
            <button onClick={() => setShowBenefits(true)}>Discover benefits <ApperIcon name="arrow-right" size={16} /></button>
          </div>
        </section>

        <section className="concept-section">
          <div className="concept-heading">
            <p className="eyebrow"><span /> THE BIG PICTURE</p>
            <h2>Two kinds of protection.<br /><em>One thoughtful decision.</em></h2>
          </div>
          <div className="concept-cards">
            <article className="concept-card life-card">
              <div className="concept-icon"><ApperIcon name="heart-handshake" size={23} /></div>
              <p className="concept-number">01 / LIFE INSURANCE</p>
              <h3>Protect people.</h3>
              <p>Financial support for a nominee and family, according to the chosen policy and its terms.</p>
              <button onClick={() => { selectScene(0); document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore life insurance <ApperIcon name="arrow-up-right" size={15} /></button>
            </article>
            <article className="concept-card fire-card">
              <div className="concept-icon"><ApperIcon name="house" size={23} /></div>
              <p className="concept-number">02 / FIRE INSURANCE</p>
              <h3>Protect property.</h3>
              <p>Financial protection against covered fire-related loss or damage to insured property.</p>
              <button onClick={() => { selectScene(1); document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore fire insurance <ApperIcon name="arrow-up-right" size={15} /></button>
            </article>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-mark"><ApperIcon name="shield-check" size={31} /></div>
          <p className="eyebrow">COMMERCE CITY · CLASS XI</p>
          <h2>Prepare for the unexpected.<br /><em>Protect what matters.</em></h2>
          <a href="#explore" className="button-light">Explore both scenarios <ApperIcon name="arrow-up-right" size={16} /></a>
        </section>
      </main>

      <footer className="footer">
        <BrandMark />
        <p>Educational project · Business Studies · Class XI</p>
        <a href="#about">Back to top ↑</a>
      </footer>

      {showBenefits && <BenefitsFrame scene={scene} onClose={() => setShowBenefits(false)} />}
    </div>
  );
}