import mongoose from 'mongoose';

const sentenceSchema = new mongoose.Schema({
  sentence: {
    type: String,
    required: true,
    unique: true,
  },
  signLanguageResult: {
    type: String,
    required: true,
  },
  relatedSearches: {
    type: [String],
    default: [],
  },
});

const Sentence = mongoose.model('Sentence', sentenceSchema);

export default Sentence;
