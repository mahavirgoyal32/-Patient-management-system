/* eslint-disable no-param-reassign */
import { Model } from '../../db/models/index.js';
import { CONSTANTS } from '../../utils/index.js';
import { userRepository, appointmentRepository, patientRepository } from '../../repository/index.js';
import { Http } from '../../exceptions/index.js';

const { sequelize } = Model;

export const createAppointment = {
  process: async params => {
    const transaction = await sequelize.transaction();
    try {
      const { doctor_id, appointment_date } = params;

      const doctor = await userRepository.get({
        where: {
          id: doctor_id,
          role: CONSTANTS.ROLES.DOCTOR,
        },
      });

      if (!doctor) {
        throw new Http.BadRequestError('doctor with this id do not exists');
      }

      if (params.user.role !== CONSTANTS.ROLES.PATIENT) {
        throw new Http.BadRequestError('Only patients can book appointment');
      }

      let patient = await patientRepository.get({
        where: {
          user_id: params.user.id,
        },
      });
      if (!patient) {
        patient = await patientRepository.create(
          {
            medical_history: params.medical_history || '',
            user_id: params.user.id,
          },
          { transaction },
        );
      }

      const appointment = await appointmentRepository.create(
        {
          appointment_date,
          doctor_id,
          patient_id: patient.id,
          appointment_duration: params.appointment_duration || 30,
        },
        { transaction },
      );

      await transaction.commit();
      return appointment;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
};
