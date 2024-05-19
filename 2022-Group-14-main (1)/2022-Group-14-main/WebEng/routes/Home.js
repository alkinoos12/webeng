//a model for the Home router(/).

import express from 'express';
const router = express.Router();

//imports the functions of /Home from the controller.
import{ getHome } from '../controller/home.js';

//assign each function to the correct endpoint.
router.get('/',getHome);

//exports the router in order to be used in the index.js and be assigned to the correct route
export default router;