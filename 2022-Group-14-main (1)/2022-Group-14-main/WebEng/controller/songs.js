import song from "../models/song.js";
  //the function implementing the GET/songs endpoint,getting every song in the database based on some queries.
  export const getsongs=async (req,res)=>{
      try{
        const search_by=req.query.search_by;
        const releaseDate=req.query.ReleaseYear; 
        const name = req.query.Name;
        const artistName=req.query.Artist_name;
        const artistId=req.query.Artist_id;
        const batches=req.query.batches;  

        if(search_by=="Popularity" && releaseDate!=null){
          const reg = new RegExp(releaseDate)
          const Song=await song.find({release_date:{$regex:reg}}).sort({popularity:-1}).limit(parseInt(req.query.limit));
          res.status(200).json(Song);
          console.log(Song);       
        }else if(search_by=="Name"){
          const Song=await song.find({name: name}).limit(parseInt(req.query.limit)); 
          res.status(200).json(Song);
        }
        else if(search_by=="Realese_Year" && releaseDate!=null){
          const reg = new RegExp(releaseDate)
          const Song=await song.find({release_date:{$regex:reg}}).limit(parseInt(req.query.limit));
          res.status(200).json(Song);
        }
        else if(search_by=="Artist_Name" && artistName!=null){
          const appName = "'"+artistName+"'";
          console.log(appName);
          const reg = new RegExp(appName)
          const Song=await song.find({artists:{$regex: reg}}).limit(req.query.limit);
          res.status(200).json(Song);
        }
        else if(search_by=="ArtistID"  && artistId!=null){
          const appArtistId = "'"+artistId+"'";
          const reg = new RegExp(appArtistId)
          const Song=await song.find({id_artists:{$regex: reg}}).limit(parseInt(req.query.limit));
          res.status(200).json(Song);
        }
        else if(search_by==null){
          const Song=await song.find().limit(parseInt(req.query.limit));
          res.status(200).json(Song);
        }
        else{
          res.status(404).json({message:"Invalid search_by parameter"});
        }
      }catch(error){
         res.status(404).json({message:error.message});
  }
  
  }
  //function implementing the DELETE/songs which deletes the songs by an artist name or id which will be taken from a query.
  export const deleteSongsByArtist=async(req,res)=>{
    const name = req.query.Artist_name;
    try{
      const appName = "'"+name+"'";
      const reg = new RegExp(appName)
      while(await song.find({artists:{$regex: reg}}).count() > 0){
        await song.findOneAndDelete({artists:{$regex: reg}});
      }
        res.status(200).json("Song deleted Succesfully");
        console.log("deleted");
    }catch(error){
        res.status(409).json({message:error.message});
    }
}