const express = require("express");
const mongoose =require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {registerController, loginController, logoutController} = require("./controlers/usercontrollers");
const multmidware = require("./utilities/multer");
const { createAdmin, getUsers, getAdmins, addBooks, deletebook } = require("./controlers/admincontroller");
const isAdmin = require("./authentication/adminauth");
const connectDB = require("./config/conndb");




const app = express();

app.use(bodyParser.json()) //  using third party libarary 
app.use(cors())
app.use(cookieParser())

require("dotenv").config();



connectDB()



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
app.post("/admin/addbooks",multmidware ,isAdmin,addBooks)
app.post("/admin/deletebook",isAdmin,deletebook)




// there are no chnages just nothing


app.listen(5000, console.log("connected on localhost:5000"));
