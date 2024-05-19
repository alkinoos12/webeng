import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import DataPicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const URL = "http://localhost:5000";
const songUrl = URL + "/song/";

const CreateForm = () => {

  const [data, setData] = useState({
      id: "",
      name: "",
      popularity: 0,
      duration: 0,
      explicit: true,
      releaseDate: "",
      id_artists: "",
      artists: ""
  });

  const handle = async (e) => {
    const newData = {...data};
    newData[e.target.id] = e.target.value;
    setData(newData);
    console(newData);
  }

    const [flag, setFlag] = useState(0);

    // const createSong = async (flag) => {
    //     try{
    //       const res = await axios.post(`${songUrl}`, {
    //         id: data.id,
    //         name: data.name,
    //         popularity: data.popularity,
    //         duration: data.duration,
    //         explicit: flag == 1 ? true : false,
    //         releaseDate: data.release_date,
    //         id_artists: data.id_artists,
    //         artists: data.artists
    //       })
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }

  return (
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label value="id">ID</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id="id" value={data.id} type="id" placeholder="Enter ID" />
            </Form.Group>
    
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label value="name">Name</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id="name" value={data.name} type="name" placeholder="Enter Name" />
            </Form.Group>
          </Row>
    
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label value="id_artists">Artists ID</Form.Label>
            <Form.Control onChange={(e) => handle(e)} id="id_artists" value={data.id_artists} placeholder="Enter Artists ID" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label value="artists">Artists</Form.Label>
            <Form.Control onChange={(e) => handle(e)} id="artists" value={data.artists} placeholder="Enter Artists" />
          </Form.Group>
    
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label value="popularity">Popularity</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id = "popularity" value={data.popularity} placeholder="Enter Popularity"/>
            </Form.Group>
    
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label value="duration">Duration</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id = "duration" value={data.duration} placeholder="Enter Duration"/>
            </Form.Group>
    
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label value='release_date'>Release Date</Form.Label>
              <div>
              <DataPicker
                se
                onChange={(e) => handle(e)}
                className="form-control"
                minDate={new Date()}
              />
              </div>
            </Form.Group>
          </Row>
          
    
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Explicit" onClick={() => {setFlag(1)}} />
          </Form.Group>
          <Button variant="primary" type="submit" >
            Create
          </Button>
        </Form>
      );
    }
    
export default CreateForm;