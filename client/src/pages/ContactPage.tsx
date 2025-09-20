import { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [showAlert, setShowAlert] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setShowAlert(true)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    // Hide alert after 5 seconds
    setTimeout(() => setShowAlert(false), 5000)
  }

  const contactInfo = [
    {
      icon: <FaEnvelope size={24} />,
      title: 'Email',
      details: 'dymist.enterprise@gmail.com',
      link: 'mailto:dymist.enterprise@gmail.com'
    },
    {
      icon: <FaPhone size={24} />,
      title: 'Phone',
      details: '+254 714 918 138',
      link: 'tel:+254714918138'
    },
    {
      icon: <FaMapMarkerAlt size={24} />,
      title: 'Address',
      details: 'P.O. Box 5763-00521, Nairobi, Kenya',
      link: null
    },
   
  ]

  return (
    <div className="contact-page">
      {/* Page Header */}
      <section className="page-header py-5 mt-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="page-title display-4 fw-bold mb-4">Get in Touch</h1>
              <p className="page-subtitle lead text-muted">
                Ready to elevate your business? We'd love to hear from you and discuss how we can help.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Form and Info Section */}
      <section className="contact-section py-5">
        <Container>
          <Row className="g-5">
            {/* Contact Form */}
            <Col lg={8}>
              <div className="contact-form">
                <h2 className="h3 fw-bold mb-4">Send us a Message</h2>
                
                {showAlert && (
                  <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
                    Thank you for your message! We'll get back to you soon.
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Message *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={6}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Button 
                        type="submit" 
                        variant="primary" 
                        size="lg" 
                        className="mt-3"
                      >
                        Send Message
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>

            {/* Contact Information */}
            <Col lg={4}>
              <div className="contact-info">
                <h2 className="h3 fw-bold mb-4">Contact Information</h2>
                <div className="company-info mb-4">
                  <h3 className="h5 fw-bold text-primary">Dymist Enterprise</h3>
                  <p className="text-muted">
                    Your trusted partner for integrated business solutions
                  </p>
                </div>

                <div className="contact-details">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="contact-item d-flex mb-4">
                      <div className="contact-icon text-primary me-3 mt-1">
                        {info.icon}
                      </div>
                      <div className="contact-details-content">
                        <h4 className="h6 fw-bold mb-1">{info.title}</h4>
                        {info.link ? (
                          <a 
                            href={info.link} 
                            className="contact-link text-decoration-none"
                          >
                            {info.details}
                          </a>
                        ) : (
                          <p className="text-muted mb-0" style={{whiteSpace: 'pre-line'}}>
                            {info.details}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default ContactPage