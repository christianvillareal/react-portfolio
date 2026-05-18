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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
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
        {/* Header Section */}
        <CRow>
          <CCol md={12}>
            <h1 className={styles.title}>Let's work together!</h1>
            <h4 className={styles.subtitle}>
              I design and code beautifully simple things and I love what I do. Just simple like that!
            </h4>
          </CCol>
        </CRow>

        {/* Contact Form and Info Grid */}
        <CRow className={styles.contactGrid}>
          {/* Left Column - Contact Form */}
          <CCol lg={6} md={12}>
            <div className={styles.formWrapper}>
              <CForm onSubmit={handleSubmit}>
                <CRow>
                  <CCol md={6}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>First Name</label>
                      <CFormInput
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Your first name"
                        className={styles.formInput}
                        required
                      />
                    </div>
                  </CCol>
                  <CCol md={6}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Last Name</label>
                      <CFormInput
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Your last name"
                        className={styles.formInput}
                        required
                      />
                    </div>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol md={6}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Email</label>
                      <CFormInput
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={styles.formInput}
                        required
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
                      />
                    </div>
                  </CCol>
                </CRow>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Please Choose an Option</label>
                  <CFormSelect
                    name="option"
                    value={formData.option}
                    onChange={handleChange}
                    className={styles.formSelect}
                    options={options}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Message</label>
                  <CFormTextarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    className={styles.formTextarea}
                    required
                  />
                </div>

                <button type="submit" className={styles.sendButton}>
                  Send Message
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </CForm>
            </div>
          </CCol>

          {/* Right Column - Contact Info - with my-auto for vertical alignment */}
          <CCol lg={6} md={12} className="my-auto">
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