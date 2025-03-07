import { Controller, Post, Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async createUser(@Body() body: { email: string; username: string; password: string }) {
    try {
      return await this.usersService.createUser(body.email, body.username, body.password);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.usersService.validateUser(body.username, body.password);
  }
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }
}
