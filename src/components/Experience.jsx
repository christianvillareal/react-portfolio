import { CContainer, CRow, CCol } from '@coreui/react';
import styles from '../css/Experience.module.css';

const experiences = [
  {
    id: 1,
    period: "Jan. 2019 - Mar. 2026",
    title: "Sr. Front End Developer",
    company: "Front End Developer @Customer Benefits SVCS",
    description: "I focus on translating design concepts into interactive and functional web applications.",
  },
  {
    id: 2,
    period: "Dec. 2017 - Dec. 2018",
    title: "Web/Graphic Designer",
    company: "Web Graphic Designer @Solar Systems Philippines Inc.",
    description: "I create visually stunning and user-friendly designs for websites.",
  },
  {
    id: 3,
    period: "Sept. 2017 - Nov. 2017",
    title: "Jr. Front End Developer",
    company: "Jr. Front End Developer @Plane Mobile Biz Club",
    description: "I am dedicated to improving the usability and visual appeal of web applications.",
  },
  {
    id: 4,
    period: "April 2017 - Aug. 2017",
    title: "Front End Developer",
    company: "Jr. Website Designer @Mopro Philippines",
    description: "I specialize in creating responsive and visually appealing user interfaces.",
  }
];

function Experience() {
  // Background image style with PUBLIC_URL
  const cardBackgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/exp-shape.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left top',
    backgroundSize: '61px',
  };

  return (
    <CContainer className='my-4'>
      <CRow>
        <CCol md={12}>
          <h1 className={styles.title}>My Experience</h1>
          <h4 className={`mb-5 ${styles.subtitle}`}>
            Outlines my professional journey and the skills I've acquired along the way.
          </h4>
        </CCol>
      </CRow>

      <CRow className="g-4">
        {experiences.map((exp) => (
          <CCol key={exp.id} md={6} xs={6}>
            
            <div className={styles.card} style={cardBackgroundStyle}>
              <h4 className={styles.period}>{exp.period}</h4>
              <h2 className={styles.title2}>{exp.title}</h2>
              <p className={styles.description}>
                <b>{exp.company}</b> {exp.description}
              </p>
            </div>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  );
}

export default Experience;