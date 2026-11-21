import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import ApperIcon from '@/components/ApperIcon';
import './home.css';

export const route = {
  path: '/',
  layout: 'public',
  access: 'public'
};

const LIFE_BENEFITS = [
  ['Financial Support', 'Provides financial assistance to the family after the insured person’s death.'],
  ['Family Security', 'Helps protect dependants against financial difficulties.'],
  ['Future Planning', 'Helps families plan for long-term financial goals.'],
  ['Maturity Benefit', 'Certain policies provide a maturity amount if the insured survives the policy term.'],
  ['Peace of Mind', 'Provides greater financial confidence and security.']
];

const FIRE_BENEFITS = [
  ['Financial Protection', 'Protects against covered financial losses caused by fire.'],
  ['Property Protection', 'Helps cover insured buildings, stock and goods.'],
  ['Business Recovery', 'Helps businesses recover after a fire.'],
  ['Loss Compensation', 'Provides compensation for covered losses according to policy conditions.'],
  ['Financial Security', 'Reduces the financial burden of unexpected fire damage.']
];

function makeMaterial(color, roughness = 0.8, metalness = 0) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function addBox(scene, x, y, z, w, h, d, material, cast = true) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

function addCylinder(scene, x, y, z, radius, height, material, segments = 16) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, segments), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  scene.add(mesh);
  return mesh;
}

function addSphere(scene, x, y, z, radius, material) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 12), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  scene.add(mesh);
  return mesh;
}

function makePerson(scene, x, z, palette) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  const skin = makeMaterial('#d5a17d');
  const shirt = makeMaterial(palette);
  const trousers = makeMaterial('#24354c');
  const head = addSphere(group, 0, 1.58, 0, 0.17, skin);
  const body = addCylinder(group, 0, 1.13, 0, 0.15, 0.62, shirt);
  body.rotation.z = Math.PI / 2;
  const torso = addBox(group, 0, 1.14, 0, 0.32, 0.52, 0.22, shirt);
  const legA = addBox(group, -0.09, 0.52, 0, 0.11, 0.52, 0.12, trousers);
  const legB = addBox(group, 0.09, 0.52, 0, 0.11, 0.52, 0.12, trousers);
  const armA = addBox(group, -0.23, 1.12, 0, 0.09, 0.44, 0.10, skin);
  const armB = addBox(group, 0.23, 1.12, 0, 0.09, 0.44, 0.10, skin);
  group.userData = { legA, legB, armA, armB, torso, head };
  scene.add(group);
  return group;
}

