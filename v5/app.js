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
app.use(express.static(__dirname+"/public"));
console.log(__dirname);

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
            res.render("campgrounds/index",{campgrounds:allCampgrounds});// the source of campgrounds here is from db
        }
    })
    //
  //  
})

////////////NEW RESTFUL ROUTE////////////////
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new")
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
            res.render("campgrounds/show",{campground:foundCampground});
         }
     })
    //render show template with that campground
    
})
 
//=========================================//
//     COMMENTS ROUTES START HERE          //
//=========================================//

app.get("/campgrounds/:id/comments/new",function(req, res) {
    //find campground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err)
        {
            console.log(err);
        }
        else
        {
           res.render("comments/new",{campground:campground}); 
        }
    })
    
    
})

app.post("/campgrounds/:id/comments",function(req,res){
    //look up campground using id
    //create new comment
    //connect new comment to casmpground
    //redirect to campground show page
   Campground.findById(req.params.id,function(err, campground) {
    if(err)
    {
        console.log(err);
        res.redirect("/campgrounds")
    }
    else
    {
       Comment.create(req.body.comment,function(err,comment){
           if(err){
               console.log(err);
           }
           else{
               campground.comments.push(comment);
               campground.save();
               res.redirect("/campgrounds/"+campground._id);
           }
       }) 
    }
})
    
}
)

////// MAKING OUR APP LISTEN TO THE CURRENT PORT AND ENVIORNMENT//////
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("YELP CAMP has Started!!")
})