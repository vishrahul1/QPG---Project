import XLSX from 'xlsx';
import fs from 'fs';
import Question from '../models/Question.js';
import Passage from '../models/Passage.js';

export const uploadQuestionsFromExcel = async (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheet1 = XLSX.utils.sheet_to_json(workbook.Sheets['questions']);
    const sheet2 = XLSX.utils.sheet_to_json(workbook.Sheets['passages'] || {});

    // Save passages first
    for (const row of sheet2) {
      await Passage.updateOne(
        { passageId: row.PassageID },
        { $set: { text: row.PassageText } },
        { upsert: true }
      );
    }

    // Save questions
    for (const row of sheet1) {
      const question = new Question({
        questionText: row.QuestionText,
        type: row.Type,
        options: row.Options ? row.Options.split(',') : [],
        answer: row.Answer,
        imageUrl: row.ImageUrl || '',
        latex: row.LaTeX || '',
        passageId: row.PassageID || null,
      });
      await question.save();
    }

    fs.unlinkSync(req.file.path); // cleanup
    res.status(200).json({ message: 'Questions uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
};
