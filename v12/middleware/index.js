// All the middle ware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj={
    
};

middlewareObj.checkCampgroundOwnership=function(req,res,next){
    
     // //does user own campground
        // console.log(foundCampground.author.id);//always remeber.. this is a mongoose object
        // console.log(req.user._id);//this is a string.. so they are not same
    
        if(req.isAuthenticated())
        {
            
            Campground.findById(req.params.id, function(err, foundCampground){
            if(err)
            {
                req.flash("error","Campground Not Found");
               res.redirect("back");
            }
           else
            //does user own campground
            if(foundCampground.author.id .equals(req.user._id) )
            {
             next();   
            }
            else{
                req.flash("error","You Dont Have Permisson to do that");
                res.redirect("back");
            }
        }); 
        }else{
            req.flash("error","You Need To Be LoggedIn");
            res.redirect("back");
        }
}
middlewareObj.checkCommentOwnership=function(req,res,next){
    
     // //does user own campground
        // console.log(foundCampground.author.id);//always remeber.. this is a mongoose object
        // console.log(req.user._id);//this is a string.. so they are not same
    
    if(req.isAuthenticated())
    {
        
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err)
        {
            req.flash("error","Comment Not Found");
           res.redirect("back");
        }
       else
        //does user own campground
        if(foundComment.author.id .equals(req.user._id) )
        {
         next();   
        }
        else{
             req.flash("error","You Dont Have Permisson to do that");
            res.redirect("back");
        }
    }); 
    }else{
        req.flash("error","You Need To Be LoggedIn");
        res.redirect("back");
    }
}
middlewareObj.isLoggedIn=function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please LogIn First!")
    res.redirect("/login");
}



module.exports=middlewareObj;
