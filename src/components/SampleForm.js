import React, { useState } from "react";
import {
  CForm,
  CCol,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CFormCheck,
  CFormFeedback,
  CButton
} from '@coreui/react';

function SampleForm() {

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>New React App</h1>
            <CForm
              className="needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}
            >
              <CCol md={4} style={{ flex: '1 1 calc(33.333% - 16px)' }}>
                <CFormInput
                  type="text"
                  defaultValue=""
                  feedbackValid="Looks good!"
                  id="validationCustom01"
                  floatingClassName="mb-3" 
                  floatingLabel="First Name" 
                  placeholder="name@example.com"
                  required
                />
              </CCol>
              <CCol md={4} style={{ flex: '1 1 calc(33.333% - 16px)' }}>
                <CFormInput
                  type="text"
                  defaultValue="Otto"
                  feedbackValid="Looks good!"
                  id="validationCustom02"
                  label="First name"
                  required
                />
              </CCol>
              <CCol md={4} style={{ flex: '1 1 calc(33.333% - 16px)' }}>
                <CFormLabel htmlFor="validationCustomUsername">Username</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    type="text"
                    aria-describedby="inputGroupPrependFeedback"
                    feedbackValid="Please choose a username."
                    id="validationCustomUsername"
                    required
                  />
                </CInputGroup>
              </CCol>
              <CCol md={6} style={{ flex: '1 1 calc(50% - 16px)' }}>
                <CFormInput
                  type="text"
                  aria-describedby="validationCustom03Feedback"
                  feedbackInvalid="Please provide a valid city."
                  id="validationCustom03"
                  label="City"
                  required
                />
              </CCol>
              <CCol md={3} style={{ flex: '1 1 calc(25% - 16px)' }}>
                <CFormSelect
                  aria-describedby="validationCustom04Feedback"
                  feedbackInvalid="Please select a valid state."
                  id="validationCustom04"
                  label="State"
                  required
                >
                  <option disabled>Choose...</option>
                  <option>...</option>
                </CFormSelect>
              </CCol>
              <CCol md={3} style={{ flex: '1 1 calc(25% - 16px)' }}>
                <CFormInput
                  type="text"
                  aria-describedby="validationCustom05Feedback"
                  feedbackInvalid="Please provide a valid zip."
                  id="validationCustom05"
                  label="Zip"
                  required
                />
              </CCol>
              <CCol xs={12} style={{ flex: '1 1 100%' }}>
                <CFormCheck
                  type="checkbox"
                  id="invalidCheck"
                  label="Agree to terms and conditions"
                  required
                />
                <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
              </CCol>
              <CCol xs={12} style={{ flex: '1 1 100%' }}>
                <CButton color="primary" type="submit">
                  Submit form
                </CButton>
              </CCol>
            </CForm>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SampleForm