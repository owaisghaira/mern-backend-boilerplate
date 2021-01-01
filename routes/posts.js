import express from 'express'

import { setPosts } from '../controllers/posts.js'

const router = express.Router();

router.get('/', setPosts)

export default router;