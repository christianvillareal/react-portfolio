import { CContainer, CRow, CCol, CCard, CCardTitle, CCardBody, CCardText } from '@coreui/react';
import styles from '../css/Services.module.css';

import CustomButton from './CustomButton'

function Services() {
    const cardContent = [
        {
          title: 'Branding Designs',
          text: 'Provides creative and professional branding solutions to help your business stand out. I specialize in crafting...',
          icon: (
            <img src={'./images/service-icon1.svg'} width={76} height={66} alt='Icon' />
          ),
          buttonText: 'Learn More',
          buttonIcon: (
           null
          ),
        },
        {
            title: 'UX/UI Designs',
            text: 'specializes in creating intuitive and visually appealing user experiences. I focus on designing interfaces...',
            icon: (
              <img src={'./images/service-icon2.svg'} width={89} height={60}  alt='Icon' />
            ),
            buttonText: 'Learn More',
            buttonIcon: (
             null
            ),
          },
          {
            title: 'Web Designs',
            text: 'I create user-friendly, responsive, and visually captivating websites that engage visitors and enhance your online presence.',
            icon: (
              <img src={'./images/service-icon3.svg'} width={79} height={60} alt='Icon' />
            ),
            buttonText: 'Learn More',
            buttonIcon: (
             null
            ),
          },
          {
            title: 'App Designs',
            text: 'delivers innovative and user-friendly mobile app designs that cater to your business goals.',
            icon: (
              <img src={'./images/service-icon4.svg'} width={76} height={66} alt='Icon' />
            ),
            buttonText: 'Learn More',
            buttonIcon: (
             null
            ),
          },
          {
            title: 'Web Development',
            text: 'I specialize in building robust, scalable, and responsive websites tailored to your specific needs',
            icon: (
              <img src={'./images/service-icon5.svg'} width={82} height={60} alt='Icon' />
            ),
            buttonText: 'Learn More',
            buttonIcon: (
             null
            ),
          },
          {
            title: 'Digital Marketing',
            text: 'I specialize in SEO, social media marketing, content creation, and online advertising to increase your visibility and reach.',
            icon: (
              <img src={'./images/service-icon6.svg'} width={83} height={67} alt='Icon' />
            ),
            buttonText: 'Learn More',
            buttonIcon: (
             null
            ),
          },
          {
            title: 'Brand Strategy',
            text: 'I develop comprehensive strategies that include brand positioning, messaging, and identity to ensure your brand stands out.',
            icon: (
              <img src={'./images/service-icon7.svg'} width={90} height={65} alt='Icon' />
            ),
            buttonText: 'Learn More',
            buttonIcon: (
             null
            ),
          },
          {
            title: 'App Development',
            text: 'offers comprehensive mobile app development services to bring your ideas to life.',
            icon: (
              <img src={'./images/service-icon8.svg'} width={81} height={61} alt='Icon' />
            ),
            buttonText: 'Learn More',
            buttonIcon: (
             null
            ),
          },
      ];

  return (
    <div>
        <CContainer>
            <CRow>
                <CCol>
                    <h1 className={styles.title}>
                        My Quality Services
                    </h1>
                    <h4 className={`mb-5 ${styles.subtitle}`}>
                        I am committed to excellence and ensuring customer satisfaction with every job I do.
                    </h4>
                </CCol>
            </CRow>

            
            <CRow className="mb-4">
                {cardContent.map((content, index) => (
                    <CCol key={index} md={3} className='mb-4'>
                    <CCard>
                        <CCardBody className="p-4" style={{ minHeight: '400px' }}>
                        {content.icon}
                        <CCardTitle className={`mt-5 ${styles.cardTitle}`}>{content.title}</CCardTitle>
                        <CCardText className={styles.cardBody}>{content.text}</CCardText>
                        <CustomButton
                            text={content.buttonText}
                            onClick={() => alert('Button clicked!')}
                            color="primary"
                        />
                        </CCardBody>
                    </CCard>
                    </CCol>
                ))}
            </CRow>
            
        </CContainer>
    </div>
  )
}

export default Services