import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CarList from '../Fetch/CarList';
import ResponsiveAutoExample from '../Example/ResponsiveAutoExample';

function AdminLayout() {
    return (
        <div>
            <Navbar expand="lg" style={{ backgroundColor: "#536878" }}>
            <Container>
                <Navbar.Brand href="#home">Admin-Auction</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/login">Account</Nav.Link>
                        <Nav.Link href="/adminside">Edit Page</Nav.Link>
                        <NavDropdown title="Edit" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/addmakeormodel">Add New Make</NavDropdown.Item>
                            <NavDropdown.Item href="/delete">
                                Delete/Update
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/addNew">Add New Vehicle</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <ResponsiveAutoExample /> 
        </div>
    );
}

export default AdminLayout;