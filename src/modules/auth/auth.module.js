import { UserRepository } from '../user/user.repository.js';
import { UserService } from '../user/user.service.js';
import { AuthService } from './auth.service.js';
import AuthController from './auth.controller.js';
import { SessionService } from '../session/session.service.js';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const sessionService = new SessionService();

const authService = new AuthService(userService, sessionService);
const authController = new AuthController(authService);

export { authController };
