import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Edit from './edit'
import Col from 'react-bootstrap/Col'

const URL = "http://localhost:5000";
const songUrl = URL + "/song/";

//This function is used to display a song
const Song = ({ song: { id, release_date, name, artists, id_artists, duration, popularity} }, idx) => {

  const [songs, setSongs] = useState(1);

  //This is the data that is going to be edited
  const data = {
    id: id,
    name: name,
    releaseDate: release_date,
    popularity: popularity,
    duration: duration,
    id_artists: id_artists,
    artists: artists
  };

  //This function is used to delete a song
  const deleteSong = async (id) => {
    console.log(id);
    const res = await axios.delete(`${songUrl}${id}`);
    setSongs(0);
    console.log(res.data);
  }

  //This is the function that is called when the page is loaded
  return (
    <div>
      { songs > 0 ? (
      <Card className={"m-2"}  key={idx} style={{ width: '15rem' }}>
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
            <Edit song={data} ></Edit>

          </ButtonGroup>
        </Card.Body>
      </Card>
      ) : (
      <div>
        <p>Deleted</p>
      </div>
      )
    }
    </div>
  );
}

export default Song;