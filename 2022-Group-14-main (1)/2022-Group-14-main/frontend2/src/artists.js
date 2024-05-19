import React, { useEffect, useState} from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';

const ArtistCard = ({artist: {id, name, followers, popularity, genres}}) => {
  
  return (
    <Card style={{ width: '12rem' }}>
        <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <div>
              <p>Followers: {followers} Popularity: {popularity}</p>
              <p>{genres}</p>
            </div>
          </Card.Text>
          {/* <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={() => {deleteSong(id)}}>Delete</Button>
            <Button variant="secondary">Edit</Button>
          </ButtonGroup> */}
        </Card.Body>
      </Card>
  );
}

export default ArtistCard;


// {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
//                   <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//                   <NavDropdown.Item href="#action4">
//                     Another action
//                   </NavDropdown.Item>
//                   <NavDropdown.Divider />
//                   <NavDropdown.Item href="#action5">
//                     Something else here
//                   </NavDropdown.Item>
//                 </NavDropdown> */}