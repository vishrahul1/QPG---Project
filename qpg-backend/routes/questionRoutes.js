import express from 'express';
import { uploadQuestionsFromExcel } from '../controllers/questionController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadQuestionsFromExcel);

export default router;
