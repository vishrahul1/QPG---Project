import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  type: { type: String, enum: ['MCQ-S', 'MCQ-M', 'INTEGER', 'SHORT', 'COMPREHENSION', 'MATCH'], required: true },
  options: [String], // only for MCQs
  answer: mongoose.Schema.Types.Mixed, // string, array, number, etc.
  imageUrl: String,  // uploaded to Cloudinary
  latex: String,     // optional LaTeX string
  passageId: String, // for comprehension questions
});

export default mongoose.model('Question', questionSchema);
