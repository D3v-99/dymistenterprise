import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaFileInvoiceDollar, FaPalette, FaCouch, FaTruck, FaCode } from 'react-icons/fa'

const HomePage = () => {
  const services = [
    {
      icon: <FaFileInvoiceDollar size={48} />,
      title: 'Invoicing Solutions',
      description: 'Professional invoicing and billing systems for your business needs.'
    },
    {
      icon: <FaPalette size={48} />,
      title: 'Branding & Design',
      description: 'Creative branding solutions that make your business stand out.'
    },
    {
      icon: <FaCouch size={48} />,
      title: 'Interior Décor',
      description: 'Transform your spaces with our expert interior design services.'
    },
    {
      icon: <FaTruck size={48} />,
      title: 'Supply Services',
      description: 'Reliable supply chain management and procurement solutions.'
    },
    {
      icon: <FaCode size={48} />,
      title: 'Website Development',
      description: 'Modern, responsive websites that elevate your digital presence.'
    }
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center min-vh-100">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={10} xl={8}>
              <h1 className="hero-title display-3 fw-bold mb-4">
                Elevating Business with Integrated Solutions
              </h1>
              <p className="hero-subtitle lead mb-5">
                Dymist Enterprise provides expert invoicing, branding, interior design, supply services, and website development.
              </p>
              <div className="hero-buttons">
                <Link to="/services" className="btn btn-primary btn-lg me-3 mb-3">
                  View Our Services
                </Link>
                <Link to="/contact" className="btn btn-outline-primary btn-lg mb-3">
                  Contact Us
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Intro Section */}
      <section className="intro-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <p className="intro-text fs-5 lh-lg">
                At Dymist Enterprise, we understand that every business is unique. Our versatile approach combines 
                creative expertise with practical solutions, ensuring that whether you need streamlined invoicing, 
                compelling brand identity, beautiful interior spaces, or reliable supply chains, we deliver results 
                that exceed expectations and drive your success forward.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Preview Section */}
      <section className="services-preview py-5">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="section-title display-5 fw-bold mb-3">Our Core Services</h2>
              <p className="section-subtitle text-muted">
                Comprehensive solutions designed to elevate every aspect of your business
              </p>
            </Col>
          </Row>
          
          <Row className="g-4 justify-content-center">
            {services.map((service, index) => (
              <Col md={6} lg={4} xl={2} key={index} className="d-flex">
                <Card className="service-card h-100 border-0 shadow-sm w-100">
                  <Card.Body className="text-center p-4">
                    <div className="service-icon text-primary mb-3">
                      {service.icon}
                    </div>
                    <Card.Title className="h6 mb-3">{service.title}</Card.Title>
                    <Card.Text className="text-muted small">
                      {service.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default HomePage