//a model for the artists router(/artists).
import express from 'express';
const router = express.Router();

//imports the functions of /artists from the controller.
import{getArtists} from '../controller/artists.js'; 

//assign each function to the correct endpoint.
router.get('/',getArtists);

//exports the router in order to be used in the index.js and be assigned to the correct route
export default router;