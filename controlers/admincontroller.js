const User = require("../modals/usermodal");
const Books = require("../modals/booksmodal")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretkey = process.env.SECRET_KEY;
// const transporter = require("../utils/nodemailer");
const cloudinary = require("../utilities/cloudinary");

const createAdmin = async (req, res) => {
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
          console.log(profilepicUrl);
          if (profilepicUrl !== "") {
            const newAdmin = await new User({
              firstname,
              lastname,
              email,
              phone,
              password: hasshpass,
              birthday,
              profilepicUrl,
              role: "admin",
            });

            newAdmin.save();

            res.json({ message: "admin registered  successfully" });
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

const getUsers = async (req, res) => {
  const allUsers = await User.find({ role: "user" });

  res.json(allUsers);
};

const getAdmins = async (req, res) => {
  const allAdmins = await User.find({ role: "admin" });

  res.json(allAdmins);
};

const addBooks = async (req, res) => {
  const { title, author, price, ISBN, stockquantity } = req.body;

  const image = req.file.path


  if (title && author && price && ISBN && stockquantity && image !== "") {
    const alreadyexists = await Books.findOne({ ISBN });
   
    if (!alreadyexists) {
      const upload = await cloudinary.v2.uploader.upload(image, {
        folder: "booksbud_books",
      });

      if (upload) {
        const coverImageUrl = await upload.secure_url;

       
          const newBook = new Books({
            title,
            author,
            price,
            ISBN,
            coverImageUrl,
            stockquantity,
           
          });
          newBook.save()
        return  res.json({message:"book uploaded successfully"})
 
      }else {res.json({message:"error uploading image"})}
    } else {res.json({message:" Book already exists in data base"})}
  }else {res.json({message:"book details required"})}
};
  



 const deletebook = async (req,res)=>{


  const {ISBN} = req.body

if(ISBN !== "")
{const deletebook = await Books.findOneAndDelete(ISBN)

if(deletebook){


res.json({message:"Book deleted succcessfully"})


}else{res.json({message:"deletion failed"})}








}else{res.json({message:"ISBN not valid"})}







 }
module.exports = { createAdmin, getUsers, getAdmins ,addBooks,deletebook };
