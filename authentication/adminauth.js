const jwt = require("jsonwebtoken");

const isAdmin = async (req, res,next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ message: "Forbidden" });
  } else {
   await jwt.verify(token, "express", (err, decode) => {
      if (err) {
        res.json({ message: "unauthorised" });
      } else {
       
if(decode.role== "admin"){
    decode=req.info
return next()

}else(res.json({message:"you are not authorized as an admin"}))


      }
    });
  }
};
module.exports= isAdmin