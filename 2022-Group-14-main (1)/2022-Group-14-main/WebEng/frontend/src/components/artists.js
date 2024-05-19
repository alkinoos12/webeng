import React, { useEffect, useState} from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

const ArtistCard = ({artist: {id, name, followers, popularity, genres}}) => {

  const [details, setDetails] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const getSummary = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/artistSum/${id}`, {
         headers: {
          'id': id
         }
        });
        setDetails(res.data);
        console.log(res.data);
        } catch (err) {
            console.log(err);
        }
  };

  return (
    <Card style={{ width: '15rem' }}>
        <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <div>
              <p>Followers: {followers} Popularity: {popularity}</p>
              <p>{genres}</p>
            </div>
          </Card.Text>
          <Button variant="primary" onClick={() => {
            getSummary();
            handleShow()
          }}>
                Details
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h4>{details.name}</h4>
  
                <ListGroup variant="flush">
                      <ListGroup.Item >#Song: {details.num_songs}</ListGroup.Item>
                      <ListGroup.Item>Earliest Release: {details.earliest_release}</ListGroup.Item>
                      <ListGroup.Item>Latest Release: {details.latest_release}</ListGroup.Item>
                      <ListGroup.Item>Top Popularity: {details.top_popularity}</ListGroup.Item>
                </ListGroup>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
      </Modal>
              
          
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