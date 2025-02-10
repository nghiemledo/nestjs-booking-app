import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { UserRegisterDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  userRegister(userRegisterDTO: UserRegisterDTO): Promise<User> {
    const newUser = new this.userModel(userRegisterDTO);
    return newUser.save();
  }

  async userLogin(): Promise<boolean> {
    return null;
  }
}
