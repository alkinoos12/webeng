import mongoose from 'mongoose';
//creates a mongoose schema for song in order to be able to later find and  the mongodb database/collection.
const schema=mongoose.Schema({
    artists:{
        type: String,
    },
    duration_ms:{
        type:Number,
        required:[false]
    },
    explicit:{
        type:Boolean,
        required:[false],
        default:false
    },

    id:{
        type:String,
        required: [true,'id is required']
    },
    id_artists:{
        type :String,
    },

    name:{
        type:String,
        required:[true,'name is required']
    },
    popularity:{
        type:Number,
        required:[false]
    },
   
   
    release_date:{
        type:String,
        required:[false]
    }
})
const song=mongoose.model('song',schema);

//exports the mongoose model for song which is a wrapper of the mongoose schema that enables you to create update etc,in the database.
export default song;