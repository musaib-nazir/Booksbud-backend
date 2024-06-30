const mongoose = require("mongoose")

const User = mongoose.model("User",{
ProfilePicurl:String,
firstname : String,
lastname:String,
email:String,
phone:String,
password:String,
Birthday:String,
role: {type : String,default:"user"},

address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  cart: [],
  purchasedBooks :[],
SOldBOoks  : [
],
reviewsGiven:[{ type: mongoose.Schema.Types.ObjectId}]

})



module.exports= User;