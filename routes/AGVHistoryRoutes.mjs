
import express from 'express';
import { addAGV, getAllAGVs } from '../Controllers/AGVHistoryController.mjs';

const AGVHistoryRoutes = express.Router();

AGVHistoryRoutes.post('/', addOrUpdateRovers);
AGVHistoryRoutes.get('/', getAllRovers);

export default AGVHistoryRoutes;
