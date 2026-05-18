import React from 'react';

//Import Core UI and Bootsrap
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Import Global Styles
import './css/global.css';

//Import Components
import Header from './components/Header';
import TopFold from './components/TopFold';
import Services from './components/Services';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Clients from './components/Clients';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <TopFold />
      
      <section id='gradient'>
          <Services />
          <Projects />
          <Experience />
          <Skills /> 
      </section>

      <section id='gradient2'>
        <Clients />
        <News />
      </section>

      <Contact />
      <Footer />
    </div>
  );
}

export default App;