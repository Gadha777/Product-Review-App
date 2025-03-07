import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsModule } from './Modules/Review/reviews.module';
import { UsersModule } from './Modules/Userdetails/users.module';
import { UsersController } from './Modules/Userdetails/users.controller';

@Module({// @Module() decorator defines this class as a NestJS module
  imports: [  // 'imports' section registers feature modules and connects to MongoDB
    MongooseModule.forRoot('mongodb://localhost:27017/PRODUCT_REVIEW'), // Replace with your MongoDB URL
    ReviewsModule, // Registers the ReviewsModule
    UsersModule,// Registers the UsersModule
  ],
  controllers: [UsersController],  // 'controllers' section registers controllers that handle API requests


})
export class AppModule {}
