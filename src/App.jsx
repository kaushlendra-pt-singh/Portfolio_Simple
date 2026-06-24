import CustomProgressBar from './reusable/ScrollTracker.jsx';
import BackToTop from './reusable/BackToTop.jsx';
import Header from './reusable/Header.jsx';
import HeroSection from './Sections/HeroSection.jsx';
import AboutSection from './Sections/AboutSection.jsx';
import ProjectsSection from './Sections/ProjectsSection.jsx';
import ContactSection from './Sections/ContactSection.jsx';
import { FloatingNav } from './components/ui/floating-navbar.jsx';
import './App.css';
import { IconHome, IconUser, IconBriefcase, IconMessage } from '@tabler/icons-react';
import { useRef, useEffect, useState } from 'react';

// Ordered list of section IDs — must match the JSX order below.
const SECTION_IDS = ['home', 'about', 'projects', 'contact'];
const DESKTOP_MQ = '(min-width: 1024px)';

// ── Custom scroll animation ─────────────────────────────────────────────────
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
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

    container.scrollTop = startTop + diff * eased;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      container.scrollTop = targetTop;
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

    const scrollToSection = (sectionId) => {
      if (isScrolling.current) return;

      const targetEl = document.getElementById(sectionId);
      if (!targetEl) return;

      isScrolling.current = true;

      container.style.scrollSnapType = 'none';
      container.style.scrollBehavior = 'auto';

      clearTimeout(safetyTimer.current);
      safetyTimer.current = setTimeout(() => {
        isScrolling.current = false;
        container.style.scrollSnapType = '';
        container.style.scrollBehavior = '';
      }, 2500);

      animateScrollTo(container, targetEl.offsetTop, 900, () => {
        container.style.scrollSnapType = '';
        container.style.scrollBehavior = '';

        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
          isScrolling.current = false;
          clearTimeout(safetyTimer.current);
        }, 100);
      });
    };

    const handleWheel = (e) => {
      e.preventDefault();

      if (isScrolling.current) {
        e.stopPropagation();
        return;
      }

      if (Math.abs(e.deltaY) < 15) return;

      const aboutSection = document.getElementById('about');
      if (aboutSection && aboutSection.contains(e.target)) return;

      const currentIdx = Math.round(container.scrollTop / container.clientHeight);
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIdx = currentIdx + direction;

      if (nextIdx < 0 || nextIdx >= SECTION_IDS.length) return;

      scrollToSection(SECTION_IDS[nextIdx]);
    };

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
      container.style.scrollSnapType = '';
    };
  }, [isDesktop]);

  return (
    <>
      <main
        ref={containerRef}
        className={`relative w-full overflow-y-auto overflow-x-hidden bg-background
          ${isDesktop ? 'h-screen snap-y snap-mandatory scroll-smooth' : 'h-screen'}`}
      >
        <CustomProgressBar containerRef={containerRef} />
        <BackToTop containerRef={containerRef} />

        {/* FloatingNav — mobile only, translucent glassmorphism */}
        <FloatingNav
          containerRef={containerRef}
          navItems={navItems}
          className="lg:hidden"
        />

        <section
          id='home'
          className={`flex flex-col bg-background w-full ${isDesktop ? 'snap-start h-screen' : 'min-h-screen'}`}
        >
          <Header links={links} />
          <div className='flex-1 w-full overflow-y-auto'>
            <HeroSection isDesktop={isDesktop} />
          </div>
        </section>

        <section
          id='about'
          className={`${isDesktop ? 'snap-start h-screen' : ''}`}
        >
          <AboutSection isDesktop={isDesktop} />
        </section>

        <section
          id='projects'
          className={`${isDesktop ? 'snap-start h-screen' : ''}`}
        >
          <ProjectsSection isDesktop={isDesktop} />
        </section>

        <section
          id='contact'
          className={`${isDesktop ? 'snap-start h-screen' : ''}`}
        >
          <ContactSection isDesktop={isDesktop} />
        </section>
      </main>
    </>
  );
}

export default App;