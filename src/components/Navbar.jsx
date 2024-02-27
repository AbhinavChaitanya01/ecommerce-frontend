import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';

const MyNavbar = ({ log }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                {/* Logo */}
                <Navbar.Brand href="/">GetToStyle</Navbar.Brand>

                {/* Toggle button for mobile */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Navigation links */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/">Products</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        {/* Add more navigation links as needed */}
                    </Nav>

                    {/* Search bar */}
                    <Form className="d-flex">
                        <FormControl type="search" placeholder="Search..." className="mr-2" />
                        <Button variant="outline-light">Search</Button>
                    </Form>

                    {/* Condition for logged in user */}
                    {log ? (
                        <Nav>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                            <Nav.Link href="/">My Orders</Nav.Link>
                            <Nav.Link href="/">Logout</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/signUp">Sign Up</Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;
