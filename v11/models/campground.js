var mongoose=require("mongoose");

////SCHEMA SETUP STARTS HERE/////
var campgroundSchema=new mongoose.Schema({
    name:String,
    url:String,
    description:String,
    createdAt: { type: Date, default: Date.now },
    author:{
      id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
          
      },
      username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId, // Association between comments and campgrounds
            ref:"Comment"
        }]
})
module.exports=mongoose.model("Campground",campgroundSchema);