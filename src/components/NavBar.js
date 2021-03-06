import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = ({ currentUser }) => {
    if (!currentUser) return (
        <Navbar bg='dark' variant='dark' className='py-1' style={{ position: "sticky", top: 0 }}>
            <NavLink to='/' className='navbar-brand'>Simply Chat</NavLink>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />

            <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
                <Nav>
                    <NavLink to='/login' className='text-decoration-none text-light'>Login/Signup</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );

    return (
        <Navbar bg='dark' variant='dark' className='py-1' expand="md" style={{ position: "sticky", top: 0 }}>
            <NavLink to='/' className='navbar-brand ms-3'>Simply Chat</NavLink>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
                <Nav>
                    <Navbar.Text>
                        <NavLink to='/profile' className='pr-5 text-decoration-none text-light me-3'>Profile</NavLink>
                        <NavLink to='/logout' className='text-decoration-none text-light me-3'>Logout</NavLink>
                    </Navbar.Text>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default NavBar;