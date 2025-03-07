import { Injectable, HttpStatus ,HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from '../Review/reviews.schema';

@Injectable()
export class ReviewService {
    constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {}// Initializes the service with a Mongoose model. Stores the model as a class property to interact with the database.
  
  async addReview(reviewData: any): Promise<Review> {
    const newReview = new this.reviewModel(reviewData);
    return newReview.save();
  }
  
  async getReviewsByUsername(username: string): Promise<Review[]> {
    return this.reviewModel.find({ username }).exec();
  }

  async updateReview(id: string, updateData: any): Promise<Review | null> {
    return this.reviewModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async getReviewById(id: string): Promise<Review | null> {
    return this.reviewModel.findById(id).exec();
  }

  async getReviewsByCategory(category: string): Promise<Review[]> {
    console.log("Fetching reviews for category:", category); // Debugging
    return this.reviewModel.find({ category }).exec();
  }
  
  async deleteReview(id: string): Promise<{ message: string }> {
    const deletedReview = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!deletedReview) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Review deleted successfully' };
  }
}
