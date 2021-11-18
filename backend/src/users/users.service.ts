import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { ProfileService } from 'src/profile/profile.service';

import { CreateUserDto } from './dto/createUser.dto';
import { loginUserDto } from './dto/loginUser.dto';
import { User } from './users.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
    private readonly profileService: ProfileService,
  ) {}

  /**
   * Find user by username
   * @param username Username query
   * @returns User object if found, null otherwise
   */
  async getUserByUsername(username: string) {
    try {
      const user = await this.UserModel.find({ username }).exec();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Find user by user id
   * @param id User id
   * @returns User object if found, null otherwise
   */
  async getUserById(id: Schema.Types.ObjectId) {
    try {
      const user = await this.UserModel.findById({ _id: id }).exec();
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Create new user
   * @param createUserDto User object
   * @returns New user object or error if user creation fails
   */
  async createUser(createUserDto: CreateUserDto) {
    const userExists = await this.getUserByUsername(createUserDto.username);
    if (userExists.length === 0) {
      bcrypt.hash(createUserDto.password, 10, async (error, hash) => {
        if (error) {
          throw new InternalServerErrorException(error);
        }

        const userObject = new this.UserModel({
          username: createUserDto.username,
          password: hash,
          permissions: createUserDto.permissions,
        });

        try {
          const newUser = await userObject.save();

          const newProfile = await this.profileService.postProfile(
            userObject.id,
            createUserDto.username,
            '',
            0,
          );

          return newUser;
        } catch (error) {
          throw new InternalServerErrorException(error);
        }
      });
    } else {
      throw new ConflictException('Username already exists');
    }
  }

  async updatePassword(loginUserDto: loginUserDto, newPass: string) {
    const userExists = await this.getUserByUsername(loginUserDto.username);
    if (userExists.length !== 0) {
      bcrypt.hash(newPass, 10, async (error, hash) => {
        if (error) {
          throw new InternalServerErrorException(error);
        }

        try {
          userExists[0].password = hash;
          const toRet = userExists[0].save();
          return toRet;
        } catch (error) {
          throw new InternalServerErrorException(error);
        }
      });
    } else {
      throw new ConflictException('Username already exists');
    }
    return null;
  }
}
