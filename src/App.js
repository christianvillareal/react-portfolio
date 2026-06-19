import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SEO from './components/SEO';

//Import Core UI and Bootstrap
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
import ProjectDetails from './components/ProjectDetails';

function App() {
  // Get the base URL from package.json homepage or environment
  const basename = process.env.PUBLIC_URL || '/react-portfolio';

  // Handle redirect from 404.html
  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect');
    if (redirect && redirect !== window.location.pathname) {
      // Clear it immediately to prevent loops
      sessionStorage.removeItem('redirect');
      // Navigate to the stored path using replaceState
      window.history.replaceState(null, '', redirect);
    }
  }, []);

  return (
    <Router basename={basename}>
      <div>
        <Header />
        
        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <>
              <SEO 
                title="Christian Villareal | Frontend Developer & UI/UX Designer"
                description="Frontend Developer specializing in modern web apps. View my projects in web design, development, and UX/UI. Based in Cebu, Philippines."
                keywords="React developer, frontend portfolio, web developer, UI/UX designer, JavaScript, Philippines, Christian Villareal"
                url="/"
                type="website"
              />

              {/* Home Section - matches Header nav "Home" */}
              <section id="home">
                <TopFold />
              </section>
              
              <section id='gradient'>
                {/* Services Section - matches Header nav "Services" and Footer nav "Services" */}
                <section id="services">
                  <Services />
                </section>
                
                {/* Projects/Works Section - matches Header nav "Projects" and Footer nav "Works" */}
                <section id="projects">
                  <Projects />
                </section>
                
                {/* Experience Section - matches Footer nav "Experience" */}
                <section id="experience">
                  <Experience />
                </section>
                
                {/* Skills Section - matches Footer nav "Skills" */}
                <section id="skills">
                  <Skills />
                </section>
              </section>

              <section id='gradient2'>
                {/* Clients Section - matches Header nav "Clients" */}
                <section id="clients">
                  <Clients />
                </section>
                
                {/* News/Blog Section - matches Footer nav "Blog" */}
                <section id="news">
                  <News />
                </section>
              </section>

              {/* Contact Section - matches Header nav "Contact Us" */}
              <section id="contact">
                <Contact />
              </section>
            </>
          } />
          
          {/* Project Details Route */}
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;