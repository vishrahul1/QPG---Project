const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    // Delete local file after upload
    fs.unlinkSync(req.file.path);
    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
});

module.exports = router;
