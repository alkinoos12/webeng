//a model for the artist router(/artist).
import express from 'express';
const router = express.Router();

//imports the functions of /artist from the controller
import{deleteArtist, getartist} from '../controller/artist.js';

//assign each function to the correct endpoint.
router.get('/:id',getartist);
router.delete('/:id',deleteArtist);

//exports the router in order to be used in the index.js and be assigned to the correct route
export default router;