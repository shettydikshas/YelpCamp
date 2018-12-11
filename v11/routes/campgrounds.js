var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");

//==========================//
//////////ROUTES////////////                
//===========================

///////////INDEX RESTFUL ROUTE////////
router.get("/",function(req,res){
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
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new")
})


////////////////POST ROUTE(CREATE RESTFUL route)/////////////////
router.post("/",middleware.isLoggedIn,function(req,res){
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
router.get("/:id",function(req,res){
   
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
//////EDIT ROUTE//////////
router.get("/:id/edit",middleware.checkCampgroundOwnership,  function(req, res){
    //if user is logged in
 Campground.findById(req.params.id, function(err, foundCampground){
     res.render("campgrounds/edit", {campground: foundCampground});
    }); 
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

/////DELETE ROUTE////////////////////
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds")
        }
        else
        {
             res.redirect("/campgrounds")
        }
    })
})


module.exports=router;

