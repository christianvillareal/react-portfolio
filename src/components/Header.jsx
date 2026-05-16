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

  return (
    <CNavbar expand="lg" className={`${styles.customNav}`}>
      <CContainer>
        <CNavbarBrand href="/">
          <img src={'./images/logo.png'} alt="Logo" width={178} height={57} />
        </CNavbarBrand>
        <CNavbarToggler onClick={toggle} aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </CNavbarToggler>
        <CCollapse className="navbar-collapse my-auto" visible={isOpen} id="navbarNav">
          <CNavbarNav className="ms-auto my-auto">
            <CNavItem>
              <CNavLink active aria-current="page" href="/" className={styles.customLink}>Home</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="/" className={styles.customLink}>Services</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="/" className={styles.customLink}>Projects</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="/" className={styles.customLink}>Clients</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="/" className={styles.customLink}>Contact Us</CNavLink>
            </CNavItem>
            <CNavItem>
              <CustomButton
                text="Hire Me"
                Icon={ArrowRightIcon}
                onClick={() => alert('Button clicked!')}
              />
            </CNavItem>
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
}

export default Header;
