/* eslint-disable no-param-reassign */
import bcrypt from 'bcryptjs';
import { CONSTANTS } from '../../utils/index.js';
import { Http } from '../../exceptions/index.js';
import { userRepository, patientRepository } from '../../repository/index.js';
import { Model } from '../../db/models/index.js';

const { sequelize } = Model;

export const createUser = {
  process: async params => {
    const transaction = await sequelize.transaction();
    try {
      const user = await userRepository.get({
        where: {
          email: params.email,
        },
      });
      if (user) {
        throw new Http.ConflictError('User with this email already exists');
      }
      const hashedPassword = await bcrypt.hash(params.password, 10);
      const userData = {
        name: params.name,
        email: params.email,
        address: params.address,
        contact_number: params.contact_number,
        password: hashedPassword,
        role: params.role || CONSTANTS.ROLES.PATIENT,
      };
      const newUser = await userRepository.createUser(userData, { transaction });

      if (newUser.role === CONSTANTS.ROLES.PATIENT) {
        const patientData = {
          medical_history: params.medical_history || '',
          user_id: newUser.id,
        };
        await patientRepository.create(patientData, { transaction });
      }
      await transaction.commit();
      return newUser;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
};

export const deleteUser = {
  process: async params => {
    const options = { where: { ulid: params.id } };
    const userDetails = await userRepository.get(options);
    if (!userDetails) {
      throw Http.ConflictError(`user not exist for this ${params.id}`);
    }
    const deletedUser = await userRepository.deleteUser(options);
    return deletedUser;
  },
};

export const updateUser = {
  process: async params => {
    const options = { where: { email: params.email } };
    const userDetails = await userRepository.get(options);
    if (!userDetails) {
      throw Http.ConflictError(`user not exist for this ${params.id}`);
    }

    let hashedPassword = userDetails.password;

    if (params.password) {
      hashedPassword = await bcrypt.hash(params.password, 10);
    }
    const userData = {
      name: params.name ?? userDetails.name,
      address: params.address ?? userDetails.address,
      contact_number: params.contact_number ?? userDetails.contact_number,
      password: hashedPassword,
    };
    const updatedUser = await userRepository.update(userData, options);
    return updatedUser;
  },
};

export const updatePatientDetails = {
  process: async params => {
    const patient = await userRepository.get({
      where: {
        email: params.patient_email,
      },
    });
    if (!patient) {
      throw new Http.NotFoundError('this patient do not exists');
    }

    const options = {
      where: {
        user_id: patient.id,
      },
    };

    const updatedData = {
      medical_history: params.medical_history,
    };
    const updatedUser = await patientRepository.update(updatedData, options);
    return updatedUser;
  },
};
