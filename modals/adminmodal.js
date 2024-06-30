const mongoose = require("mongoose")

const Admin = mongoose.model("admin",{
ProfilePicurl:String,
firstname : String,
lastname:String,
email:String,
phone:String,
password:String,
Birthday:String,
role: {type : String,default:"admin"},


})



module.exports= Admin;