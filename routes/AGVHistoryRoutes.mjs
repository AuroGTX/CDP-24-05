
import express from 'express';
import { addAGV, getAllAGVs } from '../Controllers/AGVHistoryController.mjs';

const AGVHistoryRoutes = express.Router();

AGVHistoryRoutes.post('/', addAGV);
AGVHistoryRoutes.get('/', getAllAGVs);

export default AGVHistoryRoutes;
