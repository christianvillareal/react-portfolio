import React from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import styles from '../css/Clients.module.css';

const QuoteIcon = () => (
  <img src={`${process.env.PUBLIC_URL}/images/quote.svg`} alt="Quote Icon" className={styles.quoteIcon} />
);

function Clients() {
  const clientList = [
    {
      id: 1,
      name: 'Zephario Lantavon',
      role: 'Business Coordinator',
      quote: 'The web app exceeded our expectations in every way. It\'s fast, user-friendly, and looks fantastic. Highly recommend!',
      imageSrc: `${process.env.PUBLIC_URL}/images/clients-01.png`,
      imageAlt: 'Zephario Lantavon',
    },
    {
      id: 2,
      name: 'Ryderen Mirkovian',
      role: 'Business Coordinator',
      quote: 'The web app development process was seamless, thanks to Christian. The final product is professional, reliable, and impressive.',
      imageSrc: `${process.env.PUBLIC_URL}/images/clients-02.png`,
      imageAlt: 'Ryderen Mirkovian',
    },
    {
      id: 3,
      name: 'Elyndra Virelsa',
      role: 'Business Coordinator',
      quote: 'Our new web app is a game-changer for our business. Christian delivered exactly what we needed and more.',
      imageSrc: `${process.env.PUBLIC_URL}/images/clients-03.png`,
      imageAlt: 'Elyndra Virelsa',
    },
    {
      id: 4,
      name: 'Thaelina Dravose',
      role: 'Business Coordinator',
      quote: 'Exceptional work! The web app is intuitive and beautifully designed. Christian truly understood our vision and brought it to life.',
      imageSrc: `${process.env.PUBLIC_URL}/images/clients-04.png`,
      imageAlt: 'Thaelina Dravose',
    },
  ];

  return (
    <section id="clients" className={styles.clientsSection}>
      <CContainer>
        {/* Header Section */}
        <CRow>
          <CCol md={12}>
            <h1 className={styles.title}>My Client's</h1>
            <h4 className={styles.subtitle}>
              Showcases a diverse range of businesses and individuals I have had the pleasure of working with.
            </h4>
          </CCol>
        </CRow>

        {/* Clients Grid - 4 columns */}
        <CRow className={styles.clientsGrid}>
          {clientList.map((client) => (
            <CCol key={client.id} md={6} lg={3} xs={6} className="mb-4">
              <div className={styles.clientCard}>
                {/* Row 1: Image (left) + Quote Icon (right) */}
                <div className={styles.rowTop}>
                  <div className={styles.clientImageWrapper}>
                    <img 
                      src={client.imageSrc} 
                      alt={client.imageAlt}
                      className={styles.clientImage}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=3b8bb3&color=fff&rounded=true&size=100`;
                      }}
                    />
                  </div>
                  <div className={styles.quoteWrapper}>
                    <QuoteIcon />
                  </div>
                </div>
                
                {/* Row 2: Quote Text - 100% width */}
                <div className={styles.quoteTextWrapper}>
                  <p className={styles.quoteText}>"{client.quote}"</p>
                </div>
                
                {/* Row 3: Client Info - 100% width */}
                <div className={styles.clientInfo}>
                  <h5 className={styles.clientName}>{client.name}</h5>
                  <p className={styles.clientRole}>{client.role}</p>
                </div>
              </div>
            </CCol>
          ))}
        </CRow>
      </CContainer>
    </section>
  );
}

export default Clients;