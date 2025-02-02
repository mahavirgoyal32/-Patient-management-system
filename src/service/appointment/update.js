/* eslint-disable no-param-reassign */
import { Model } from '../../db/models/index.js';
import { CONSTANTS } from '../../utils/index.js';
import { userRepository, appointmentRepository, patientRepository } from '../../repository/index.js';
import { Http } from '../../exceptions/index.js';

const { sequelize } = Model;

export const updateAppointment = {
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

      if (params.user.role === CONSTANTS.ROLES.DOCTOR) {
        throw new Http.BadRequestError('doctors can not update appointment');
      }

      const patient = await patientRepository.get({
        where: {
          user_id: params.user.id,
        },
      });

      const appointment = await appointmentRepository.update(
        {
          appointment_date,
          doctor_id,
          patient_id: patient.id,
          appointment_duration: params.appointment_duration || 30,
        },
        {
          where: {
            doctor_id,
            patient_id: patient.id,
          },
          transaction,
        },
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
