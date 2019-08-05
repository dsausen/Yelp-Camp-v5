// npm i express ejs bodyParser mongoose

var bodyParser = require("body-parser"),
    mongoose = require("mongoose"), 
    express = require("express"),
    app = express(),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds")

app.set("view engine", "ejs")
app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({extended: true}))

mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp")
// seedDB()

var campgrounds = [
    {name: "Salmon Creek", image: "http://www.campingjacare.com.br/wp/wp-content/uploads/2016/11/camping-jacare-brotas-15-1024x768.jpg"},
    {name: "Tuna Harbor", image: "http://www.campingjacare.com.br/wp/wp-content/uploads/2016/11/camping-jacare-brotas-1.jpg"},
    {name: "Coelacanth Bay", image: "https://www.cachoeira3quedas.com.br/wp-content/uploads/2014/11/camping-cachoeira-3-quedas-5.jpg"},
    {name: "Shrimp River", image: "http://www.campingjacare.com.br/wp/wp-content/uploads/2016/11/camping-jacare-brotas-3-1024x768.jpg"},
    {name: "Shark Beach", image: "https://r-ec.bstatic.com/images/hotel/max1024x768/176/176085649.jpg"},
    {name: "Arid Mountain", image: "https://caravelapousada.com/wp-content/uploads/2017/05/cachoeira-caravela-camping-ilhabela-2.jpg"},
    {name: "Superb Campfire", image: "https://macamp.com.br/guia/wp-content/uploads/2018/12/Camping-Espa%C3%A7o-Ubatuba-SP-4.jpg"},
    {name: "Nice Kombi", image: "https://recantodoscarvalhos.com.br/painel/images/camping2/46da868a672f4f457223ee57ff3b9d0a.jpg"},
    {name: "Epic Fire", image: "https://www.maloufsmountain.com/wp-content/uploads/2019/04/hike-in-platform-camping-1024x768.jpg"},
]

app.get("/", (req, res) => {
    res.render("landing")
})

//REST: INDEX
app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if(err) {
            console.log(`Oh no...\n${err}`)
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds})
        }
    })
})

//REST: NEW
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new")
})

//REST: CREATE
app.post("/campgrounds", (req, res) => {
    var newCampground = {name: req.body.name, image: req.body.image, description: req.body.description}
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err) {
            console.log(`Oh no...\n${err}`)
        } else {
            res.redirect("/campgrounds")
        }
    })
})

//REST: SHOW
app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err) {
            console.log(`Oh no...\n${err}`)
        } else {
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
})

/* COMMENTS ROUTES */
app.get("/campgrounds/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {console.log(err)} else {
            res.render("comments/new", {campground: campground})
        }
    })
})

app.post("/campgrounds/:id/comments", (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {console.log(err)} else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {console.log(err)} else {
                    campground.comments.push(comment)
                    campground.save()
                    res.redirect(`/campgrounds/${campground._id}`)
                }
            })
        }
    })
})

app.listen(3000, () => {
    console.log("Serving YelpCamp on port 3000.")
})
