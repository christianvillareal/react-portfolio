// TopFold.jsx - Responsive with preserved CSS
import React, { useState, useEffect } from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import CustomButton from './CustomButton'
import styles from '../css/TopFold.module.css';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const roles = ['Developer', 'Designer'];

function TopFold() {

  // Function to open resume in new tab
  const openResume = () => {
    window.open(`${process.env.PUBLIC_URL}/resume.pdf`, '_blank');
  };

  // State for number shuffling animation
  const [yearsExp, setYearsExp] = useState(0);
  const [projectsCompleted, setProjectsCompleted] = useState(0);
  const [happyClients, setHappyClients] = useState(0);
  
  // State for typewriter animation
  const [currentRole, setCurrentRole] = useState('Developer');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typedText, setTypedText] = useState('');
  
  const targetYears = 9;
  const targetProjects = 99;
  const targetClients = 35;

  // Number shuffling animation
  useEffect(() => {
    let startYears = 0;
    const yearsInterval = setInterval(() => {
      if (startYears < targetYears) {
        startYears++;
        setYearsExp(startYears);
      } else {
        clearInterval(yearsInterval);
      }
    }, 50);

    let startProjects = 0;
    const projectsInterval = setInterval(() => {
      if (startProjects < targetProjects) {
        startProjects++;
        setProjectsCompleted(startProjects);
      } else {
        clearInterval(projectsInterval);
      }
    }, 40);

    let startClients = 0;
    const clientsInterval = setInterval(() => {
      if (startClients < targetClients) {
        startClients++;
        setHappyClients(startClients);
      } else {
        clearInterval(clientsInterval);
      }
    }, 40);

    return () => {
      clearInterval(yearsInterval);
      clearInterval(projectsInterval);
      clearInterval(clientsInterval);
    };
  }, []);

  // Typewriter animation
  useEffect(() => {
    let timeout;
    const currentFullText = currentRole;
    
    if (isDeleting) {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(typedText.slice(0, -1));
        }, 100);
      } else {
        setIsDeleting(false);
        const currentIndex = roles.indexOf(currentRole);
        const nextIndex = (currentIndex + 1) % roles.length;
        setCurrentRole(roles[nextIndex]);
      }
    } else {
      if (typedText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setTypedText(currentFullText.slice(0, typedText.length + 1));
        }, 150);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentRole]);

  return (
    <CContainer className='py-5'>
        <CRow className={styles.heroRow}>
            <CCol lg={7} md={7} className={`my-auto ${styles.leftCol}`}>
                <h4 className={`${styles.sub} fade-in-up`}>I am Christian</h4>
                <h1 className={`${styles.title} fade-in-up-delay-1`}>
                    Creative <span className={styles.typewriterWrapper}>
                      <span className={styles.typewriterText}>{typedText}</span>
                      <span className={styles.cursor}>|</span>
                    </span>
                </h1>
                <p className={`${styles.body} fade-in-up-delay-2`}>
                    I solve complicated user experience problems to create honest solutions that connect billions of people.
                </p>

                <div className={`fade-in-up-delay-3`}>
                  <CustomButton
                      text="Download Now"
                      Icon={ArrowDownTrayIcon}
                      onClick={openResume}
                      color="primary"
                  />
                </div>
            </CCol>
            <CCol lg={5} md={5} className={`text-end ${styles.rightCol}`}>
                {/* Image - Send to back with lower z-index */}
                <div className={styles.imageWrapper}>
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/christian-villareal.png`} 
                    className={`img-fluid ${styles.profileImage} fade-in-up-delay-1`} 
                    alt='Christian Villareal' 
                    width={458} 
                    height={527} 
                  />
                </div>
                
                {/* White Box - Forward with higher z-index and animation */}
                <div className={`${styles.whiteBox} fade-in-up-whitebox`}>
                    <CRow>
                        <CCol className='text-start'>
                            <img src={`${process.env.PUBLIC_URL}/images/5-star.png`} className='img-fluid' alt='5 Star' />
                        </CCol>
                        <CCol>
                            <h5 className={`${styles.fiveStar}`}>5.0 RATINGS</h5>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol>
                            <h4 className={`${styles.subTitle}`}>
                                Amazing work!
                            </h4>
                            <p className={`${styles.quote}`}>
                                Christian build a beautiful website that went beyond what we expected. It was truly impressive.
                            </p>
                        </CCol>
                    </CRow>
                </div>
            </CCol>
        </CRow>

        <CRow className={`mt-5 ${styles.mainRow}`}>
            <CCol md={4} xs={4}>
                <CRow className={styles.statRow}>
                    <CCol className='my-auto' md={4} xs={12}>
                        <h1 className={`${styles.belowTitle} count-up`}>
                          {yearsExp}
                          {yearsExp === targetYears && '+'}
                        </h1>
                    </CCol>
                    <CCol className='my-auto' md={8} xs={12}>
                        <p className={styles.belowBody}>Years of  <br />
                        Experience</p>
                    </CCol>
                </CRow>
            </CCol>
            
            <CCol md={4} xs={4}>
                <CRow className={styles.statRow}>
                    <CCol className='my-auto' md={6} xs={12}>
                        <h1 className={`${styles.belowTitle} count-up`}>
                          {projectsCompleted}+
                        </h1>
                    </CCol>
                    <CCol className='my-auto' md={6} xs={12}>
                        <p className={styles.belowBody}>Project  <br />
                        Completed</p>
                    </CCol>
                </CRow>
            </CCol>
            
            <CCol md={4} xs={4}>
                <CRow className={styles.statRow}>
                    <CCol className='my-auto' md={7} xs={12}>
                        <h1 className={`${styles.belowTitle} count-up`}>
                          {happyClients}+
                        </h1>
                    </CCol>
                    <CCol className='my-auto' md={5} xs={12}>
                        <p className={styles.belowBody}>Happy <br />
                        Clients</p>
                    </CCol>
                </CRow>
            </CCol>
        </CRow>
    </CContainer>
  )
}

export default TopFold;
