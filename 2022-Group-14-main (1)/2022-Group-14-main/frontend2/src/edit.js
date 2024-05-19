import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const URL = "http://localhost:5000";
const songUrl = URL + "/song/";

const Edit = (id, release_date, name, artists) => {
  const [show, setShow] = useState(false);

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

  const handle = async (e) => {
    const newData = {...data};
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

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
              <Form.Control onChange={(e) => handle(e)} id="id" value={data.id} type="id" placeholder='' />
            </Form.Group>
    
            <Form.Group as={Col} >
              <Form.Label value="name">Name</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id="name" value={data.name} type="name" placeholder=''/>
            </Form.Group>
           </Row>
    
          <Form.Group className="mb-3">
            <Form.Label value="id_artists">Artists ID</Form.Label>
            <Form.Control onChange={(e) => handle(e)} id="id_artists" value={data.id_artists} placeholder=''/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label value="artists">Artists</Form.Label>
            <Form.Control onChange={(e) => handle(e)} id="artists" value={data.artists} placeholder='' />
          </Form.Group>
    
          <Row className="mb-3">
            <Form.Group as={Col} >
              <Form.Label value="popularity">Popularity</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id = "popularity" value={data.popularity} placeholder=''/>
            </Form.Group>
    
            <Form.Group as={Col} >
              <Form.Label value="duration">Duration</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id = "duration" value={data.duration} placeholder=''/>
            </Form.Group>
    
            <Form.Group as={Col}>
              <Form.Label value='release_date'>Release Date</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id = "releaseDate" value={data.releaseDate} placeholder='' />
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