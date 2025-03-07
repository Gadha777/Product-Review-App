import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '../Userdetails/users.service';
import { UsersController } from '../Userdetails/users.controller';
import { User, UserSchema } from '../Userdetails/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export service for usage in other modules if needed

})
export class UsersModule {}
