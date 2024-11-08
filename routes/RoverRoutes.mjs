
import express from 'express';
import { addOrUpdateRovers, getAllRovers } from '../Controllers/RoverController.mjs';

const RoverRoutes = express.Router();

RoverRoutes.post('/', addOrUpdateRovers);
RoverRoutes.get('/', getAllRovers);

export default RoverRoutes;
