import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewService } from "../Review/reviews.service"
import { ReviewsController } from '../Review/reviews.controller';
import { Review, ReviewSchema } from './reviews.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])],
  controllers: [ReviewsController],
  providers: [ReviewService],
})
export class ReviewsModule {}
