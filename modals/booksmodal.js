const mongoose = require("mongoose");

const Books = mongoose.model("books", {

title: String,

author:String,

ISBN : String,

price:String,


coverImage : String,

stockquantity:String,



});
module.exports = Books