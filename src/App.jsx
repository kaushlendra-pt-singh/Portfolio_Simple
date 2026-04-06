import { FloatingNav } from './components/ui/floating-navbar.jsx';
import Header from './reusable/Header.jsx';
import HeroSection from './Sections/HeroSection.jsx';
import AboutSection from './Sections/AboutSection.jsx';
import ProjectsSection from './Sections/ProjectsSection.jsx';
import ContactSection from './Sections/ContactSection.jsx';
import './App.css'
import { IconHome, IconUser, IconBriefcase, IconMessage } from '@tabler/icons-react';
import { useRef } from 'react';

function App() {

  const containerRef = useRef(null);

  const navItems = [
    { name: "Home", link: "#home", icon: <IconHome className="h-4 w-4" /> },
    { name: "About", link: "#about", icon: <IconUser className="h-4 w-4" /> },
    { name: "Projects", link: "#projects", icon: <IconBriefcase className="h-4 w-4" /> },
    { name: "Contact", link: "#contact", icon: <IconMessage className="h-4 w-4" /> },
  ];
  const links = {

    home: '#home'
    ,

    about: '#about'
    ,

    projects: '#projects'
    ,

    contact: '#contact'
    ,
  };

  return (
    <main ref={containerRef} className='relative h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth bg-background'>
      {/* Keep it commented, otherwise will have to change the architecture of whole page. */}
      {/* <FloatingNav containerRef={containerRef} navItems={navItems} /> */}
      <section id='home' className='snap-start flex flex-col bg-background h-screen w-full overflow-hidden'>
        <Header links={links} />
        <div className='flex-1 w-full overflow-y-auto' >
          <HeroSection />
        </div>
      </section>
      <section id='about' className='snap-start'>
        <AboutSection />
      </section>
      <section id='projects' className='snap-start'>
        <ProjectsSection />
      </section>
      <section id='contact' className='snap-start'>
        <ContactSection />
      </section>
    </main>
  )
}

export default App;