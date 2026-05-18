import React from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import styles from '../css/Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Services', id: 'services' },
    { name: 'Works', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Blog', id: 'news' }
  ];

  return (
    <footer className={styles.footer}>
      <CContainer>
        <CRow className="align-items-center gy-4">
          {/* Left Column - Name */}
          <CCol lg={12} md={12} className="text-center">
            <img src={`${process.env.PUBLIC_URL}/images/logo-white.png`} alt="Logo" width={178} height={57} />
          </CCol>

          {/* Center Column - Navigation Links */}
          <CCol lg={12} md={12}>
            <div className={styles.footerNav}>
              {navLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <button 
                    onClick={() => scrollToSection(link.id)}
                    className={styles.navLink}
                  >
                    {link.name}
                  </button>
                  {index < navLinks.length - 1 && <span className={styles.dot}>.</span>}
                </React.Fragment>
              ))}
            </div>
          </CCol>

          {/* Right Column - Copyright */}
          <CCol lg={12} md={12} className="text-center">
            <p className={styles.copyright}>
              © {currentYear} All Rights Reserved
            </p>
          </CCol>
        </CRow>
      </CContainer>
    </footer>
  );
}

export default Footer;