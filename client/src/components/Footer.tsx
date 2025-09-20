import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="custom-footer mt-auto">
      <Container>
        <Row className="py-5">
          <Col md={6} className="mb-4 mb-md-0">
            <h5 className="mb-3">
              <strong>Dymist Enterprise</strong>
            </h5>
            <p className="footer-tagline mb-0">
              Elevating business with integrated solutions, delivering excellence from Nairobi to the world.
            </p>
          </Col>
          
          <Col md={6}>
            <Row>
              <Col sm={6} className="mb-3">
                <h6 className="mb-3">Quick Links</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link to="/" className="footer-link">Home</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/services" className="footer-link">Services</Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/contact" className="footer-link">Contact</Link>
                  </li>
                </ul>
              </Col>
              
              <Col sm={6}>
                <h6 className="mb-3">Follow Us</h6>
                <div className="social-links">
                  <a href="#" className="social-link me-3" aria-label="Instagram">
                    <FaInstagram size={20} />
                  </a>
                  <a href="#" className="social-link me-3" aria-label="LinkedIn">
                    <FaLinkedin size={20} />
                  </a>
                  <a href="#" className="social-link me-3" aria-label="Twitter">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" className="social-link" aria-label="Facebook">
                    <FaFacebook size={20} />
                  </a>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <Row>
          <Col className="text-center py-3">
            <p className="copyright mb-0">
              © 2025 Dymist Enterprise. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer