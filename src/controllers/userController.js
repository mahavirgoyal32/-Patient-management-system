/* eslint-disable no-useless-catch */
import { User } from '../service/user/index.js';
import { CONSTANTS } from '../utils/index.js';
import { Http } from '../exceptions/index.js';

const { createUser, updatePatientDetails, updateUser, Login, getAllDoctorsAndPatients } = User;

export const userController = {
  createUser: async (req, res) => {
    try {
      await createUser.process(req.body);
      return res.status(200).json({ message: 'registered created successsFully' });
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
        user: res.locals.user,
      };
      const updatedUser = await updateUser.process(params);
      return res.status(200).json({ message: 'details update SuccessFully', ...updatedUser });
    } catch (error) {
      throw error;
    }
  },
  loginUser: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
      };
      const loginResponse = await Login.process(params);
      return res.status(200).json(loginResponse);
    } catch (error) {
      throw error;
    }
  },

  createUserFromAdmin: async (req, res) => {
    try {
      const params = {
        ...req.body,
        role: req.params.type,
        ...req.headers,
        user: res.locals.user,
      };
      if ((req.params.type === CONSTANTS.ROLES.DOCTOR || req.params.type === CONSTANTS.ROLES.ADMIN) && params.user.role !== CONSTANTS.ROLES.ADMIN) {
        throw new Http.UnauthorisedError('You are not authorised to use this API');
      }

      if (params.user.role === CONSTANTS.ROLES.PATIENT) {
        throw new Http.UnauthorisedError(' you are not authorised to use this api');
      }
      await createUser.process(params);
      return res.status(200).json({ message: 'user created successsFully' });
    } catch (error) {
      throw error;
    }
  },
  updatePatientDetails: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
        user: res.locals.user,
      };
      if (params.user.role === CONSTANTS.ROLES.PATIENT) {
        throw new Http.UnauthorisedError(' you are not authorised to use this api');
      }
      const updatedDetails = await updatePatientDetails.process(params);
      return res.status(200).json({ message: 'details update SuccessFully', ...updatedDetails });
    } catch (error) {
      throw error;
    }
  },
  getAllDoctorsAndPatients: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
        user: res.locals.user,
      };
      if (params.user.role === CONSTANTS.ROLES.PATIENT) {
        throw new Http.UnauthorisedError(' you are not authorised to use this api');
      }
      const response = await getAllDoctorsAndPatients.process(params);
      return res.status(200).json({ response });
    } catch (error) {
      throw error;
    }
  },
};
