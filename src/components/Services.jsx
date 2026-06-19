import { CContainer, CRow, CCol } from '@coreui/react';
import styles from '../css/Services.module.css';

function Services() {
    const cardContent = [
        {
          title: 'Branding Designs',
          text: 'Provides creative and professional branding solutions to help your business stand out. I specialize in crafting...',
          icon: (
            <img src={`${process.env.PUBLIC_URL}/images/service-icon1.svg`} width={76} height={66} alt='Icon' />
          ),
          buttonText: 'Learn More',
          buttonIcon: null,
        },
        {
            title: 'UX/UI Designs',
            text: 'Specializes in creating intuitive and visually appealing user experiences. I focus on designing interfaces that delight users.',
            icon: (
              <img src={`${process.env.PUBLIC_URL}/images/service-icon2.svg`} width={89} height={60} alt='Icon' />
            ),
            buttonText: 'Learn More',
            buttonIcon: null,
          },
          {
            title: 'Web Designs',
            text: 'I create user-friendly, responsive, and visually captivating websites that engage visitors and enhance your online presence.',
            icon: (
              <img src={`${process.env.PUBLIC_URL}/images/service-icon3.svg`} width={79} height={60} alt='Icon' />
            ),
            buttonText: 'Learn More',
            buttonIcon: null,
          },
          {
            title: 'App Designs',
            text: 'Delivers innovative and user-friendly mobile app designs that cater to your business goals and user needs.',
            icon: (
              <img src={`${process.env.PUBLIC_URL}/images/service-icon4.svg`} width={76} height={66} alt='Icon' />
            ),
            buttonText: 'Learn More',
            buttonIcon: null,
          },
          {
            title: 'Web Development',
            text: 'I specialize in building robust, scalable, and responsive websites tailored to your specific needs and requirements.',
            icon: (
              <img src={`${process.env.PUBLIC_URL}/images/service-icon5.svg`} width={82} height={60} alt='Icon' />
            ),
            buttonText: 'Learn More',
            buttonIcon: null,
          },
          {
            title: 'Digital Marketing',
            text: 'I specialize in SEO, social media marketing, content creation, and online advertising to increase your visibility and reach.',
            icon: (
              <img src={`${process.env.PUBLIC_URL}/images/service-icon6.svg`} width={83} height={67} alt='Icon' />
            ),
            buttonText: 'Learn More',
            buttonIcon: null,
          },
          {
            title: 'Brand Strategy',
            text: 'I develop comprehensive strategies that include brand positioning, messaging, and identity to ensure your brand stands out.',
            icon: (
              <img src={`${process.env.PUBLIC_URL}/images/service-icon7.svg`} width={90} height={65} alt='Icon' />
            ),
            buttonText: 'Learn More',
            buttonIcon: null,
          },
          {
            title: 'App Development',
            text: 'Offers comprehensive mobile app development services to bring your ideas to life on iOS and Android platforms.',
            icon: (
              <img src={`${process.env.PUBLIC_URL}/images/service-icon8.svg`} width={81} height={61} alt='Icon' />
            ),
            buttonText: 'Learn More',
            buttonIcon: null,
          },
      ];

  return (
    <div className={styles.servicesSection}>
        <CContainer>
            <CRow>
                <CCol md={12}>
                    <h1 className={styles.title}>
                        My Quality Services
                    </h1>
                    <h4 className={styles.subtitle}>
                        I am committed to excellence and ensuring customer satisfaction with every job I do.
                    </h4>
                </CCol>
            </CRow>

            <CRow className={styles.servicesGrid}>
                {cardContent.map((content, index) => (
                    <CCol key={index} xs={6} md={6} lg={4} xl={3} className='mb-4'>
                        <div className={styles.serviceCard}>
                            <div className={styles.iconWrapper}>
                                {content.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{content.title}</h3>
                            <p className={styles.cardBody}>{content.text}</p>
                            
                        </div>
                    </CCol>
                ))}
            </CRow>
        </CContainer>
    </div>
  )
}

export default Services;