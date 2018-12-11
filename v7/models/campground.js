var mongoose=require("mongoose");

////SCHEMA SETUP STARTS HERE/////
var campgroundSchema=new mongoose.Schema({
    name:String,
    url:String,
    description:String,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId, // Association between comments and campgrounds
            ref:"Comment"
        }]
})
module.exports=mongoose.model("Campground",campgroundSchema);