import express from 'express';
import {
  searchSentence,
  copyImage,
  downloadImage,
  favoriteImage,
  unfavoriteImage,
  shareImage
} from '../controller/sentence.controller.js';
import { userAuthMiddleWare } from '../middlewares/auth.middleware.js';
import { tryCatch } from "../utils/tryCatchHandler.js";

const router = express.Router();

router.get('/search', userAuthMiddleWare, tryCatch(searchSentence));
router.post('/copy', userAuthMiddleWare, tryCatch(copyImage));
router.post('/download', userAuthMiddleWare, tryCatch(downloadImage));
router.post('/share', userAuthMiddleWare, tryCatch(shareImage));
router.post('/favorite', userAuthMiddleWare, tryCatch(favoriteImage));
router.patch('/unfavorite/:id', userAuthMiddleWare, tryCatch(unfavoriteImage));

export default router;
