import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Placeholder from 'react-bootstrap/Placeholder';


const URL = "http://localhost:5000";
const songUrl = URL + "/song/";

//This function is used to edit a song
const Edit = ({ song: { id, release_date, name, artists, id_artists, duration, popularity} }) => {
  const [show, setShow] = useState(false);

  //This is the data that is going to be edited
  const [data, setData] = useState({
    id: id,
    name: name,
    popularity: 0,
    duration: 0,
    explicit: false,
    releaseDate: release_date,
    id_artists: "",
    artists: artists
   });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //This function is used to edit the song
  const editSong = async (e) => {
    try{
        const res = await axios.put(`${songUrl}${data.id}`, {
          id: data.id,
          name: data.name,
          popularity: parseInt(data.popularity),
          duration: parseInt(data.duration),
          explicit: data.explicit,
          releaseDate: data.releaseDate,
          id_artists: data.id_artists,
          artists: data.artists
        });
        console.log(res.data);
    }catch (err) {
        console.log(err);
    }
  }

  //This function handles the input
  const handle = async (e) => {
    const newData = {...data};
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  //This is the function that is called when the page is loaded
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Row className="mb-3">
          <Form.Group as={Col}>
              <Form.Label value="id">ID</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id="id"  type="id" placeholder={id} />
            </Form.Group>
    
            <Form.Group as={Col} >
              <Form.Label value="name">Name</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id="name"  type="name" placeholder={name}/>
            </Form.Group>
           </Row>
    
          <Form.Group className="mb-3">
            <Form.Label value="id_artists">Artists ID</Form.Label>
            <Form.Control onChange={(e) => handle(e)} id="id_artists"  placeholder={id_artists}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label value="artists">Artists</Form.Label>
            <Form.Control onChange={(e) => handle(e)} id="artists"  placeholder={artists} />
          </Form.Group>
    
          <Row className="mb-3">
            <Form.Group as={Col} >
              <Form.Label value="popularity">Popularity</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id = "popularity"  placeholder={popularity}/>
            </Form.Group>
    
            <Form.Group as={Col} >
              <Form.Label value="duration">Duration</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id = "duration"  placeholder={duration}/>
            </Form.Group>
    
            <Form.Group as={Col}>
              <Form.Label value='release_date'>Release Date</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id = "releaseDate"  placeholder={release_date} />
              {/* <div>
              <DataPicker
                onChange={(e) => handle(e)}
                className="form-control"
                minDate={new Date()}
              />
              </div> */}
            </Form.Group>
          </Row>
        
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" id="explicit" value={data.explicit} label="Explicit" onClick={() => data.explicit = true}/>
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => {
            editSong(e);
            handleClose();
        }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;