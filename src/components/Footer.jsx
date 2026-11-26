// Footer.jsx - Updated with route-aware navigation
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CContainer, CRow, CCol } from '@coreui/react';
import styles from '../css/Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId) => {
    if (isHomePage) {
      // If on home page, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to home page first
      navigate('/');
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
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
            <img 
              src={`${process.env.PUBLIC_URL}/images/logo-white.png`} 
              alt="Logo" 
              width={178} 
              height={57}
              onClick={() => scrollToSection('home')}
              style={{ cursor: 'pointer' }}
            />
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