import { Container, Row, Col } from 'react-bootstrap'
import { FaFileInvoiceDollar, FaPalette, FaCouch, FaTruck } from 'react-icons/fa'

const ServicesPage = () => {
  const services = [
    {
      icon: <FaFileInvoiceDollar size={60} />,
      title: 'Invoicing Solutions',
      description: 'Streamline your financial operations with our comprehensive invoicing systems. We provide custom billing solutions, automated payment tracking, and professional invoice templates that help you get paid faster and maintain healthy cash flow.',
      image: 'https://picsum.photos/600/400?random=1'
    },
    {
      icon: <FaPalette size={60} />,
      title: 'Branding & Design',
      description: 'Create a powerful brand identity that resonates with your target audience. Our creative team specializes in logo design, brand guidelines, marketing materials, and digital assets that tell your unique story and differentiate you from competitors.',
      image: 'https://picsum.photos/600/400?random=2'
    },
    {
      icon: <FaCouch size={60} />,
      title: 'Interior Décor',
      description: 'Transform your commercial and residential spaces into inspiring environments. Our interior design experts combine functionality with aesthetics to create spaces that enhance productivity, comfort, and reflect your personal or brand style.',
      image: 'https://picsum.photos/600/400?random=3'
    },
    {
      icon: <FaTruck size={60} />,
      title: 'Supply Services',
      description: 'Optimize your supply chain with our procurement and logistics expertise. We handle vendor relationships, inventory management, quality control, and timely delivery to ensure your business operations run smoothly and efficiently.',
      image: 'https://picsum.photos/600/400?random=4'
    }
  ]

  return (
    <div className="services-page">
      {/* Page Header */}
      <section className="page-header py-5 mt-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="page-title display-4 fw-bold mb-4">Our Services</h1>
              <p className="page-subtitle lead text-muted">
                Comprehensive business solutions designed to drive your success and growth
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Detail Section */}
      <section className="services-detail py-5">
        <Container>
          {services.map((service, index) => (
            <Row 
              key={index} 
              className={`align-items-center mb-5 pb-5 ${index !== services.length - 1 ? 'border-bottom' : ''}`}
            >
              {/* Alternate layout for visual interest */}
              {index % 2 === 0 ? (
                <>
                  <Col lg={6} className="mb-4 mb-lg-0">
                    <div className="service-content">
                      <div className="service-icon text-primary mb-3">
                        {service.icon}
                      </div>
                      <h2 className="service-title h3 fw-bold mb-3">{service.title}</h2>
                      <p className="service-description text-muted lh-lg">
                        {service.description}
                      </p>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="service-image">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                  </Col>
                </>
              ) : (
                <>
                  <Col lg={6} className="order-lg-2 mb-4 mb-lg-0">
                    <div className="service-content">
                      <div className="service-icon text-primary mb-3">
                        {service.icon}
                      </div>
                      <h2 className="service-title h3 fw-bold mb-3">{service.title}</h2>
                      <p className="service-description text-muted lh-lg">
                        {service.description}
                      </p>
                    </div>
                  </Col>
                  <Col lg={6} className="order-lg-1">
                    <div className="service-image">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>
                  </Col>
                </>
              )}
            </Row>
          ))}
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h3 className="cta-title h2 fw-bold mb-3">Ready to Get Started?</h3>
              <p className="cta-description lead text-muted mb-4">
                Let's discuss how our services can help elevate your business to the next level.
              </p>
              <a href="/contact" className="btn btn-primary btn-lg">
                Contact Us Today
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default ServicesPage