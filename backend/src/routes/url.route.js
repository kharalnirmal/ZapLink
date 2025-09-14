import express from 'express';
import { getUrlStats, getUserUrls, shortenUrl } from '../controller/url.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/shorten').post(protect, shortenUrl);
router.route('/stats/:urlCode').get(protect,getUrlStats);
router.route('/my-urls').get(protect,getUserUrls);


export default router;