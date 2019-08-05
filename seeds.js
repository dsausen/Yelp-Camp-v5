var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment")

var seeds = [
    {
        name: "Cloud's Rest",
        image: "http://www.campingjacare.com.br/wp/wp-content/uploads/2016/11/camping-jacare-brotas-15-1024x768.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis sollicitudin sem, eget egestas tellus. Duis nulla dui, commodo at rhoncus non, venenatis nec orci. Nunc sit amet porttitor ante. Fusce sagittis suscipit faucibus. Aliquam vel accumsan libero, vel malesuada nunc. Nunc ullamcorper lacus sapien, ut volutpat nulla volutpat a."
    },
    {
        name: "Desert Mesa",
        image: "http://www.campingjacare.com.br/wp/wp-content/uploads/2016/11/camping-jacare-brotas-1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis sollicitudin sem, eget egestas tellus. Duis nulla dui, commodo at rhoncus non, venenatis nec orci. Nunc sit amet porttitor ante. Fusce sagittis suscipit faucibus. Aliquam vel accumsan libero, vel malesuada nunc. Nunc ullamcorper lacus sapien, ut volutpat nulla volutpat a."
    },
    {
        name: "Canyon Floor",
        image: "https://www.cachoeira3quedas.com.br/wp-content/uploads/2014/11/camping-cachoeira-3-quedas-5.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis sollicitudin sem, eget egestas tellus. Duis nulla dui, commodo at rhoncus non, venenatis nec orci. Nunc sit amet porttitor ante. Fusce sagittis suscipit faucibus. Aliquam vel accumsan libero, vel malesuada nunc. Nunc ullamcorper lacus sapien, ut volutpat nulla volutpat a."
    }
]

seedDB = async() => {
    try {
        await Campground.remove({})
        console.log("Campgrounds removed.")
        await Comment.remove({})
        console.log("Comments removed.")
        for(seed of seeds) {
            campground = await Campground.create(seed)
            console.log("Created a campground.")
            comment = await Comment.create({
                text: "This place is great, but I wish there was internet.",
                author: "Homer"
            })
            console.log("Created a comment.")
            campground.comments.push(comment)
            campground.save()
            console.log("Added comment to campground.")
        }
    } catch(err) {
        console.log(err)
    }
}

module.exports = seedDB
