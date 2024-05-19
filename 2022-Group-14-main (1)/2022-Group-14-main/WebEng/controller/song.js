import song from "../models/song.js";

//Function that implements the GET/song/:id retrieving a song from the database by its id.
 export const getsongById=async (req,res)=>{
        try{ 
           const Song= await song.find({id:(req.params.id)})
                res.status(200).json(Song);
                console.log(Song);
            }catch(error){
                res.status(409).json({message:error.message});
            }
}
//Function that implements the PUT/song/:id.
export const updateSong=async(req,res)=>{
    await song.findOneAndUpdate({id:req.params.id},{id:req.body.id,
        name:req.body.name,popularity:Number(req.body.popularity),duration_ms:Number(req.body.duration),
    explicit:Boolean(req.body.explicit),release_date:req.body.releaseDate,artist_id:req.body.id_artists,artist:req.body.artist});
    res.send("updated");
}

export const deleteSong=async(req,res)=>{
    try{
       await song.findOneAndDelete({id:req.params.id});
        res.status(204).json("Song deleted Succesfully");
        console.log("deleted");
    }catch(error){
        res.status(409).json({message:error.message});
    }
}
//function that implements the endpoint POST/song which creates a new song from a required body.
export const createSong=async (req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    const popularity=req.body.popularity;
    const duration=req.body.duration;
    const releaseDate=req.body.releaseDate;
    const explicit=req.body.explicit;
    const artist_id=req.body.id_artists;
    const artist=req.body.artist;
    if(await song.findOne({id:id})){
        console.log("Song already exists");

        res.status(409).json("Song already exists");
    }
    else{
    console.log(id)
    const createSong=new song({
        id:id,
        name:name,
        popularity:popularity,
        duration_ms:duration,
        release_date:releaseDate,
        explicit:explicit,
        artist_id:artist_id,
        artist:artist
    });

    try{
        console.log(createSong);
        song.create(createSong);
        res.status(201).json(createSong);

    } catch(error){
        res.status(409).json({message:error.message});

    }
}
}