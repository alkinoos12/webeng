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

//This function is used to search for songs by release year
const RelYear = () => {

  //This is used to set the limit of the number of songs to be displayed
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [limit, setLimit] = useState(0);

  //This is the useEffect that sets the limit and the songs
  useEffect(() => {
    setLimit(10);
    setSongs(songs);
  }, []);

  //Scroll to top button
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


  //This is the search function that searches for the song
  const searchSong = async (limit, title) => {
    console.log("limit:" + limit);
    console.log("title:" + title);
    try {
      console.log("ReleaseYear");
      const res = await axios.get(`${songsUrl}Realese_Year&limit=${limit}&ReleaseYear=${title}`, {});
      setSongs(res.data);
    }
    catch (err) {
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
                Songs By Release Year
              </Navbar.Text>
              <Form className="d-flex">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={"Search for songs"}
                />
                <Button variant="outline-success" onClick={() => searchSong(searchTerm)}>Search</Button>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Batches
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {
                      setLimit(10);
                      searchSong(10, searchTerm)
                    }}>10</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      setLimit(20);
                      searchSong(20, searchTerm)
                    }}>20</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      setLimit(50);
                      searchSong(50, searchTerm)
                    }}>50</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      setLimit(100);
                      searchSong(100, searchTerm)
                    }}>100</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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

export default RelYear;