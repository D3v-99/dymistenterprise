import React from 'react';
import { Container, Nav, Navbar, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="sticky-top">
      <Container>
        <Navbar.Brand>
          <Image src="/logo.png" alt="logo" style={{ maxWidth: '170px', maxHeight: '200px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto" style={{ gap: '1.5rem' }}>
            <Nav.Item>
              <Link 
                to="/cash-holding" 
                className={`navbar-link ${location.pathname === '/cash-holding' ? 'text-primary fw-bold' : 'text-secondary fw-normal'} position-relative nav-link`}
              >
                Cash Holding
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link 
                to="/coins-holding" 
                className={`navbar-link ${location.pathname === '/coins-holding' ? 'text-primary fw-bold' : 'text-secondary fw-normal'} position-relative nav-link`}
              >
                Coins Holding
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link 
                to="/counterfeit-holding" 
                className={`navbar-link ${location.pathname === '/counterfeit-holding' ? 'text-primary fw-bold' : 'text-secondary fw-normal'} position-relative nav-link`}
              >
                Counterfeit Holding
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link 
                to="/test" 
                className={`navbar-link ${location.pathname === '/test' ? 'text-primary fw-bold' : 'text-secondary fw-normal'} position-relative nav-link`}
              >
                Test Screen
              </Link>
            </Nav.Item>



          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;