import artist from '../models/artist.js';
//retrieves a number of  artists with a given name depending on the given limit from a query.  
export const getArtists=async(req,res) => {
    try{
        const name=req.query.Artist_name;
        const Artist= await artist.find({name:name}).limit(parseInt(req.query.limit));
        res.status(200).json(Artist);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}