import { Router } from 'express';
import { CONSTANTS } from '../utils/index.js';
import { appointmentController, userController } from '../controllers/index.js';
import { Validations } from '../validations/index.js';
import { requestValidator, aeh, authMiddleware } from '../middleware/index.js';

export const router = Router();

router.post('/register', requestValidator(Validations.createUserBody, CONSTANTS.REQUEST.BODY), aeh(userController.createUser));

router.post('/update/details', requestValidator(Validations.UpdateUserBody, CONSTANTS.REQUEST.BODY), authMiddleware, aeh(userController.updateUser));

router.post('/update/patient/details', requestValidator(Validations.UpdatePatientBody, CONSTANTS.REQUEST.BODY), authMiddleware, aeh(userController.updatePatientDetails));

router.post(
  '/create/user/:type',
  requestValidator(Validations.createAppointmentHeader, CONSTANTS.REQUEST.HEADERS),
  requestValidator(Validations.createUserBody, CONSTANTS.REQUEST.BODY),
  authMiddleware,
  aeh(userController.createUserFromAdmin),
);

router.post('/login', requestValidator(Validations.loginUserBody, CONSTANTS.REQUEST.BODY), aeh(userController.loginUser));

router.post(
  '/create/appointment',
  requestValidator(Validations.createAppointmentHeader, CONSTANTS.REQUEST.HEADERS),
  requestValidator(Validations.createAppointmentBody, CONSTANTS.REQUEST.BODY),
  authMiddleware,
  aeh(appointmentController.createAppointment),
);
router.post(
  '/update/appointment',
  requestValidator(Validations.createAppointmentHeader, CONSTANTS.REQUEST.HEADERS),
  requestValidator(Validations.createAppointmentBody, CONSTANTS.REQUEST.BODY),
  authMiddleware,
  aeh(appointmentController.updateAppointment),
);

router.get('/get/appointments', requestValidator(Validations.createAppointmentHeader, CONSTANTS.REQUEST.HEADERS), authMiddleware, aeh(appointmentController.getAllAppointments));

router.get('/get/users', requestValidator(Validations.createAppointmentHeader, CONSTANTS.REQUEST.HEADERS), authMiddleware, aeh(userController.getAllDoctorsAndPatients));
