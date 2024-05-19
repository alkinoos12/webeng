import artist from '../models/artist.js';

//retrieves an artist from the database by the given id.
export const getartist=async(req,res) => {
    try{
    console.log(req.params.id);
    const Artist= await artist.find({id:(req.params.id)})
    res.status(200).json(Artist);
}catch(error){
    res.status(409).json({message:error.message});
}
}

//function that implements the DELETE/artist/:id(deletes an artist)
export const deleteArtist=async(req,res)=>{
    const idArtist=req.params.id;
    try{
        const appId= "'"+idArtist+"'";
        const reg= new RegExp(appId);
        while(await song.find({id_artists:{$regex: reg}}).count() > 0){
            await song.findOneAndDelete({id_artists:{$regex: reg}});
            console.log("here is the problem");
          }

       await artist.findOneAndDelete({id:idArtist});
        res.status(204).json("Artist and songs deleted Succesfully");
        console.log("deleted");
    }catch(error){
        res.status(409).json({message:error.message});
    }
}