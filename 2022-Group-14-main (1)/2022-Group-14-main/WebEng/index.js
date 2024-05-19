import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import homeRouter from './routes/Home.js';
import songsRouter from './routes/songs.js';
import songRouter from './routes/song.js';
import artistRouter from'./routes/artist.js';
import artistsRouter from './routes/artists.js';
import artistSumRouter from './routes/artistSum.js';
//initialize the app and the port.
const PORT=process.env.PORT|| 5000;
const app = express();
app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

//assign each route with the corresponding router.
app.use('/',homeRouter);
app.use('/songs',songsRouter);
app.use('/artist',artistRouter);
app.use('/song',songRouter);
app.use('/artists',artistsRouter);
app.use('/artistSum',artistSumRouter);

//Connecting to the mongodb atlas and then starting to run the website on local host
const CONNECTION_URL='mongodb+srv://alkinoos12:apoelara123@database.djxlr2w.mongodb.net/Projects_Database?retryWrites=true&w=majority';
 mongoose.connect(CONNECTION_URL,{ useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=> app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message))