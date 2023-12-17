import UserRepository from '$lib/repository/UserRepository';
import { UserService } from './UserService';

const userService = new UserService(UserRepository);

export default userService;
