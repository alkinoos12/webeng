import React, { useEffect, useState} from 'react';
import { Container, Button, Row, Form, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Song from './song';
import ArtistCard from "./artists.js";
import axios from 'axios';
import CreateForm from './create';
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown';
import {FaArrowCircleUp} from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import Name from "./name";
import App from "../App";
import Route from "./route";

const URL = "http://localhost:5000";
const songUrl = URL + "/song/";

//This is the function that handles the search by song id
const SongId = () => {

  //This is the state for the search term
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  
  //This is the useEffect that sets the songs
  useEffect(() => {
    setSongs(songs);
  }, []);

  //Scroll to top button
  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop)

  //This is the search function that searches for the song
  const searchSong = async (title) => {
    try {
        console.log("id");
        const res = await axios.get(`${songUrl}${title}`, {
          headers: {
            'id': title
          }
        });
        console.log(res.data);
        setSongs(res.data);
	} catch (err) {
			console.log(err);
	}
  };

  //This is the function that is called when the page is loaded
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
                Songs By ID
              </Navbar.Text>
              <Form className="d-flex">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={"Search for songs"}
                />
                <Button variant="outline-success" onClick={() => searchSong(searchTerm)}>Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      {songs?.length > 0 ? (
        <Container className='p-4'>
          <Row>
            {console.log("Songs1")}
            {songs.map((song, index) => (
              <Song song={song} index={index} />
            ))}
            <div className='container'>
              <FaArrowCircleUp className="scrollTop" onClick={scrollTop} style={{ height: 100, display: showScroll ? 'flex' : 'none' }} />
            </div>
          </Row>
        </Container>
      ) : (
        console.log("No songs")
      )
      }
    </div>
  );
}

export default SongId;