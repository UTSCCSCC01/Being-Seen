import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { loginUserDto } from 'src/users/dto/loginUser.dto';

import { UsersService } from '../users/users.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validates a user object
   * @param loginUserDto Login user object
   * @returns User object if password is correct, null otherwise
   */
  async validateUser(loginUserDto: loginUserDto): Promise<any> {
    const user = await this.usersService.getUserByUsername(
      loginUserDto.username,
    );
    try {
      const match = await bcrypt.compare(
        loginUserDto.password,
        user[0].password,
      );
      if (match) {
        loginUserDto._id = user[0]._id;
        loginUserDto.permissions = user[0].permissions;
        loginUserDto.createdAt = user[0].createdAt;
        return user;
      }
      return null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Generates a JWT token.
   * @param user User object to be encoded
   * @returns JWT token
   */
  async login(loginUserDto: loginUserDto) {
    const validated = await this.validateUser(loginUserDto);
    if (validated !== null) {
      const payload = {
        id: loginUserDto._id,
        username: loginUserDto.username,
        permissions: loginUserDto.permissions,
        createdAt: loginUserDto.createdAt,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return new UnauthorizedException();
  }

  async updatePassword(loginUserDto: loginUserDto, newPass: string) {
    try {
      const validated = await this.validateUser(loginUserDto);
      if (validated !== null) {
        const newLogin = await this.usersService.updatePassword(
          loginUserDto,
          newPass,
        );
        /*
        const payload = {
          id: newLogin._id,
          username: newLogin.username,
          permissions: newLogin.permissions,
          createdAt: newLogin.createdAt,
        };
        return ({
          access_token: this.jwtService.sign(payload),
        });
        */
        return;
      }
      return new UnauthorizedException();
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException();
    }
  }
}
