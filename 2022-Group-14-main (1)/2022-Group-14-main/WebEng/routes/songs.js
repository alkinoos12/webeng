//a model for the songs router(/songs).
import express from 'express';
const router = express.Router();

//imports the  function for /songs from the controller.
import{ getsongs } from '../controller/songs.js'; 
import{ deleteSongsByArtist } from '../controller/songs.js';

//assign each function to the correct endpoint.
router.get('/',getsongs);
router.delete('/',deleteSongsByArtist);

//exports the router in order to be used in the index.js and be assigned to the correct route
export default router;