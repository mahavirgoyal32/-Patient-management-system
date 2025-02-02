import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Http } from '../../exceptions/index.js';
import { userRepository } from '../../repository/index.js';

dotenv.config();

export const Login = {
  process: async params => {
    const { email, password } = params;

    const user = await userRepository.get({
      where: {
        email,
      },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Http.UnauthorisedError('Invalid email or password');
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES_IN || '1h' }, // Token expires in 1 hour
    );
    return { token, user: { name: user.name, role: user.role } };
  },
};
