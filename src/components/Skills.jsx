import React from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import styles from '../css/Skills.module.css';

// Import Swiper for slider functionality
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function Skills() {
  // Skill data with image icons from public folder
  const skillList = [
    {
      id: 1,
      name: 'Creative Cloud App',
      percent: 90,
      description:
        'I am proficient in using Adobe Creative Cloud apps to produce high-quality design work.',
      iconSrc: `${process.env.PUBLIC_URL}/images/skills-icon-01.png`,
      iconAlt: 'Creative Cloud Icon',
    },
    {
      id: 2,
      name: 'React & Next JS',
      percent: 45,
      description:
        'I specialize in building dynamic and high-performance web applications using React and Next.js.',
      iconSrc: `${process.env.PUBLIC_URL}/images/skills-icon-02.png`,
      iconAlt: 'React Icon',
    },
    {
      id: 3,
      name: 'MVC.NET',
      percent: 50,
      description:
        'I have extensive experience in developing robust web applications using MVC.NET.',
      iconSrc: `${process.env.PUBLIC_URL}/images/skills-icon-03.png`,
      iconAlt: 'MVC.NET Icon',
    },
    {
      id: 4,
      name: 'HTML/CSS/JS',
      percent: 99,
      description:
        'I have strong expertise in front-end web development using HTML, CSS, and JavaScript.',
      iconSrc: `${process.env.PUBLIC_URL}/images/skills-icon-04.png`,
      iconAlt: 'HTML/CSS/JS Icon',
    },
    {
      id: 5,
      name: 'WordPress',
      percent: 95,
      description:
        'I am proficient in developing and managing websites using WordPress.',
      iconSrc: `${process.env.PUBLIC_URL}/images/skills-icon-05.png`,
      iconAlt: 'WordPress Icon',
    },
  ];

  return (
    <section id="skills" className={styles.skillsSection}>
      <CContainer>
        {/* Header Section - Left Aligned */}
        <CRow>
          <CCol md={12}>
            <h1 className={styles.title}>My Skills</h1>
            <h4 className={styles.subtitle}>
              Highlights the key abilities and expertise I bring to every project.
            </h4>
          </CCol>
        </CRow>

        {/* Slider with arrows at bottom right */}
        <div className={styles.sliderContainer}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className={styles.skillsSlider}
          >
            {skillList.map((skill) => (
              <SwiperSlide key={skill.id}>
                <div className={styles.skillCard}>
                  <div className={styles.skillIcon}>
                    <img 
                      src={skill.iconSrc} 
                      alt={skill.iconAlt}
                      width={60}
                      height={60}
                    />
                  </div>
                  <h3 className={styles.skillName}>{skill.name}</h3>
                  <div className={styles.skillDescription}>
                    {skill.description}
                  </div>
                  <div className={styles.progressWrapper}>
                    <div className={styles.progressBarBg}>
                      <div
                        className={styles.progressBarFill}
                        style={{ width: `${skill.percent}%` }}
                      ></div>
                    </div>
                    <span className={styles.percentValue}>{skill.percent}%</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation Arrows - Bottom Right */}
          <div className={styles.customNavigation}>
            <div className="swiper-button-prev-custom">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="swiper-button-next-custom">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </CContainer>
    </section>
  );
}

export default Skills;