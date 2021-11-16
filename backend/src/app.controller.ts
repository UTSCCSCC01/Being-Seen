import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';

import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Checks if database is online
   * GET /
   * @returns String success message
   */
  @Get()
  index() {
    return 'Being Seen database is online!';
  }

  /**
   * Log in user
   * POST /auth/login
   * @param req Request
   * @returns User object or error
   */
  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user) {
    return await this.authService.login(user);
  }

  /**
   * Gets the access token's user profile
   * GET /profile
   * @param req Request
   * @returns User object or error
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Body() user) {
    return user;
  }

  /**
   * Registers a new user
   * POST /auth/register
   * @param user user object
   * @returns user object or error
   */
  @Post('auth/register')
  async register(@Body() user) {
    return await this.usersService.createUser(user);
  }

  @Put('auth/change')
  async changePassword(@Body() user, @Body('new') newPass: string) {
    return await this.authService.updatePassword(user, newPass);
  }
}
