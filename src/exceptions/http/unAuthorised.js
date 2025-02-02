import { HttpError } from '../base.js';

export class UnauthorisedError extends HttpError {
  constructor(message) {
    super(message, 401, {
      errors: [
        {
          message,
        },
      ],
    });
    this.name = 'UnauthorisedError';
    // this.status = 400;
  }
}