function createLifeScene(scene, animated) {
  const mats = {
    grass: makeMaterial('#93c6a0'),
    road: makeMaterial('#303b4a'),
    path: makeMaterial('#d8e0e8'),
    building: makeMaterial('#c8d8e8'),
    glass: new THREE.MeshStandardMaterial({ color: '#7eb5dc', roughness: 0.25, metalness: 0.1 }),
    white: makeMaterial('#f8fbff'),
    blue: makeMaterial('#0757cf'),
    dark: makeMaterial('#263449'),
    tyre: makeMaterial('#18212d')
  };

  addBox(scene, 0, -0.18, 0, 18, 0.25, 12, mats.grass);
  addBox(scene, 0, -0.04, 2.3, 18, 0.16, 3.6, mats.road);
  addBox(scene, 0, 0.02, -1.05, 18, 0.18, 1.25, mats.path);
  for (let i = -7; i <= 7; i += 3.5) {
    addBox(scene, i, 0.055, 2.3, 1.1, 0.025, 0.12, mats.white, false);
  }

  [-6.5, -3.4, 3.6, 6.3].forEach((x, index) => {
    const h = 2.5 + (index % 2) * 1.2;
    addBox(scene, x, h / 2, -4.4, 1.65, h, 1.4, mats.building);
    for (let y = 0.7; y < h - 0.2; y += 0.8) {
      addBox(scene, x - 0.42, y, -3.67, 0.36, 0.42, 0.035, mats.glass, false);
      addBox(scene, x + 0.42, y, -3.67, 0.36, 0.42, 0.035, mats.glass, false);
    }
  });

  const lampMat = makeMaterial('#53677b', 0.35, 0.6);
  [-5.8, 5.8].forEach(x => {
    addCylinder(scene, x, 1.5, -0.1, 0.055, 3, lampMat);
    addBox(scene, x + 0.34, 2.95, -0.1, 0.75, 0.07, 0.09, lampMat);
    addSphere(scene, x + 0.68, 2.9, -0.1, 0.11, makeMaterial('#fff2b2', 0.3));
  });

  const sun = new THREE.DirectionalLight('#fff2d2', 2.1);
  sun.position.set(-3, 8, 5);
  sun.castShadow = true;
  scene.add(sun);

  const pedestrian = makePerson(scene, -2.4, -0.85, '#2e83f4');
  const car = new THREE.Group();
  const carBody = addBox(car, 0, 0.55, 0, 1.9, 0.55, 0.95, mats.blue);
  addBox(car, -0.1, 0.96, 0, 0.95, 0.42, 0.78, mats.glass);
  [-0.62, 0.62].forEach(x => {
    [-0.52, 0.52].forEach(z => {
      const wheel = addCylinder(car, x, 0.22, z, 0.23, 0.12, mats.tyre, 20);
      wheel.rotation.z = Math.PI / 2;
    });
  });
  addBox(car, 0.97, 0.52, 0, 0.08, 0.19, 0.18, makeMaterial('#fff0bd'));
  car.position.set(7, 0, 2.3);
  scene.add(car);

  animated.push(time => {
    const cycle = (time % 5) / 5;
    const approach = Math.min(cycle / 0.66, 1);
    car.position.x = 7 - approach * 8.4;
    if (cycle < 0.70) {
      pedestrian.position.x = -2.4 + cycle * 0.48;
      pedestrian.rotation.z = 0;
      pedestrian.userData.legA.rotation.z = Math.sin(time * 7) * 0.35;
      pedestrian.userData.legB.rotation.z = -Math.sin(time * 7) * 0.35;
      pedestrian.userData.armA.rotation.z = -Math.sin(time * 7) * 0.22;
      pedestrian.userData.armB.rotation.z = Math.sin(time * 7) * 0.22;
    } else {
      const fall = Math.min((cycle - 0.70) / 0.12, 1);
      pedestrian.position.x = -1.9 + fall * 0.55;
      pedestrian.rotation.z = -fall * 1.15;
      pedestrian.position.y = -fall * 0.25;
    }
  });
}

