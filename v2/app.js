var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    app         = express();

mongoose.connect("mongodb://localhost:27017/yelp_camp");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

////SCHEMA SETUP STARTS HERE/////

var campgroundSchema=new mongoose.Schema({
    name:String,
    url:String,
    description:String
})
var Campground=mongoose.model("Campground",campgroundSchema);

///Creating Campground isnide our campground database///////
// Campground.create(
//     {
//         name:"Salmon Creek",
//         url:"https://images.unsplash.com/photo-1543462721-da3928cac175?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=459c49ddac6e9f2da733cab12298596f&auto=format&fit=crop&w=500&q=60",
//         description:"This is Salmon Creek"
        
//     },function(err,campground){
//         if(err)
//         {
//             console.log(err)
//         }
//         else
//         {
//             console.log(campground)
//         }
//     })
// Campground.create(
//     {
//         name:"Granite Hill",
//         url:"https://images.unsplash.com/photo-1543449982-bea74f6b26df?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6246497d23d1d0094d517b30a8b14480&auto=format&fit=crop&w=500&q=60",
//         description:" THis is a huge granite Hill"
        
//     },function(err,campground){
//         if(err)
//         {
//             console.log(err)
//         }
//         else
//         {
//             console.log(campground)
//         }
//     })
    
////////////GET ROUTE STARTS HERE/////////////
app.get("/",function(req,res){
    res.render("landing")
   
})
///////////INDEX RESTFUL ROUTE////////
app.get("/campgrounds",function(req,res){
    //Get all Campgrounds from db
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err)
        }
        else
        {
            res.render("index",{campgrounds:allCampgrounds});// the source of campgrounds here is from db
        }
    })
    //
  //  
})

////////////NEW RESTFUL ROUTE////////////////
app.get("/campgrounds/new",function(req,res){
    res.render("new")
})


////////////////POST ROUTE(CREATE RESTFUL route)/////////////////
app.post("/campgrounds",function(req,res){
    //get data from forms and add data to campgrounds array
    var name=req.body.name;
    var url=req.body.url;
    var description=req.body.description;
    var newCampground={name:name, url:url,description:description}; // name and url coming from the form
    //Create a new campground and save to database
    Campground.create(newCampground,function(err,newlyCreated){
        if(err)
        {
            console.log(err)
        }
        else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    })
    
    
    
})
///////// SHOW  Request(RESTFUL Routing)////////////
app.get("/campgrounds/:id",function(req,res){
   
    // find the campground with provide id
     Campground.findById(req.params.id,function(err,foundCampground){
         if(err){
             console.log(err)
         }
         else
         {
            res.render("show",{campground:foundCampground});
         }
     })
    //render show template with that campground
    
})
 

////// MAKING OUR APP LISTEN TO THE CURRENT PORT AND ENVIORNMENT//////
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("YELP CAMP has Started!!")
})