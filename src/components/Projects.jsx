import React, { useState, useEffect } from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import styles from '../css/Project.module.css';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { createClient } from 'contentful';

// Contentful client setup
const client = createClient({
  space: '7wddt967mgfr',
  accessToken: 'HDc3S_flilPqMp3DMm0LTOMpUWIhlDnLdjeTn8nyekY',
});

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [projectLists, setProjectLists] = useState([]);

  const handleCatLinks = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    client.getEntries({ content_type: 'cvProjects' })
      .then((response) => {

        const projectData = response.items.map((item) => {
          const imageUrl = item.fields.image[0]?.fields.file.url;
          return {
            id: item.sys.id,
            title: item.fields.title,
            description: item.fields.description.content[0]?.content[0]?.value || '',
            categories: item.fields.categories || [],
            imageUrl: `https:${imageUrl}`,
            date: item.fields.date,
          };
        });

        setProjectLists(projectData);

        console.log("Contentful Items", projectData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <CContainer>
        <CRow>
          <CCol>
            <h1 className={styles.title}>My Recent Works</h1>
            <h4 className={`mb-5 ${styles.subtitle}`}>
              Showcases a collection of my latest projects, highlighting the quality and creativity of my work.
            </h4>
          </CCol>
        </CRow>

        <CRow>
          <CCol className={styles.blueBox}>
            <ul className={styles.ul}>
              <li
                className={`${styles.li} ${activeIndex === 0 ? styles.active : ''}`}
                onClick={() => handleCatLinks(0)}
              >
                All Designs
              </li>
              <li
                className={`${styles.li} ${activeIndex === 1 ? styles.active : ''}`}
                onClick={() => handleCatLinks(1)}
              >
                App Designs
              </li>
              <li
                className={`${styles.li} ${activeIndex === 2 ? styles.active : ''}`}
                onClick={() => handleCatLinks(2)}
              >
                Branding
              </li>
              <li
                className={`${styles.li} ${activeIndex === 3 ? styles.active : ''}`}
                onClick={() => handleCatLinks(3)}
              >
                UX/UI Designs
              </li>
            </ul>
          </CCol>
        </CRow>

        <CRow className="mt-5">
          {projectLists.map((project) => (
            <CCol key={project.id} md={4} className="mb-4">
              <img
                src={project.imageUrl}
                className="img-fluid w-100"
                alt={project.title}
              />
              <CRow className="mt-3">
                <CCol>
                  <h4 className={styles.name}>{project.title}</h4>
                  <p className={styles.category}>{project.categories.join(', ')}</p>
                  {/* <p>{project.description}</p> */}
                </CCol>
                <CCol className="text-end">
                  <a href="#">
                    <ArrowRightIcon className={styles.icon} />
                  </a>
                </CCol>
              </CRow>
            </CCol>
          ))}
        </CRow>
      </CContainer>
    </div>
  );
}

export default Projects;
