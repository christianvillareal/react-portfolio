// src/components/Contact.jsx
import React, { useState } from 'react';
import { CContainer, CRow, CCol, CForm, CFormInput, CFormSelect, CFormTextarea } from '@coreui/react';
import styles from '../css/Contact.module.css';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    option: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Determine which API URL to use based on environment
  const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3001'  // Local backend for development
    : 'https://portfolio-backend.onrender.com'; // Production backend on Render

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (submitStatus.message) setSubmitStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.option || !formData.message) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    if (!formData.email.includes('@')) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      console.log('Sending to:', `${API_URL}/api/contact`);
      console.log('Data:', formData);

      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.' 
        });
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          option: '',
          message: ''
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: `Sorry, there was an error sending your message. ${error.message}` 
      });
    } finally {
      setIsSubmitting(false);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        if (submitStatus.type === 'success') {
          setSubmitStatus({ type: '', message: '' });
        }
      }, 5000);
    }
  };

  const options = [
    { value: '', label: 'Please Choose an Option' },
    { value: 'web-design', label: 'Web Design' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'branding', label: 'Branding' },
    { value: 'ui-ux', label: 'UI/UX Design' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <section id="contact" className={styles.contactSection}>
      <CContainer>
        <CRow>
          <CCol md={12}>
            <h1 className={styles.title}>Let's work together!</h1>
            <h4 className={styles.subtitle}>
              I design and code beautifully simple things and I love what I do. Just simple like that!
            </h4>
          </CCol>
        </CRow>

        <CRow className={styles.contactGrid}>
          <CCol lg={6} md={6} xs={12}>
            <div className={styles.formWrapper}>
              {/* Status Messages */}
              {submitStatus.message && (
                <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
                  {submitStatus.message}
                </div>
              )}

              <CForm onSubmit={handleSubmit}>
                <CRow>
                  <CCol md={6}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>First Name *</label>
                      <CFormInput
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Your first name"
                        className={styles.formInput}
                        disabled={isSubmitting}
                      />
                    </div>
                  </CCol>
                  <CCol md={6}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Last Name *</label>
                      <CFormInput
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Your last name"
                        className={styles.formInput}
                        disabled={isSubmitting}
                      />
                    </div>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol md={6}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Email *</label>
                      <CFormInput
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={styles.formInput}
                        disabled={isSubmitting}
                      />
                    </div>
                  </CCol>
                  <CCol md={6}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Phone</label>
                      <CFormInput
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className={styles.formInput}
                        disabled={isSubmitting}
                      />
                    </div>
                  </CCol>
                </CRow>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Service Option *</label>
                  <CFormSelect
                    name="option"
                    value={formData.option}
                    onChange={handleChange}
                    className={styles.formSelect}
                    options={options}
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Message *</label>
                  <CFormTextarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    className={styles.formTextarea}
                    disabled={isSubmitting}
                  />
                </div>

                <button type="submit" className={styles.sendButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </CForm>
            </div>
          </CCol>

          <CCol lg={6} md={6} xs={12} className="my-auto">
            <div className={styles.infoWrapper}>
              <div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <img 
                      src={`${process.env.PUBLIC_URL}/images/call-icon.png`} 
                      alt="Phone Icon" 
                      width={24} 
                      height={24}
                    />
                  </div>
                  <div className={styles.infoContent}>
                    <h6 className={styles.infoLabel}>Phone:</h6>
                    <p className={styles.infoValue}>+63 995 577 0369</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <img 
                      src={`${process.env.PUBLIC_URL}/images/message-icon.png`} 
                      alt="Email Icon" 
                      width={24} 
                      height={24}
                    />
                  </div>
                  <div className={styles.infoContent}>
                    <h6 className={styles.infoLabel}>Email:</h6>
                    <p className={styles.infoValue}>chanix.webdesigns@gmail.com</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <img 
                      src={`${process.env.PUBLIC_URL}/images/map-icon.png`} 
                      alt="Map Icon" 
                      width={24} 
                      height={24}
                    />
                  </div>
                  <div className={styles.infoContent}>
                    <h6 className={styles.infoLabel}>Located:</h6>
                    <p className={styles.infoValue}>Cebu City, Philippines.</p>
                  </div>
                </div>
              </div>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </section>
  );
}

export default Contact;