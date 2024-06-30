const multer = require('multer')
const upload = multer({dest:"uploads/"})
const multmidware = upload.single('image')
module.exports= multmidware