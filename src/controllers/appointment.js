/* eslint-disable no-useless-catch */
import { Appointment } from '../service/index.js';

const { createAppointment, getAppointments, updateAppointment } = Appointment;

export const appointmentController = {
  createAppointment: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
        ...req.headers,
        user: res.locals.user,
      };
      const appointment = await createAppointment.process(params);
      return res.status(200).json({ message: 'appointment booked successfully', ...appointment });
    } catch (error) {
      throw error;
    }
  },

  updateAppointment: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
        ...req.headers,
        user: res.locals.user,
      };
      const appointment = await updateAppointment.process(params);
      return res.status(200).json({ message: 'appointment updated successfully', ...appointment });
    } catch (error) {
      throw error;
    }
  },

  // get Controllers
  getAllAppointments: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
        user: res.locals.user,
      };
      const appointments = await getAppointments.process(params);
      return res.status(200).json({ message: 'appointments fetched successfully', appointments });
    } catch (error) {
      throw error;
    }
  },
};
