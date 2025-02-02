import Joi from 'joi';

export const createAppointmentBody = Joi.object({
  doctor_id: Joi.number().required(),
  appointment_date: Joi.date().required(),
  appointment_duration: Joi.number().optional(),
  medical_history: Joi.string().optional(),
});

export const createAppointmentHeader = Joi.object({
  authorization: Joi.string().required(),
}).unknown(true);

export const updateAppointmentBody = Joi.object({
  appointment_id: Joi.number().required(),
  doctor_id: Joi.number().required(),
  appointment_date: Joi.date().required(),
  appointment_duration: Joi.number().optional(),
  medical_history: Joi.string().optional(),
});
