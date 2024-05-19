import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Form, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Song from './song';
import ArtistCard from "./artists.js";
import axios from 'axios';
import CreateForm from './create';
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown';
import { FaArrowCircleUp } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import Route from "./route";
import SongId from "./songId";
import Name from "./name";
import ArtistName from "./artistName";
import RelYear from "./relYear";
import AName from "./aName";
import ArtistId from "./artistId";
import Pop from "./pop";
import App from "../App";

const URL = "http://localhost:5000";
const artistUrl = URL + "/artist/";

const AId = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(0);
  const [artists, setArtists] = useState([]);


  useEffect(() => {
    setLimit(10);
  }, []);

  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false)
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop)

  const searchArtist = async (title) => {
    try {
      const res = await axios.get(`${artistUrl}${title}`, {
        headers: {
          'id': title,
          'Artist_name': title
        },
      });
      setArtists(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleKeypress = e => {
    if (e.keyCode === 13) {
        searchArtist(limit, searchTerm);
    }
  }

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
              <Navbar.Text>
                Artist by ID
              </Navbar.Text>
              <Form className="d-flex">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={"Search for songs"}
                />
                <Button variant="outline-success" onClick={() => searchArtist(searchTerm)}>Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      {artists?.length > 0 ? (
        <div
          className='container'>
          {console.log("Artists")}
          {artists.map((artist) => (
            <ArtistCard artist={artist} />
          ))}
        </div>
      ) : (
        <div
          className='container'>
          {console.log("No Artists")}
          <h2>No artists found</h2>
        </div>
      )
      }

    </div>
  );
}

export default AId;