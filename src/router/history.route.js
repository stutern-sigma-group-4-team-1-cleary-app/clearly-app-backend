import express from 'express';
import { getTranslationHistory, markAsFavorite, removeFromFavorites, playSpeechTranslation } from '../controller/history.controller.js';
import { userAuthMiddleWare } from "../middlewares/auth.middleware.js";
// import { tryCatch } from "../utils/tryCatchHandler.js";
const router = express.Router();

router.get('/', userAuthMiddleWare, getTranslationHistory);
router.patch('/:translationId/favorite', userAuthMiddleWare, markAsFavorite);
router.patch('/:translationId/unfavorite', userAuthMiddleWare, removeFromFavorites);
router.get('/:translationId/play-speech', userAuthMiddleWare, playSpeechTranslation);


export default router;
