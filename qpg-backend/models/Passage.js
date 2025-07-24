import mongoose from 'mongoose';

const passageSchema = new mongoose.Schema({
  passageId: { type: String, required: true, unique: true },
  text: { type: String, required: true }, // LaTeX/tables/images allowed
});

export default mongoose.model('Passage', passageSchema);
