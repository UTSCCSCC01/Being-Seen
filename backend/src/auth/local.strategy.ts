import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from 'src/users/dto/loginUser.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * Validates user as part of the Passport local authentication strategy
   * @param loginUserDto Login user object
   * @returns User object if user credentials are valid, error otherwise
   */
  async validate(loginUserDto: loginUserDto): Promise<any> {
    const user = await this.authService.validateUser(loginUserDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
