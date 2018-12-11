var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    =require("passport"),
    LocalStratergy  =require("passport-local"),
   // passportLocalMongoose    =require("passport-local-mongoose"),
    flash           =require("connect-flash"),
    methodOverride   =require("method-override"),
    Campground  =require("./models/campground"),
    Comment     =require("./models/comment"),
    User       =require("./models/user"),
    seedDb      =require("./seeds"),
    app         = express();

/////////REQUIRING ROUTES////////////

var campgroundRoutes    =require("./routes/campgrounds"),
    commentRoutes       =require("./routes/comments"),
    indexRoutes          =require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp_v3");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
console.log(__dirname);
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');
//seedDb();
///////PASSPORT CONFIGURATION/////////////////
app.use(require("express-session")({
    secret:"This is the secret Code",
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");// flash message initialisation for every page
     res.locals.success=req.flash("success");
    next();
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



////// MAKING OUR APP LISTEN TO THE CURRENT PORT AND ENVIORNMENT//////
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("YELP CAMP has Started!!")
})