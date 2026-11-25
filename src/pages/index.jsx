import SEO from '../components/SEO';
import TopFold from '../components/TopFold';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Clients from '../components/Clients';
import News from '../components/News';
import Contact from '../components/Contact';
import { getProjects } from '../lib/projects';
import { plainText } from '../lib/site';
export default function Home({ projects }) { return (<>
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
                  <Projects initialProjects={projects} />
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
            </>); }
export async function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'no-store');
  const projects = (await getProjects()).map(({ id, title, description, categories, images }) => ({
    id,
    title,
    description: plainText(description).slice(0, 160),
    categories,
    images: images.slice(0, 1),
  }));
  return { props: { projects } };
}
