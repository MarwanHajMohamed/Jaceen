import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary';

const router = express.Router();
const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {
  res.json({ imageUrl: req.file.path });
});

export default router;
