import React, { useState } from 'react';
import { CNavbar, CNavbarBrand, CNavbarNav, CNavItem, CNavLink, CNavbarToggler, CCollapse, CContainer } from '@coreui/react';
import CustomButton from './CustomButton';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

// IMPORT STYLES
import '@coreui/coreui/dist/css/coreui.min.css';
import styles from '../css/Header.module.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Projects', id: 'projects' },
    { name: 'Clients', id: 'clients' },
    { name: 'Contact Us', id: 'contact' }
  ];

  return (
    <CNavbar expand="lg" className={`${styles.customNav}`}>
      <CContainer>
        <CNavbarBrand href="/" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" width={178} height={57} />
        </CNavbarBrand>
        <CNavbarToggler onClick={toggle} aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </CNavbarToggler>
        <CCollapse className="navbar-collapse my-auto" visible={isOpen} id="navbarNav">
          <CNavbarNav className="ms-auto my-auto">
            {navItems.map((item) => (
              <CNavItem key={item.name}>
                <button 
                  onClick={() => scrollToSection(item.id)}
                  className={`${styles.customLink} ${styles.navButton}`}
                >
                  {item.name}
                </button>
              </CNavItem>
            ))}
            <CNavItem>
              <CustomButton
                text="Hire Me"
                Icon={ArrowRightIcon}
                onClick={() => alert('Hire Me button clicked!')}
              />
            </CNavItem>
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
}

export default Header;