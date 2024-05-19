import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Form, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Song from './song';
import axios from 'axios';
import CreateForm from './create';
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown';
import { FaArrowCircleUp } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import Route from "./route";
import Name from './name';
import ArtistName from './artistName';
import AName from './aName';
import AId from './aId';
import SongId from './songId';
import App from '../App';
import Pop from './pop';
import ArtistId from './artistId';


const URL = "http://localhost:5000";
const songUrl = URL + "/song/";
const songsUrl = URL + "/songs?search_by=";

const Home = () => {


    return (
        <div>
            <div className='container'>
                <Navbar bg="light" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="/App">Spotily</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                                <NavDropdown title="Songs" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/name">Name</NavDropdown.Item>
                                    <NavDropdown.Item href="/artistName">Artist Name</NavDropdown.Item>
                                    <NavDropdown.Item href="/artistId">ArtistID</NavDropdown.Item>
                                    <NavDropdown.Item href="/relYear">ReleaseYear</NavDropdown.Item>
                                    <NavDropdown.Item href="/pop">Popularity</NavDropdown.Item>
                                    <NavDropdown.Item href="/songId">ID</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/create">ADD</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Artist" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/aName">Name</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/aId">ID</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

        </div>);
}

export default Home;