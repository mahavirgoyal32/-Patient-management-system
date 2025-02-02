import { Model } from '../db/models/index.js';

export const appointmentRepository = {
  create: async (params, options = {}) => {
    const data = await Model.Appointment.create(params, options);
    return data;
  },
  get: async (params, options = {}) => {
    const data = await Model.Appointment.findOne(params, options);
    return data;
  },
  getAll: async (params, options = {}) => {
    const data = await Model.Appointment.findAll(params, options);
    return data;
  },
  update: async (params, options = {}) => {
    const data = await Model.Appointment.update(params, options);
    return data;
  },
};
