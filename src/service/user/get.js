import { userRepository, patientRepository } from '../../repository/index.js';
import { CONSTANTS } from '../../utils/index.js';
import { Http } from '../../exceptions/index.js';

export const getAllDoctorsAndPatients = {
  process: async params => {
    if (params.user.role === CONSTANTS.ROLES.PATIENT) {
      throw new Http.ConflictError('you are not allowed for this role');
    }
    // Fetch all patients and include their medical history
    const patients = await patientRepository.getAll();
    if (params.user.role === CONSTANTS.ROLES.DOCTOR) {
      return patients;
    }
    // Fetch all doctors
    const doctors = await userRepository.getAll({
      where: { role: CONSTANTS.ROLES.DOCTOR },
      attributes: ['id', 'name', 'email', 'contact_number'],
    });

    return { doctors, patients };
  },
};
