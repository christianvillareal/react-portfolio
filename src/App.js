import React from 'react';

//Import Core UI and Bootsrap
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Import Global Styles
import './css/Global.module.css';

//Import Components
import Header from './components/Header';
import TopFold from './components/TopFold';
import Services from './components/Services';
import Projects from './components/Projects';
import Experience from './components/Experience';

function App() {
  return (
    <div>
      <Header />
      <TopFold />
      
      <section id='gradient'>
          <Services />
          <Projects />
          <Experience />
      </section>

    </div>
  );
}

export default App;
