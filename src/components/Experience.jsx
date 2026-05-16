import { CContainer, CRow, CCol } from '@coreui/react';
import styles from '../css/Experience.module.css';

function Experience() {
  return (
    <CContainer className='my-4'>
        <CRow>
            <CCol md={12}>
                <h1 className={styles.title}>My Experience</h1>
                <h4 className={`mb-5 ${styles.subtitle}`}>
                    Outlines my professional journey and the skills I've acquired along the way.
                </h4>
            </CCol>

            <CCol md={4}>
                <div className={styles.blueBox}>
                    <h4 className={styles.h4}>Jan. 2019 - Present</h4>
                    <h2 className={styles.h2}>Sr. Front End Developer</h2>
                    <p>
                        <b>Front End Developer @Customer Benfits SVCS.</b> I focus on translating design concepts into interactive and functional web applications.
                    </p>
                </div>
            </CCol>
        </CRow>
    </CContainer>
  )
}

export default Experience