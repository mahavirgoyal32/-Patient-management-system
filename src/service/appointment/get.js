import { Op } from 'sequelize';
import { CONSTANTS } from '../../utils/index.js';
import { appointmentRepository, patientRepository } from '../../repository/index.js';
import { Http } from '../../exceptions/index.js';

export const getAppointments = {
  process: async params => {
    const { user, start_date, end_date } = params;
    const whereClause = {};

    // Apply time period constraint if provided
    if (start_date && end_date) {
      whereClause.appointment_date = {
        [Op.between]: [new Date(start_date), new Date(end_date)],
      };
    }

    if (user.role === CONSTANTS.ROLES.PATIENT) {
      // Patients can only view their own appointments
      const patient = await patientRepository.get({
        where: { user_id: user.id },
      });

      if (!patient) {
        throw new Http.NotFoundError('No patient record found for the user.');
      }

      whereClause.patient_id = patient.id;
    } else if (user.role === CONSTANTS.ROLES.DOCTOR) {
      // Doctors can only view appointments assigned to them
      whereClause.doctor_id = user.id;
    }

    // Admins can view all appointments, so no additional constraints

    const appointments = await appointmentRepository.getAll({
      where: whereClause,
    });

    if (!appointments.length) {
      throw new Http.NotFoundError('No appointments found for the given criteria.');
    }

    return appointments;
  },
};
