const express = require("express");
const mongoose =require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {registerController, loginController, logoutController} = require("./controlers/usercontrollers");
const multmidware = require("./utilities/multer");
const { createAdmin, getUsers, getAdmins } = require("./controlers/admincontroller");
const isAdmin = require("./authentication/adminauth");




const app = express();

app.use(bodyParser.json()) //  using third party libarary 
app.use(cors())
app.use(cookieParser())

require("dotenv").config();

const url = process.env.MONGO_URL;

if(mongoose.connect(url)){
console.log("database connected on MOngoDb")


}else{console.log("something is wrong")}



app.get("/", (req, res) => {
  console.log("running");
});

app.post("/user/register" , multmidware,registerController)
app.post("/user/login",loginController)
app.post("/user/logout",logoutController)




// admincontrolls
app.post("/admin/create" ,multmidware, createAdmin)
app.get("/admin/getusers" ,isAdmin,getUsers)
app.get("/admin/getadmins" ,isAdmin,getAdmins)







app.listen(6000, console.log("connected on localhost:6000"));
