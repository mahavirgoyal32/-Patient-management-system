import { Model } from '../db/models/index.js';

export const patientRepository = {
  create: async (params, options = {}) => {
    const data = await Model.Patient.create(params, options);
    return data;
  },
  upsert: async (params, options = {}) => {
    let instance = await Model.Patient.findOne(options);
    if (instance) {
      await Model.Patient.update(params, options);
    } else {
      instance = await Model.Patient.create(params, options);
    }
    return instance;
  },
  update: async (params, options = {}) => {
    const data = await Model.Patient.update(params, options);
    return data;
  },
  get: async (options = {}) => {
    const data = await Model.Patient.findOne(options);
    return data;
  },
  getAll: async (options = {}) => {
    const data = await Model.Patient.findAll(options);
    return data;
  },
  delete: async (params, options = {}) => {
    console.log(params?.params?.id);
    const data = await Model.Patient.destroy(options);
    return data;
  },
};
