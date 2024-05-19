import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Form, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import CreateForm from './components/create';
import './App.css';
import Route from "./components/route";
import Name from './components/name';
import ArtistName from './components/artistName';
import RelYear from './components/relYear';
import AName from './components/aName';
import AId from './components/aId';
import SongId from './components/songId';
import ArtistId from './components/artistId.js';
import Pop from './components/pop.js';
import Home from './components/home.js';


const URL = "http://localhost:5000";
const songUrl = URL + "/song/";
const songsUrl = URL + "/songs?search_by=";
const artistUrl = URL + "/artist/";
const artistsUrl = URL + "/artists?";

const App = () => {

  const [flag, setFlag] = useState(1);

  useEffect(() => {
    setFlag(1);
  }, []);

  return (
    <div>
              <Button variant="primary" href="/home"  >
          HOME
        </Button>
      <div className="ui container">
        <Route path="/songId">
          <SongId />
        </Route>
        <Route path="/artistId">
          <ArtistId />
        </Route>
        <Route path="/create">
          <CreateForm />
        </Route>
        <Route path="/pop">
          <Pop />
        </Route>
        <Route path="/artistName">
          <ArtistName />
        </Route>
        <Route path="/name">
          <Name />
        </Route>
        <Route path="/relYear">
          <RelYear />
        </Route>
        <Route path="/aName">
          <AName />
        </Route>
        <Route path="/aId">
          <AId />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </div>
      

    </div>
  );
}

export default App;