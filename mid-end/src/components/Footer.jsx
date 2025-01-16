import {Container,Image,Navbar} from 'react-bootstrap';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <Navbar expand="lg" className="bg-dark text-white">
      <Container className="d-flex justify-content-center">
        <Navbar.Brand href="#">
        <Image
              src="/logo.png"
              alt="logo"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
        </Navbar.Brand>
      </Container>
      <div className="text-center w-100">
        <small>© {year} with  ❤️ Data Management Office</small>
      </div>
    </Navbar>
  );
}

export default Footer;