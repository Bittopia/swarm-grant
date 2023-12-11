import { AuthService } from './AuthService';
import AuthRepository from '$lib/repository/AuthRepository';
import UserRepository from '$lib/repository/UserRepository';

const authService = new AuthService(AuthRepository, UserRepository);

export default authService;
