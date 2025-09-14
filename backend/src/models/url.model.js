import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl :{
     type :String,
     required : true
    },
    shortUrl :{
        type : String,
        required:true,
        unique : true,
    },
    urlCode :{
        type : String,
        required : true,
        unique : true,
    },
    createdAt:{
        type : Date,
        default : Date.now
    },
    clickCount :{
        type : Number,
        default : 0
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
});

const Url = mongoose.model("Url",urlSchema);
export default Url;