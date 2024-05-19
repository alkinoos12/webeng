import React, { useEffect, useState} from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Song from './song';
import ArtistCard from "./artists.js";
import axios from 'axios';
import CreateForm from './create';
import {FaArrowCircleUp} from 'react-icons/fa';

const URL = "http://localhost:5000";
const songUrl = URL + "/song/";
const songsUrl = URL + "/songs?search_by=";
const artistUrl = URL + "/artist/";
const artistsUrl = URL + "/artists?";

const App = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [flag, setFlag] = useState(0);
  const [limit, setLimit] = useState(0);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    setLimit(10);
    setSongs(songs);
  }, [songs]);

  // const getAllSongs = async (query) => {
  //   try {
	// 		const res = query[0] == '0' ?
  //     ( 
  //       await axios.get(`${songsUrl}${query}`, {
  //         headers: {
  //           'id': query
  //         }
  //       });
	// 		setSongs(res.data);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
  // }

  const searchSong = async (flag,limit,title) => {
    console.log("flag in search:" + flag);
    console.log("limit:" + limit);
    console.log("title:" + title);
    try {
      if(flag == 5){
        console.log("id");
        const res = await axios.get(`${songUrl}${title}`, {
          headers: {
            'id': title
          }
        });
        console.log(res.data);
        setSongs(res.data);
        setFlag(flag);
      }else if(flag == 3){
        console.log("By Artist");
        const res = await axios.get(`${songsUrl}Artist_Name&limit=${limit}&Artist_name=${title}`,{});
        console.log(res.data);
        setFlag(flag);
        setSongs(res.data);
      }else if(flag ==2){
        console.log("Name");
        const res = await axios.get(`${songsUrl}Name&limit=${limit}&Name=${title}`,{});
        console.log(res.data);
        setFlag(flag);
        setSongs(res.data);
      }else if(flag==4){
        console.log("Popularity");
        const res = await axios.get(`${songsUrl}Popularity&limit=${limit}&ReleaseYear=${title}`,{});
        setSongs(res.data);
        setFlag(flag);
      }else if(flag == -1){
        console.log("ArtistID");
        const res = await axios.get(`${songsUrl}ArtistID&limit=${limit}&Artist_id=${title}`,{});
        setSongs(res.data);
        setFlag(flag);
      }else if(flag == -2){
        console.log("ReleaseYear");
        const res = await axios.get(`${songsUrl}Realese_Year&limit=${limit}&ReleaseYear=${title}`,{});
        setSongs(res.data);
        setFlag(flag);
      }
		} catch (err) {
			console.log(err);
		}
  };
  
  const searchArtist = async (flag,limit,title) => {
    try {
      if(flag == 8){
        const res = await axios.get(`${artistUrl}${title}`, {
          headers: {
            'id': title,
            'Artist_name': title
          },
        });
        setArtists(res.data);
        setFlag(flag);
      }else if(flag == 7){
        const res = await axios.get(`${artistsUrl}Artist_name=${title}&limit=${limit}`,{});
        console.log(artistUrl + "Artist_name=" + title + "&limit=" + limit);
        setArtists(res.data);
        setFlag(flag);

      }
		} catch (err) {
			console.log(err);
		}
  };

  return (
    <div className='container'>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#App" onClick={() => setFlag(1)}>Spotily</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                <NavDropdown title="Songs" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#" onClick={() => setFlag(2)}>Name</NavDropdown.Item>
                    <NavDropdown.Item href="#" onClick={() => setFlag(3)}>Artist Name</NavDropdown.Item>
                    <NavDropdown.Item href="#" onClick={() => setFlag(-1)}>ArtistID</NavDropdown.Item>
                    <NavDropdown.Item href="#" onClick={() => setFlag(-2)}>ReleaseYear</NavDropdown.Item>
                    <NavDropdown.Item href="#" onClick={() => setFlag(4)}>Popularity</NavDropdown.Item>
                    <NavDropdown.Item href="#" onClick={() => setFlag(5)}>ID</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#" onClick={() => setFlag(6)}>ADD</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Artist" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#" onClick={() => setFlag(7)}>Name</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#" onClick={() => setFlag(8)}>ID</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
              <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={ flag > 6 ? "Search for artists" : "Search for songs" }
              />
                <Button variant="outline-success" onClick={() => { flag > 6 ? searchArtist(flag,limit,searchTerm) : searchSong(flag,limit,searchTerm)}}>Search</Button>
                <NavDropdown title="Batches" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3" onClick={() => { flag > 6 ? searchArtist(flag,10,searchTerm) : searchSong(flag,10,searchTerm)}}>10</NavDropdown.Item>
                    <NavDropdown.Item href="#action4" onClick={() => { flag > 6 ? searchArtist(flag,20,searchTerm) : searchSong(flag,20,searchTerm)}}>20</NavDropdown.Item>
                    <NavDropdown.Item href="#action4" onClick={() => { flag > 6 ? searchArtist(flag,50,searchTerm) : searchSong(flag,50,searchTerm)}}>50</NavDropdown.Item>
                    <NavDropdown.Item href="#action4" onClick={() => { flag > 6 ? searchArtist(flag,100,searchTerm) : searchSong(flag,100,searchTerm)}}>100</NavDropdown.Item>
                </NavDropdown>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
            { flag > 6 ? (
                artists?.length > 0 ? (
                  <div className='container'>
                    {console.log("Artists")}
                    {artists.map( (artist) => (
                    <ArtistCard artist = {artist}/>
                    ))}
                  </div>
                ) : (
                  <div className='container'>
                    {console.log("No Artists")}
                    <h2>No artists found</h2>
                  </div>
                )
              ) : (
                flag == 6 ? (
                  <div className='container'>
                    {console.log("Create")}
                    <CreateForm></CreateForm>
                  </div>
                ) : (
                  songs?.length > 0 ? (
                      <div className='container'>
                        {console.log("Songs")}
                        { songs.map( (song) => (
                          <Song song = {song} />
                        ))}
                        <div className='container'>
                          <FaArrowCircleUp  className="scrollTop" onClick={scrollTop} style={{height: 100, display: showScroll ? 'flex' : 'none'}}/>
                        </div>
                      </div>
                  ) : (
                    <div className='container'>
                      {console.log("No songs")}
                        <h2>No songs found</h2>
                    </div>
                )
              )
            )
          }
        </div>
  );
}

export default App;