import { Controller, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ResponseType from 'src/utils/responsetype.util';
import { Model } from 'mongoose';
import { Role } from 'src/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @Post('register')
  async userRegister(request: Request, response: Response) {
    try {
      const user = await this.userModel.findOne({ email: request.body.email });
      if (user) {
        response.status(500).json('User already exist');
        return;
      }
      const hashedPassword = await bcrypt.hash(request.body.password, 12);
      jwt.sign({ email: request.body.email }, 'secretkey123', {
        expiresIn: '30m',
      });
      await this.userModel.create({
        ...request.body,
        password: hashedPassword,
      });

      response.status(201).json({
        status: 'Success',
        message: 'User registered successfully',
      });
    } catch {
      response.json(
        new ResponseType('Error occurred when register user').error(),
      );
    }
  }

  @Post('login')
  async userLogin(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        return response
          .status(400)
          .json({ message: 'Email and password are required' });
      }

      const user = await this.userModel.findOne({ email });
      if (!user) {
        return response.status(400).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return response
          .status(401)
          .json({ message: 'Invalid email or password' });
      }

      const accessToken = jwt.sign(
        { _id: user._id, roles: user.roles },
        process.env.JWT_SECRET || 'secretkey123',
        { expiresIn: '30m' },
      );
      const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET || 'secretkey123',
        { expiresIn: '1d' },
      );

      return response.status(200).json({
        status: 'Success',
        message: 'Logged in successfully',
        accessToken,
        refreshToken,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  @Post('admin/login')
  async adminLogin(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        return response
          .status(400)
          .json({ message: 'Email and password are required' });
      }

      const user = await this.userModel.findOne({ email });

      if (!user) {
        return response.status(400).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return response
          .status(401)
          .json({ message: 'Invalid email or password' });
      }

      if (!user.roles.includes(Role.Admin)) {
        return response
          .status(403)
          .json({ message: 'Access denied. Admins only.' });
      }

      const accessToken = jwt.sign(
        { _id: user._id, roles: user.roles },
        process.env.JWT_SECRET || 'secretkey123',
        { expiresIn: '30m' },
      );
      const refreshToken = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET || 'secretkey123',
        { expiresIn: '1d' },
      );

      return response.status(200).json({
        status: 'Success',
        message: 'Admin logged in successfully',
        accessToken,
        refreshToken,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}
