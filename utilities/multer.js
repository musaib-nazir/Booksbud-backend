const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const multmidware = upload.single('image');

module.exports = (req, res, next) => {
  multmidware(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(400).json({ message: 'Multer error occurred during file upload', error: err });
    } else if (err) {
      console.error('Unknown error:', err);
      return res.status(500).json({ message: 'Unknown error occurred during file upload', error: err });
    }
    next();
  });
};
