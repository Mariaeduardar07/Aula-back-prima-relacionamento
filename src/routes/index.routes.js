import express from 'express';

// Import todas as rotas
import authRouter from './auth.routes.js';
import animeRouter from './animeRoutes.js';
import personagensRouter from './personagemRoutes.js';
import collectionRouter from './collectionRoutes.js';
import cardRouter from './cardRoutes.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotas publicas
router.use('/auth', authRouter);

// Rotas privadas
router.use(authMiddleware); 

router.use('/animes', animeRouter);
router.use('/personagens', personagensRouter);
router.use('/colecoes', collectionRouter);
router.use('/cartas', cardRouter);

export default router;