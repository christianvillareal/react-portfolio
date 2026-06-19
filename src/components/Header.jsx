import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CNavbar, CNavbarBrand, CNavbarNav, CNavItem, CNavbarToggler, CCollapse, CContainer } from '@coreui/react';
import CustomButton from './CustomButton';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

// IMPORT STYLES
import '@coreui/coreui/dist/css/coreui.min.css';
import styles from '../css/Header.module.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  const toggle = () => setIsOpen(!isOpen);

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Track which section is in view
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    const sections = ['home', 'services', 'projects', 'clients', 'contact'];
    const sectionElements = sections.map(id => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
        threshold: 0
      }
    );

    sectionElements.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionElements.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [isHomePage]);

  // Scroll to section or navigate and then scroll
  const scrollToSection = (sectionId) => {
    if (isHomePage) {
      // If on home page, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveSection(sectionId);
    } else {
      // If on another page, navigate to home page first
      navigate('/');
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(sectionId);
      }, 100);
    }
    setIsOpen(false); // Close mobile menu after clicking
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
        <CNavbarBrand 
          onClick={(e) => { 
            e.preventDefault(); 
            scrollToSection('home'); 
          }}
          style={{ cursor: 'pointer' }}
        >
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
                  className={`${styles.customLink} ${styles.navButton} ${activeSection === item.id ? styles.active : ''}`}
                >
                  {item.name}
                  <span className={styles.activeIndicator}></span>
                </button>
              </CNavItem>
            ))}
            <CNavItem>
              <CustomButton
                text="Hire Me"
                Icon={ArrowRightIcon}
                onClick={() => scrollToSection('contact')}
              />
            </CNavItem>
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
}

export default Header;