const User = require("../modals/usermodal");

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

  const Image = req.file.path;

  if (title && author && price && ISBN && stockquantity && Image !== "") {
    const alreadyexists = await findone({ ISBN });
    if (!alreadyexists) {
      const coverImage = cloudinary.v2.uploader.upload(Image, {
        folder: "booksbud_books",
      });

      if (coverImage) {
        const coverImageUrl = await upload.secure_url;

        if (coverImageUrl !== "") {
          const newBook = new Books({
            title,
            author,
            price,
            ISBN,
            stockquantity,
            coverImageUrl,
          });
          newBook.save()
        }
      }else {res.json({message:"error uploading image"})}
    } else {res.json({message:" Book already exists in data base"})}
  }else {res.json({message:"book details required"})}
};

module.exports = { createAdmin, getUsers, getAdmins };
