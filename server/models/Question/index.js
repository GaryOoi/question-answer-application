const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
    unique: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  programmingLanguage: { type: String, required: true },
  createdAt: { type: Date, required: true },
  askedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

QuestionSchema.index({
  title: 'text',
});

const QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports = QuestionModel;
