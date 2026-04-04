import { FloatingNav } from './components/ui/floating-navbar.jsx';
import Header from './reusable/Header.jsx';
import MainSection from './Sections/MainSection.jsx';
import AboutSection from './Sections/AboutSection.jsx';
import './App.css'

function App() {


  return (
    <>
      <div className='flex flex-col bg-background h-screen overflow-hidden'>
        <Header />
        <div className='flex-1 overflow-y-auto' >
          <MainSection />
        </div>
      </div>
      <AboutSection />
    </>
  )
}

export default App;