function createFireScene(scene, animated) {
  const wall = makeMaterial('#d8e2ee');
  const floor = makeMaterial('#aab7c7');
  const blue = makeMaterial('#0757cf');
  const shelf = makeMaterial('#8a6548');
  const goods = [makeMaterial('#e6a34d'), makeMaterial('#6b9dce'), makeMaterial('#7fb28a')];
  const dark = makeMaterial('#273648');
  const glass = new THREE.MeshStandardMaterial({ color: '#8dc7e8', roughness: 0.2, metalness: 0.12 });

  addBox(scene, 0, -0.18, 0, 13, 0.25, 9, floor);
  addBox(scene, 0, 2.2, -3.5, 13, 4.5, 0.22, wall);
  addBox(scene, -6.2, 2.2, 0, 0.22, 4.5, 7, wall);
  addBox(scene, 6.2, 2.2, 0, 0.22, 4.5, 7, wall);
  addBox(scene, 0, 4.45, 0, 13, 0.2, 7, wall);

  [-4.6, -2.9, 2.9, 4.6].forEach(x => {
    addBox(scene, x, 1.55, -2.75, 0.18, 2.9, 0.75, shelf);
    [0.55, 1.45, 2.35].forEach(y => {
      addBox(scene, x, y, -2.65, 1.4, 0.08, 0.75, shelf);
      for (let j = 0; j < 3; j++) {
        addBox(scene, x - 0.42 + j * 0.4, y + 0.22, -2.65, 0.25, 0.34, 0.28, goods[(j + Math.round(x)) % 3]);
      }
    });
  });

  const board = addBox(scene, 0.6, 2.25, -3.28, 0.95, 1.35, 0.12, dark);
  addBox(scene, 0.6, 2.25, -3.19, 0.72, 1.1, 0.045, makeMaterial('#d4deea'));
  [-0.25, 0, 0.25].forEach(x => {
    addBox(scene, 0.6 + x, 2.25, -3.15, 0.12, 0.72, 0.04, dark);
  });

  const sparkMat = new THREE.MeshBasicMaterial({ color: '#ffe16a' });
  const sparks = [];
  for (let i = 0; i < 24; i++) {
    const spark = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 6), sparkMat);
    spark.position.set(0.6, 2.2, -3.05);
    scene.add(spark);
    sparks.push(spark);
  }

  const flames = [];
  const fireMat = new THREE.MeshBasicMaterial({ color: '#ff8b26', transparent: true, opacity: 0.92 });
  const innerFire = new THREE.MeshBasicMaterial({ color: '#ffd15c', transparent: true, opacity: 0.95 });
  for (let i = 0; i < 12; i++) {
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.24 + Math.random() * 0.12, 0.85 + Math.random() * 0.5, 7), i % 2 ? fireMat : innerFire);
    flame.position.set(-2.5 + Math.random() * 5, 0.45, -1.2 + Math.random() * 2);
    scene.add(flame);
    flames.push(flame);
  }

  const smokeMat = new THREE.MeshBasicMaterial({ color: '#647386', transparent: true, opacity: 0.18 });
  const smoke = [];
  for (let i = 0; i < 8; i++) {
    const cloud = new THREE.Mesh(new THREE.SphereGeometry(0.45 + Math.random() * 0.35, 9, 7), smokeMat);
    cloud.position.set(-1.8 + Math.random() * 3.6, 3 + Math.random() * 1.2, -1.3);
    scene.add(cloud);
    smoke.push(cloud);
  }

  const owner = makePerson(scene, 4.2, 1.25, '#263e62');
  const fireLight = new THREE.PointLight('#ff792d', 0, 9);
  fireLight.position.set(0, 2, -0.5);
  scene.add(fireLight);

  const keyLight = new THREE.DirectionalLight('#fff1d5', 1.5);
  keyLight.position.set(-4, 7, 5);
  keyLight.castShadow = true;
  scene.add(keyLight);

  animated.push(time => {
    const cycle = (time % 5) / 5;
    const ignition = Math.max(0, Math.min((cycle - 0.22) / 0.22, 1));
    fireLight.intensity = ignition * 3.2;
    flames.forEach((flame, index) => {
      flame.visible = cycle > 0.22;
      flame.scale.y = ignition * (0.75 + Math.sin(time * 8 + index) * 0.18);
      flame.rotation.y = time * 0.5 + index;
    });
    sparks.forEach((spark, index) => {
      const phase = (time * 2.5 + index * 0.19) % 1;
      spark.visible = cycle > 0.1 && cycle < 0.48;
      spark.position.set(0.6 + Math.sin(index * 8) * phase * 0.7, 2.2 + phase * 1.2, -3.05 + Math.cos(index * 3) * phase);
    });
    smoke.forEach((cloud, index) => {
      cloud.visible = cycle > 0.25;
      cloud.position.y = 2.7 + ((time * 0.55 + index * 0.4) % 2.2);
      cloud.scale.setScalar(0.7 + ((time + index) % 2) * 0.2);
      cloud.material.opacity = ignition * 0.18;
    });
    owner.position.x = 4.2;
    owner.rotation.z = cycle > 0.55 ? 0.08 : 0;
  });
}

function ThreeScene({ kind, onReady }) {
  const hostRef = useRef(null);
  const fallbackRef = useRef(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let renderer;
    let frame = 0;
    let observer;
    let disposed = false;
    const animated = [];
    const clock = new THREE.Clock();
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(kind === 'life' ? '#a9d9f5' : '#d7e2ee');
    scene.fog = new THREE.Fog(scene.background, 15, 32);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(kind === 'life' ? 0 : 0, kind === 'life' ? 7.4 : 6.8, kind === 'life' ? 12.8 : 12.2);
    camera.lookAt(0, 1, 0);

    scene.add(new THREE.HemisphereLight('#eaf6ff', '#5d6e83', 2.0));
    const ambient = new THREE.AmbientLight('#ffffff', 0.45);
    scene.add(ambient);

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      host.appendChild(renderer.domElement);
      renderer.domElement.setAttribute('aria-label', kind === 'life' ? '3D animated road accident scene' : '3D animated shop fire scene');
      if (kind === 'life') createLifeScene(scene, animated);
      else createFireScene(scene, animated);

      const resize = () => {
        if (disposed || !host.clientWidth || !host.clientHeight) return;
        const width = host.clientWidth;
        const height = host.clientHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      observer = new ResizeObserver(resize);
      observer.observe(host);
      resize();

      const render = () => {
        if (disposed) return;
        frame = requestAnimationFrame(render);
        const time = clock.getElapsedTime();
        animated.forEach(update => update(time));
        renderer.render(scene, camera);
      };
      render();
      onReady?.(true);
    } catch (error) {
      fallbackRef.current = true;
      onReady?.(false);
      host.classList.add('scene-fallback');
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
      scene.traverse(object => {
        object.geometry?.dispose?.();
        if (Array.isArray(object.material)) object.material.forEach(material => material.dispose());
        else object.material?.dispose?.();
      });
    };
  }, [kind, onReady]);

  return <div className="three-host" ref={hostRef} />;
}

