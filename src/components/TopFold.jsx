import React from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import CustomButton from './CustomButton'
import styles from '../css/TopFold.module.css';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

function TopFold() {
  return (
    <CContainer className='py-5'>
        <CRow className=''>
            <CCol className='my-auto'>
                <h4 className={`${styles.sub}`}>I am Christian</h4>
                <h1 className={`${styles.title}`}>Creative Developer + Creative Designer</h1>
                <p className={`${styles.body}`}>
                    I solve complicated user experience problems to create honest solutions that connect billions of people.
                </p>

                <CustomButton
                    text="Download Now"
                    Icon= {ArrowDownTrayIcon}
                    onClick={() => alert('Button clicked!')}
                    color="primary"
                />
            </CCol>
            <CCol className='text-end'>
                <div className={`${styles.whiteBox}`}>
                    <CRow>
                        <CCol className='text-start'>
                            <img src={'./images/5-star.png'} className='img-fluid' alt='5 Star' />
                        </CCol>
                        <CCol>
                            <h5 className={`${styles.fiveStar}`}>5.0  RATINGS</h5>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol>
                            <h4 className={`${styles.subTitle}`}>
                                Amazing work!
                            </h4>
                            <p className={`${styles.quote}`}>
                                Christian build a beautiful website that went beyond what we expected. It was truly impressive.
                            </p>
                        </CCol>
                    </CRow>
                </div>
                <img src={'./images/christian-villareal.png'} className='img-fluid' alt='Christian Villareal' width={458} height={527} />
            </CCol>
        </CRow>

        <CRow className={`mt-5  ${styles.mainRow}`}>
            <CCol md={4} xs={4}>
                <CRow>
                    <CCol className='my-auto' md={4} xs={12}>
                        <h1 className={`${styles.belowTitle}`}>14 </h1>
                    </CCol>
                    <CCol className='my-auto' md={8} xs={12}>
                        <p className={`${styles.belowBody}`}>Years of  <br />
                        Experience</p>
                    </CCol>
                </CRow>
            </CCol>
            
            <CCol md={4} xs={4}>
                <CRow>
                    <CCol className='my-auto' md={6} xs={12}>
                        <h1 className={`${styles.belowTitle}`}>50+ </h1>
                    </CCol>
                    <CCol className='my-auto' md={6} xs={12}>
                        <p className={`${styles.belowBody}`}>Project  <br />
                        Completed</p>
                    </CCol>
                </CRow>
            </CCol>
            
            <CCol md={4} xs={4}>
                <CRow>
                    <CCol className='my-auto' md={7} xs={12}>
                        <h1 className={`${styles.belowTitle}`}>1.5K </h1>
                    </CCol>
                    <CCol className='my-auto' md={5} xs={12}>
                        <p className={`${styles.belowBody}`}>Happy <br />
                        Clients</p>
                    </CCol>
                </CRow>
            </CCol>
        </CRow>
    </CContainer>
  )
}

export default TopFold