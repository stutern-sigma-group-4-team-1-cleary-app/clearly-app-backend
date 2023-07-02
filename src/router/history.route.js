import express from 'express';
import { getTranslationHistory, markAsFavorite, removeFromFavorites, playSpeechTranslation } from '../controller/history.controller.js';
// import { userAuthMiddleWare } from "../middlewares/auth.middleware.js";
// import { tryCatch } from "../utils/tryCatchHandler.js";
const router = express.Router();

router.get('/', getTranslationHistory);
router.patch('/:translationId/favorite', markAsFavorite);
router.patch('/:translationId/unfavorite', removeFromFavorites);
router.get('/:translationId/play-speech', playSpeechTranslation);


export default router;
