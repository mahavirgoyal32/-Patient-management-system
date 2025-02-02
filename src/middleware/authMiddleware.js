import _debug from 'debug';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { CONSTANTS } from '../utils/index.js';
import { Http } from '../exceptions/index.js';
import { HttpError } from '../exceptions/base.js';

dotenv.config();

const debug = _debug(CONSTANTS.SERVICE_NAME);

/**
 * handles the error asynchronously
 *
 * @async
 * @param {Function} routeHandler route controller function
 * @returns {Function} error handler function
 */
export async function authMiddleware(req, res, next) {
  try {
    const token = req.header('Authorization');
    if (!token) {
      throw new Http.UnauthorisedError('Access denied. No token provided.');
    }
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    res.locals.user = decoded;
    return next();
  } catch (error) {
    if (process.env.PRINT_EXCEPTIONS === 'true') {
      console.error(error);
    }
    if (error instanceof HttpError) {
      return res.status(error.status).json(error.message);
    }
    debug(error.message);
    const internalServerError = new Http.InternalServerError(error.message);
    return res.status(500).json(internalServerError.message);
  }
}
