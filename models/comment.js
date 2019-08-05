var mongoose = require("mongoose")

var commentSchema = new mongoose.Schema({
    text: String,
    author: String
}),
    Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment
