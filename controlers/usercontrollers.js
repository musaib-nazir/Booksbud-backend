const User = require("../modals/usermodal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretkey = process.env.SECRET_KEY
// const transporter = require("../utils/nodemailer");
const cloudinary = require("../utilities/cloudinary");

const registerController = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password, birthday } = req.body;

    const image = req.file.path;
   

    if (firstname && email && phone && password && birthday && image !== "") {
      const existinguser = await User.findOne({ email });

      if (!existinguser) {
        const hasshpass = await bcrypt.hash(password, 10);

        const upload = await cloudinary.v2.uploader.upload(image, {
          folder: "booksbud_profile",
        });

        if (upload) {
          const profilepicUrl = upload.secure_url;
          console.log(profilepicUrl)
          if (profilepicUrl !== "") {
            const newuser =  await new User({
              firstname,
              lastname,
              email,
              phone,
              password: hasshpass,
              birthday,
              profilepicUrl,
            });

            newuser.save();

         
              res.json({ message: "registration successful" });
          
          }
        } else {
          res.json({ message: "error ehile uplloading image" });
        }
      } else {
        res.json({ message: "User already exists" });
      }
    } else {
      res.json({ message: "All credentials required" });
    }
  } catch (error) {
    console.log(error);
  }
};



const loginController = async(req,res)=>{

const {email,password} = req.body
if(email !== ""&& password !== ""){





  const isUser= await User.findOne({email})
  
  if(isUser){
  const confpass = await bcrypt.compare(password,isUser.password)
  
  if(confpass){
  
const token =   jwt.sign({


firstname:isUser.firstname, 

lastname: isUser.lastname,
_id : isUser._id,
email:isUser.email,
password:isUser.password,

role:isUser.role
}, "express")

  res.cookie("token ",token ,isUser.role,{httpOnly : true})
  res.json({message:"logged in successfully" , token})
  
  }else{
  res.json({message:"password does not match"})
  
  
  
  }
  
  
  
  
  }else{res.json({message:"user not found"})}
  

 
} else{res.json({message:"alll credentials required"})}







}


const logoutController = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      res.clearCookie("token");
      res.json({ message: "logged Out succesfuly" });
    } else {
      res.json({ message: "missing token" });
    }
  }


  catch (error) {
    console.log(error);
    res.json({ message: "internal server Error " });
  }
};

















module.exports = {
  registerController,
  loginController,
  
  logoutController
};
