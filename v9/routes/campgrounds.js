var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");


//==========================//
//////////ROUTES////////////                
//===========================

///////////INDEX RESTFUL ROUTE////////
router.get("/campgrounds",function(req,res){
    //Get all Campgrounds from db
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err)
        }
        else
        {
            res.render("campgrounds/index",{campgrounds:allCampgrounds});// the source of campgrounds here is from db
        }                                                              
    //
  //  
})

});
///////////NEW RESTFUL ROUTE////////////////
router.get("/campgrounds/new",isLoggedIn,function(req,res){
    res.render("campgrounds/new")
})


////////////////POST ROUTE(CREATE RESTFUL route)/////////////////
router.post("/campgrounds",isLoggedIn,function(req,res){
    //get data from forms and add data to campgrounds array
    var name=req.body.name;
    var url=req.body.url;
    var description=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    
    var newCampground={name:name, url:url,description:description,author:author}; // name and url coming from the form
    //Create a new campground and save to database
    Campground.create(newCampground,function(err,newlyCreated){
        if(err)
        {
            console.log(err)
        }
        else{
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    })
    
    
    
})
///////// SHOW  Request(RESTFUL Routing)////////////
router.get("/campgrounds/:id",function(req,res){
   
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
    
});







function isLoggedIn(req,res,next)
{
    if (req.isAuthenticated())
    {
        return next();
    }
    else
    {
        res.redirect("/login")
    }
}
module.exports=router;