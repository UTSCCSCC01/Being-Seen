import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Validates a user object
   * @param username Retrieves a user object and verifies the password
   * @param pass Password to be verified
   * @returns User object if password is correct, null otherwise
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const md5Pass = require('crypto').createHash('md5').update(pass).digest('hex');
    if (user => user[1] === md5Pass) {
      const result = user;
      return result;
    }
    return null;
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
