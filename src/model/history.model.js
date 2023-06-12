import mongoose from 'mongoose';

const translationHistorySchema = new mongoose.Schema({
  option: { type: String, required: true },
  originalText: { type: String, required: true },
  translatedText: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  favorite: { type: Boolean, default: false },
  createdAt: { type: Date, required: true, default: Date.now },
});

const TranslationHistory = mongoose.model('TranslationHistory', translationHistorySchema);

export default TranslationHistory;
