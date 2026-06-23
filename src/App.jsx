import CustomProgressBar from './reusable/ScrollTracker.jsx';
import BackToTop from './reusable/BackToTop.jsx';
import Header from './reusable/Header.jsx';
import HeroSection from './Sections/HeroSection.jsx';
import AboutSection from './Sections/AboutSection.jsx';
import ProjectsSection from './Sections/ProjectsSection.jsx';
import ContactSection from './Sections/ContactSection.jsx';
import './App.css';
import { IconHome, IconUser, IconBriefcase, IconMessage } from '@tabler/icons-react';
import { useRef, useEffect } from 'react';

// Ordered list of section IDs — must match the JSX order below.
const SECTION_IDS = ['home', 'about', 'projects', 'contact'];

function App() {
  const containerRef = useRef(null);

  // Single boolean lock: true while a programmatic scroll is in flight.
  const isScrolling = useRef(false);
  const scrollLockTimer = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const navItems = [
    { name: "Home", link: "#home", icon: <IconHome className="h-4 w-4" /> },
    { name: "About", link: "#about", icon: <IconUser className="h-4 w-4" /> },
    { name: "Projects", link: "#projects", icon: <IconBriefcase className="h-4 w-4" /> },
    { name: "Contact", link: "#contact", icon: <IconMessage className="h-4 w-4" /> },
  ];
  const links = { home: '#home', about: '#about', projects: '#projects', contact: '#contact' };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Which section index is currently snapped to?
    const getActiveIndex = () =>
      Math.round(container.scrollTop / container.clientHeight);

    const handleWheel = (e) => {
      // ── ALWAYS block native scroll ──────────────────────────────────────
      // Without this, the browser's own snap logic fires in parallel with
      // our programmatic scrollTo, which is the root cause of the wobble
      // and section-skipping on non-About sections.
      e.preventDefault();

      // Already animating → swallow the event silently.
      if (isScrolling.current) return;

      // Ignore trackpad inertia tails and accidental micro-nudges.
      if (Math.abs(e.deltaY) < 15) return;

      const currentIdx = getActiveIndex();
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIdx = currentIdx + direction;

      // Don't scroll past the first or last section.
      if (nextIdx < 0 || nextIdx >= SECTION_IDS.length) return;

      isScrolling.current = true;

      // ── The key fix: scroll the container to an EXACT snap point ────────
      // scrollTo() on the snap container works WITH snap-mandatory.
      // scrollIntoView() (old approach) creates a competing animation → wobble.
      container.scrollTo({
        top: nextIdx * container.clientHeight,
        behavior: 'smooth',
      });

      // Release lock after the smooth-scroll animation settles.
      // 900 ms is safe for all browsers; landing exactly on a snap point
      // means snap-mandatory has nothing to "correct" afterward.
      clearTimeout(scrollLockTimer.current);
      scrollLockTimer.current = setTimeout(() => {
        isScrolling.current = false;
      }, 900);
    };

    // ── Why BUBBLE phase (no capture flag)? ─────────────────────────────
    // StickyScroll registers its wheel handler with { capture: true } on
    // its own div. When the cursor is over the About section, StickyScroll
    // intercepts the event in the capture phase AND calls stopPropagation(),
    // so this handler is NEVER reached while About owns the scroll.
    // For every other section the event bubbles up to <main> normally.
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollLockTimer.current);
    };
  }, []);

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
          <AboutSection />
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