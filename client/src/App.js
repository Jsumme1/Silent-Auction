import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import OurService from './pages/OurService';
import TheTeam from './pages/TheTeam';
import ContactUs from './pages/ContactUs';
import "./App.css"
function App() {
  return (
    <>
      <Navbar id="outsideNav" collapseOnSelect expand="lg" >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="links">
            <Nav.Link href="#our-services">Our Service</Nav.Link>
            <Nav.Link href="#the-team">The Team</Nav.Link>
            <Nav.Link href="#contact-us">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <OurService />
      <TheTeam />
      <ContactUs />
    </>
  );
}

export default App;
