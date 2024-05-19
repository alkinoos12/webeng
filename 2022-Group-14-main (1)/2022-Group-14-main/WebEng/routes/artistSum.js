//a model for the artist summary router(/artistSum).
import express from 'express';
const router = express.Router();
//imports the functions of /artistSum from the controller.

import{getartistSum} from '../controller/artistSum.js'; 

//assign each function to the correct endpoint.
router.get('/:id',getartistSum);

//exports the router in order to be used in the index.js and be assigned to the correct route
export default router;