function WelcomeScreen({ onNext }) {
  return (
    <main className="welcome-screen">
      <div className="welcome-blue-wash" />
      <div className="welcome-orb orb-one" />
      <div className="welcome-orb orb-two" />
      <div className="welcome-top">
        <div className="brand-symbol"><ApperIcon name="shield-check" size={25} /></div>
        <span>EDUSISTRY SHOWCASE · CLASS XI</span>
      </div>
      <div className="welcome-content">
        <div className="welcome-copy">
          <p className="welcome-eyebrow"><span /> YOUR JOURNEY TO FINANCIAL SECURITY</p>
          <h1>Welcome to<br /><strong>Commerce City.</strong></h1>
          <p>Discover how insurance protects the people and places that matter most.</p>
          <button className="welcome-next" onClick={onNext}>NEXT <ApperIcon name="arrow-right" size={18} /></button>
          <div className="welcome-caption"><span /> AN INTERACTIVE INSURANCE EXPERIENCE</div>
        </div>
        <div className="welcome-visual" aria-hidden="true">
          <div className="visual-ring ring-a" />
          <div className="visual-ring ring-b" />
          <div className="visual-building building-a" />
          <div className="visual-building building-b" />
          <div className="visual-building building-c" />
          <div className="visual-road"><span /></div>
          <div className="visual-shield"><ApperIcon name="shield-check" size={61} /></div>
          <div className="visual-glow" />
        </div>
      </div>
      <div className="welcome-bottom"><span>PEOPLE</span><i /><span>PROPERTY</span><i /><span>PEACE OF MIND</span></div>
    </main>
  );
}

function BenefitsScreen({ kind, onNext, onReplay }) {
  const life = kind === 'life';
  const benefits = life ? LIFE_BENEFITS : FIRE_BENEFITS;
  return (
    <main className="benefits-screen">
      <div className="benefit-backdrop-glow" />
      <div className="benefits-topline">
        <div className="brand-symbol small"><ApperIcon name="shield-check" size={19} /></div>
        <span>COMMERCE CITY <b> / </b> INSURANCE GUIDE</span>
        <span className="step-count">{life ? '03' : '05'} / 05</span>
      </div>
      <section className="benefit-card" aria-labelledby="benefit-title">
        <div className="benefit-card-top">
          <div className="benefit-icon"><ApperIcon name={life ? 'heart-handshake' : 'house'} size={25} /></div>
          <span className="benefit-kicker">{life ? 'PROTECTING PEOPLE' : 'PROTECTING PROPERTY'}</span>
        </div>
        <p className="benefit-overline">THE VALUE OF INSURANCE</p>
        <h1 id="benefit-title">{life ? 'LIFE INSURANCE' : 'FIRE INSURANCE'}</h1>
        <p className="benefit-subtitle">{life ? 'Financial Protection for You and Your Family.' : 'Protection Against Unexpected Fire Losses.'}</p>
        <div className="benefit-divider"><span /><i /><span /></div>
        <ol className="benefit-points">
          {benefits.map(([title, detail], index) => (
            <li key={title}>
              <span className="point-index">{String(index + 1).padStart(2, '0')}</span>
              <div><strong>{title}</strong><p>{detail}</p></div>
            </li>
          ))}
        </ol>
        <p className="benefit-disclaimer">
          {life
            ? 'Maturity benefits depend on the type of life insurance policy and its terms.'
            : 'Claim settlement is subject to policy terms, conditions, exclusions and the sum insured.'}
        </p>
        {life ? (
          <button className="benefit-next" onClick={onNext}>NEXT – FIRE INSURANCE <ApperIcon name="arrow-right" size={18} /></button>
        ) : (
          <button className="benefit-next" onClick={onReplay}>REPLAY EXPERIENCE <ApperIcon name="refresh-cw" size={17} /></button>
        )}
      </section>
      <div className="benefits-footer"><span>EDUSISTRY SHOWCASE</span><span>PROTECTION THROUGH PREPARATION</span></div>
    </main>
  );
}

