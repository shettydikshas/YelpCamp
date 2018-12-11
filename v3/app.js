var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  =require("./models/campground"),
    Comment     =require("./models/comment"),
    // Users       =require("./models/user"),
    seedDb      =require("./seeds"),
    app         = express();


mongoose.connect("mongodb://localhost:27017/yelp_camp_v3");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));


seedDb();
    
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
     Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
         if(err){
             console.log(err)
         }
         else
         {
             console.log("found campground")
            res.render("show",{campground:foundCampground});
         }
     })
    //render show template with that campground
    
})
 

////// MAKING OUR APP LISTEN TO THE CURRENT PORT AND ENVIORNMENT//////
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("YELP CAMP has Started!!")
})