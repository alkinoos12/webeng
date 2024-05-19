//a model for the song router(/song).
import express from 'express';
const router = express.Router();
//imports the functions of /song from the controller

import{getsongById,createSong,updateSong, deleteSong } from '../controller/song.js';

//assign each function to the correct endpoint.
router.post('/',createSong);
router.get('/:id',getsongById);
router.put('/:id',updateSong);
router.delete('/:id',deleteSong);

//exports the router in order to be used in the index.js and be assigned to the correct route
export default router;