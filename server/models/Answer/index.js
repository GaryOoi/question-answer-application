const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true },
  questionId: {
    type: String,
    ref: 'Question',
    required: true,
  },
  answeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const AnswerModel = mongoose.model('Answer', AnswerSchema);

module.exports = AnswerModel;
