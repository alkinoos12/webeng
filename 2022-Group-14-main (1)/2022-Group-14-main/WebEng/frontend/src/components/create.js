
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
      explicit: false,
      releaseDate: "",
      id_artists: "",
      artists: ""
  });

  const create = async (e) => {
    console.log("Create func");
    try{
        const response = await axios.post(`${songUrl}`, {
          id: data.id,
          name: data.name,
          popularity: parseInt(data.popularity),
          duration: parseInt(data.duration),
          explicit: data.explicit,
          releaseDate: new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear(),
          id_artists: data.id_artists,
          artists: data.artists
        });
        console.log(response.data);
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
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label value="id">ID</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id="id" value={data.id} type="id" placeholder="Enter ID" />
            </Form.Group>
    
            <Form.Group as={Col} >
              <Form.Label value="name">Name</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id="name" value={data.name} type="name" placeholder="Enter Name" />
            </Form.Group>
          </Row>
    
          <Form.Group className="mb-3">
            <Form.Label value="id_artists">Artists ID</Form.Label>
            <Form.Control onChange={(e) => handle(e)} id="id_artists" value={data.id_artists} placeholder="Enter Artists ID" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label value="artists">Artists</Form.Label>
            <Form.Control onChange={(e) => handle(e)} id="artists" value={data.artists} placeholder="Enter Artists" />
          </Form.Group>
    
          <Row className="mb-3">
            <Form.Group as={Col} >
              <Form.Label value="popularity">Popularity</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id = "popularity" value={data.popularity} placeholder="Enter Popularity"/>
            </Form.Group>
    
            <Form.Group as={Col} >
              <Form.Label value="duration">Duration</Form.Label>
              <Form.Control onChange={(e) => handle(e)} id = "duration" value={data.duration} placeholder="Enter Duration"/>
            </Form.Group>
    
          
          </Row>
          
    
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" id="explicit" value={data.explicit} label="Explicit" onClick={() => data.explicit = true}/>
          </Form.Group>
          <Button onClick={(e) => create(e)} variant="primary"  >
            Create
          </Button>
        </Form>
      );
    }
    
export default CreateForm;