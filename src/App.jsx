import CustomProgressBar from './reusable/ScrollTracker.jsx';
import BackToTop from './reusable/BackToTop.jsx';
import Header from './reusable/Header.jsx';
import HeroSection from './Sections/HeroSection.jsx';
import AboutSection from './Sections/AboutSection.jsx';
import ProjectsSection from './Sections/ProjectsSection.jsx';
import ContactSection from './Sections/ContactSection.jsx';
import './App.css';
import { IconHome, IconUser, IconBriefcase, IconMessage } from '@tabler/icons-react';
import { useRef, useEffect, useState } from 'react';

// Ordered list of section IDs — must match the JSX order below.
const SECTION_IDS = ['home', 'about', 'projects', 'contact'];
const DESKTOP_MQ = '(min-width: 1024px)';

// ── Custom scroll animation ─────────────────────────────────────────────────
// Directly assigns container.scrollTop frame-by-frame via requestAnimationFrame.
//
// WHY THIS FIXES THE RACE CONDITION:
// The original used scrollTo({ behavior: 'smooth' }) which triggers a
// browser-managed animation. CSS snap-mandatory ALSO tries to control scroll
// during/after that animation → two competing controllers → wobble + overshoot.
//
// Direct scrollTop assignment is NOT treated as a "scroll gesture" by the
// browser. CSS snap only checks after ALL scrollTop changes stop. Since our
// animation lands on the exact snap point (section.offsetTop), CSS snap has
// nothing to correct → zero fighting, zero wobble.
function animateScrollTo(container, targetTop, duration, onComplete) {
  const startTop = container.scrollTop;
  const diff = targetTop - startTop;

  if (Math.abs(diff) < 1) {
    container.scrollTop = targetTop;
    if (onComplete) onComplete();
    return;
  }

  let startTime = null;

  function step(time) {
    if (startTime === null) startTime = time;
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease-out exponential — fast start, smooth deceleration
    // When progress is 1, eased is ~0.999, so we force to 1.
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

    container.scrollTop = startTop + diff * eased;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      container.scrollTop = targetTop; // guarantee exact landing
      if (onComplete) onComplete();
    }
  }

  requestAnimationFrame(step);
}

function App() {
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const safetyTimer = useRef(null);
  const debounceTimer = useRef(null);

  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_MQ).matches
  );

  // eslint-disable-next-line no-unused-vars
  const navItems = [
    { name: "Home", link: "#home", icon: <IconHome className="h-4 w-4" /> },
    { name: "About", link: "#about", icon: <IconUser className="h-4 w-4" /> },
    { name: "Projects", link: "#projects", icon: <IconBriefcase className="h-4 w-4" /> },
    { name: "Contact", link: "#contact", icon: <IconMessage className="h-4 w-4" /> },
  ];
  const links = { home: '#home', about: '#about', projects: '#projects', contact: '#contact' };

  // ── Track desktop vs mobile ──────────────────────────────────────────────
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_MQ);
    const onChange = (e) => setIsDesktop(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // ── Desktop-only: JS-controlled section snapping ─────────────────────────
  useEffect(() => {
    if (!isDesktop) return;
    const container = containerRef.current;
    if (!container) return;

    // Scrolls to a section using our custom animation.
    // Temporarily disables CSS snap during animation to prevent fighting,
    // then re-enables it after landing on the exact snap point.
    const scrollToSection = (sectionId) => {
      if (isScrolling.current) return; // prevent concurrent animations

      const targetEl = document.getElementById(sectionId);
      if (!targetEl) return;

      isScrolling.current = true;

      // Disable CSS snap + scroll-behavior during animation.
      // scroll-behavior:smooth causes the browser to smooth-interpolate EVERY
      // scrollTop assignment, adding ~300ms latency per frame → perceived delay.
      container.style.scrollSnapType = 'none';
      container.style.scrollBehavior = 'auto';

      // Safety timeout — prevents permanent lock if animation stalls
      clearTimeout(safetyTimer.current);
      safetyTimer.current = setTimeout(() => {
        isScrolling.current = false;
        container.style.scrollSnapType = '';
        container.style.scrollBehavior = '';
      }, 2500);

      // Use the section's actual offsetTop — this IS the CSS snap point,
      // so re-enabling snap afterwards causes zero correction/wobble.
      animateScrollTo(container, targetEl.offsetTop, 500, () => {
        // Re-enable CSS snap + scroll-behavior
        container.style.scrollSnapType = '';
        container.style.scrollBehavior = '';

        // 100ms debounce — swallows residual trackpad/wheel inertia events
        // that would otherwise leak into StickyScroll and skip first slide.
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
          isScrolling.current = false;
          clearTimeout(safetyTimer.current);
        }, 100);
      });
    };

    // ── CAPTURE-phase wheel handler ────────────────────────────────────────
    // Capture phase fires BEFORE StickyScroll's capture handler (because
    // <main> is an ancestor, and capture goes root → target). This lets us
    // block ALL events during animation — including those that would reach
    // StickyScroll and skip the first About slide.
    const handleWheel = (e) => {
      // Always block native scroll on desktop
      e.preventDefault();

      // During animation or debounce: block EVERYTHING, including StickyScroll
      if (isScrolling.current) {
        e.stopPropagation();
        return;
      }

      // Ignore trackpad inertia tails and accidental micro-nudges
      if (Math.abs(e.deltaY) < 15) return;

      // If the event is inside the About section, let StickyScroll handle it.
      // We do NOT call stopPropagation, so the event continues capture phase
      // down to StickyScroll's div where its handler picks it up.
      const aboutSection = document.getElementById('about');
      if (aboutSection && aboutSection.contains(e.target)) return;

      // ── Snap logic for non-About sections ──────────────────────────────
      const currentIdx = Math.round(container.scrollTop / container.clientHeight);
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIdx = currentIdx + direction;

      // Don't scroll past the first or last section
      if (nextIdx < 0 || nextIdx >= SECTION_IDS.length) return;

      scrollToSection(SECTION_IDS[nextIdx]);
    };

    // Handle section scroll requests from StickyScroll exits & header nav clicks
    const handleScrollToSection = (e) => {
      scrollToSection(e.detail.sectionId);
    };

    container.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    container.addEventListener('scroll-to-section', handleScrollToSection);

    return () => {
      container.removeEventListener('wheel', handleWheel, { capture: true });
      container.removeEventListener('scroll-to-section', handleScrollToSection);
      clearTimeout(safetyTimer.current);
      clearTimeout(debounceTimer.current);
      // Clean up any lingering inline snap override
      container.style.scrollSnapType = '';
    };
  }, [isDesktop]);

  return (
    <>
      <main
        ref={containerRef}
        className='relative h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-background'
      >
        <CustomProgressBar containerRef={containerRef} />
        <BackToTop containerRef={containerRef} />
        {/* <FloatingNav containerRef={containerRef} navItems={navItems} /> */}

        <section id='home' className='snap-start flex flex-col bg-background h-screen w-full'>
          <Header links={links} />
          <div className='flex-1 w-full overflow-y-auto'>
            <HeroSection />
          </div>
        </section>

        <section id='about' className='snap-start h-screen'>
          <AboutSection isDesktop={isDesktop} />
        </section>

        <section id='projects' className='snap-start h-screen'>
          <ProjectsSection />
        </section>

        <section id='contact' className='snap-start h-screen'>
          <ContactSection />
        </section>
      </main>
    </>
  );
}

export default App;