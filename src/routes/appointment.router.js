// routes/appointment.router.js
import express from 'express';
import validateData from '../middlewares/validate.middleware.js'
import AppointmentController from '../controllers/appointment.controller.js';
import {createAppointment, updateAppointment} from '../schemas/appointment.schema.js'

const router = express.Router();

router.post('/appointments', validateData(createAppointment), AppointmentController.create);
router.get('/appointments', AppointmentController.findAll);
router.get('/appointments/:id', AppointmentController.findOne);
router.patch('/appointments/:id', validateData(updateAppointment), AppointmentController.update);
router.delete('/appointments/:id', AppointmentController.delete);

export default router;