export default function Home() {
  const [screen, setScreen] = useState('welcome');
  const [showNext, setShowNext] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [greetingAttempted, setGreetingAttempted] = useState(false);
  const timerRef = useRef(null);
  const greetedRef = useRef(false);

  useEffect(() => {
    if (greetedRef.current) return undefined;
    greetedRef.current = true;
    const speakGreeting = () => {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const greeting = new SpeechSynthesisUtterance('Welcome to Commerce City.');
      greeting.lang = 'en-US';
      greeting.rate = 0.92;
      greeting.pitch = 1;
      greeting.volume = 1;
      window.speechSynthesis.speak(greeting);
      setGreetingAttempted(true);
    };
    const handleReady = () => speakGreeting();
    const delay = window.setTimeout(handleReady, 250);
    return () => window.clearTimeout(delay);
  }, []);

  useEffect(() => {
    window.clearTimeout(timerRef.current);
    setShowNext(false);
    setSceneReady(false);
    if (screen === 'life' || screen === 'fire') {
      timerRef.current = window.setTimeout(() => setShowNext(true), 5000);
    }
    return () => window.clearTimeout(timerRef.current);
  }, [screen]);

  const goToScene = next => {
    window.clearTimeout(timerRef.current);
    setShowNext(false);
    setSceneReady(false);
    setScreen(next);
  };

  const replay = () => {
    window.clearTimeout(timerRef.current);
    setShowNext(false);
    setSceneReady(false);
    setScreen('welcome');
  };

  const onSceneReady = useCallback(ready => setSceneReady(ready), []);

  return (
    <div className="commerce-experience">
      {screen === 'welcome' && <WelcomeScreen onNext={() => goToScene('life')} />}
      {(screen === 'life' || screen === 'fire') && (
        <main className={`cinema-screen cinema-${screen}`}>
          <div className="cinema-topline">
            <div className="cinema-brand"><span className="brand-symbol small"><ApperIcon name="shield-check" size={18} /></span><span>COMMERCE CITY</span></div>
            <div className="cinema-progress"><span className={screen === 'life' ? 'current' : 'done'} /><span className={screen === 'fire' ? 'current' : ''} /></div>
            <span className="cinema-stage">{screen === 'life' ? 'LIFE INSURANCE' : 'FIRE INSURANCE'}</span>
          </div>
          <div className="cinema-scene-wrap">
            <ThreeScene kind={screen} onReady={onSceneReady} />
            <div className="scene-vignette" />
            <div className="scene-copy">
              <span>{screen === 'life' ? 'SCENARIO 01' : 'SCENARIO 02'} <i /></span>
              <h1>{screen === 'life' ? 'An unexpected moment.' : 'When a spark changes everything.'}</h1>
              <p>{screen === 'life' ? 'One moment can change a family’s tomorrow.' : 'A small electrical fault can put a business at risk.'}</p>
            </div>
            <div className="scene-status"><span className="status-pulse" /> {sceneReady ? '3D SCENE PLAYING' : 'PREPARING SCENE'}</div>
            {showNext && (
              <button className="cinema-next" onClick={() => goToScene(screen === 'life' ? 'lifeBenefits' : 'fireBenefits')}>
                NEXT <ApperIcon name="arrow-right" size={18} />
              </button>
            )}
            <div className="scene-timeline"><span className={showNext ? 'timeline-done' : ''} /></div>
          </div>
          <div className="cinema-foot"><span>ILLUSTRATIVE EDUCATIONAL SCENARIO</span><span>ANIMATION LOOPS · 5 SEC</span></div>
        </main>
      )}
      {screen === 'lifeBenefits' && <BenefitsScreen kind="life" onNext={() => goToScene('fire')} onReplay={replay} />}
      {screen === 'fireBenefits' && <BenefitsScreen kind="fire" onNext={() => goToScene('fire')} onReplay={replay} />}
    </div>
  );
}