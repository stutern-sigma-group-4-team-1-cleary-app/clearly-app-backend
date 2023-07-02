import express from 'express';
import {
  searchSentence,
  copyImage,
  downloadImage,
  favoriteImage,
  unfavoriteImage,
  shareImage
} from '../controller/sentence.controller.js';
// import { userAuthMiddleWare } from '../middlewares/auth.middleware.js';
import { tryCatch } from "../utils/tryCatchHandler.js";

const router = express.Router();

router.get('/search', tryCatch(searchSentence));
router.post('/copy', tryCatch(copyImage));
router.post('/download', tryCatch(downloadImage));
router.post('/share', tryCatch(shareImage));
router.post('/favorite', tryCatch(favoriteImage));
router.patch('/unfavorite/:id', tryCatch(unfavoriteImage));

export default router;
