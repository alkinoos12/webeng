import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Edit from './edit'
import Col from 'react-bootstrap/Col'

const URL = "http://localhost:5000";
const songUrl = URL + "/song/";



const Song = ({ song: { id, release_date, name, artists} }) => {

  const [songs, setSongs] = useState(1);

  const deleteSong = async (id) => {
    const res = await axios.delete(`${songUrl}${id}`);
    setSongs(0);
    console.log(res.data);
  }

  return (
    <div>
    <Col xs={12} md={6} lg={4}>
      { songs > 0 ? (
      <Card style={{ width: '15rem' }}>
        <Card.Img variant="top" src="https://cdn.iconscout.com/icon/free/png-256/music-1891103-1598016.png" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <div>
              <p>Year: {release_date}</p>
              <p>{artists}</p>
            </div>
          </Card.Text>
          <ButtonGroup aria-label="Basic example">
            <Button variant="secondary" onClick={() => {deleteSong(id)}}>Delete</Button>
            <Edit _id={id} release_date={release_date} name={name} artists={artists}></Edit>

          </ButtonGroup>
        </Card.Body>
      </Card>
      ) : (
      <div>
        <p>Deleted</p>
      </div>
      )
    }
    </Col>
    </div>
  );
}

export default Song;