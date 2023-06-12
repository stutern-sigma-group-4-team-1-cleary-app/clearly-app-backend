import Translation from "../model/translation.model.js";

import { NotFoundError, BadUserRequestError } from "../error/error.js";

// Save translation to history
export const saveTranslation = async (
    option,
    originalText,
    translatedText,
    userId
  ) => {
    const translation = new Translation({
      option,
      originalText,
      translatedText,
      userId,
    });
    await translation.save();
  };
  

// Retrieve translation history for a user
export const getTranslationHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const history = await Translation.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Translation history retrieved successfully",
      data: history,
    });
  } catch (error) {
    next(error);
  }
  
};

// Mark translation as favorite
export const markAsFavorite = async (req, res, next) => {
  try {
    const { translationId } = req.params;
    const userId = req.user.id;
    
    const translation = await Translation.findOne({ _id: translationId, userId });
    if (!translation) {
      throw new NotFoundError('Translation not found');
    }
    
    translation.favorite = true;
    await translation.save();
    
    res.status(200).json({ message: 'Translation marked as favorite' });
  } catch (err) {
    next(err);
  }
};

// Remove translation from favorites
export const removeFromFavorites = async (req, res, next) => {
  try {
    const { translationId } = req.params;
    const userId = req.user.id;
    
    const translation = await Translation.findOne({ _id: translationId, userId });
    if (!translation) {
      throw new NotFoundError('Translation not found');
    }
    
    translation.favorite = false;
    await translation.save();
    
    res.status(200).json({ message: 'Translation removed from favorites' });
  } catch (err) {
    next(err);
  }
};

// Play speech translation
export const playSpeechTranslation = async (req, res, next) => {
  try {
    const { translationId } = req.params;
    const userId = req.user.id;
    
    const translation = await Translation.findOne({ _id: translationId, userId });
    if (!translation) {
      throw new NotFoundError('Translation not found');
    }
    
    if (translation.option !== 'speech') {
      throw new BadUserRequestError('Invalid translation option');
    }
    
    res.status(200).json({ translationUrl: translation.translatedText });
  } catch (err) {
    next(err);
  }
};
