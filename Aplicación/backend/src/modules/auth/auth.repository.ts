import usersRepository from "../users/users.repository.js";

export class AuthRepository {
  async findUserByEmail(email: string) {
    return usersRepository.findByEmail(email);
  }
}

export default new AuthRepository();