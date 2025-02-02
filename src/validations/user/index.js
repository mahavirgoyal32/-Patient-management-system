import Joi from 'joi';

export const createUserBody = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email(),
  password: Joi.string().required(),
  contact_number: Joi.string().optional(),
});

export const UpdateUserBody = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string()
    .optional()
    .email(),
  address: Joi.string().optional(),
  contact_number: Joi.string().optional(),
  password: Joi.string().optional(),
  medical_history: Joi.string().optional(),
}).or('name', 'email', 'address', 'contact_number', 'password');

export const UpdatePatientBody = Joi.object({
  patient_email: Joi.string().required(),
  medical_history: Joi.string().required(),
}).required();

export const loginUserBody = Joi.object({
  email: Joi.string()
    .required()
    .email(),
  password: Joi.string().required(),
});
