import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validates a user object
   * @param username Retrieves a user object and verifies the password
   * @param password Password to be verified
   * @returns User object if password is correct, null otherwise
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return null;
      }
      const match = await bcrypt.compare(hash, user.password);
      if (match) {
        return user;
      }
      return null;
    });
  }

  /**
   * Generates a JWT token.
   * @param user User object to be encoded
   * @returns JWT token
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
