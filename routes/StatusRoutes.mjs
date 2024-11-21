import express from 'express';
import { updateRoverStatus, getRoverStatusHistory } from '../Controllers/RoverController.mjs';

const StatusRoutes = express.Router();

StatusRoutes.post('/', updateRoverStatus);
StatusRoutes.get('/:serial_number', getRoverStatusHistory);

export default StatusRoutes;
