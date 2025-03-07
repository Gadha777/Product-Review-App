import { Controller, Post, Get,Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ReviewService } from './reviews.service';// Importing the ReviewService to handle business logic
@Controller('reviews')// Defining the controller for handling review-related API requests
export class ReviewsController {
  constructor(private readonly reviewService: ReviewService) {}  // Injecting the ReviewService to interact with the database/service layer

  @Post('add-review')
  async addReview(@Body() reviewData: any) {
    try {
      const savedReview = await this.reviewService.addReview(reviewData);//adds the review to the database.
      return { message: 'Review added successfully', review: savedReview };
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to add review', error: error.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get(':username')// Defines an API endpoint GET
  async getReviews(@Param('username') username: string) {
    try {
      const reviews = await this.reviewService.getReviewsByUsername(username);
      return reviews;
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to fetch reviews', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('update/:id')
  async updateReview(@Param('id') id: string, @Body() updateData: any) {
    try {
      const updatedReview = await this.reviewService.updateReview(id, updateData);
      if (!updatedReview) {
        throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Review updated successfully', review: updatedReview };
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to update review', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('get-review/:id')
async getReviewById(@Param('id') id: string) {
  try {
    const review = await this.reviewService.getReviewById(id);
    if (!review) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }
    return review;
  } catch (error) {
    throw new HttpException(
      { message: 'Failed to fetch review', error: error.message },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
@Get('category/:category')
async getReviewsByCategory(@Param('category') category: string) {
  try {
    const reviews = await this.reviewService.getReviewsByCategory(category);
    if (!reviews.length) {
      throw new HttpException('No reviews found for this category', HttpStatus.NOT_FOUND);
    }
    return reviews;
  } catch (error) {
    throw new HttpException(
      { message: 'Failed to fetch reviews by category', error: error.message },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}


@Delete(':id')
// @HttpCode(HttpStatus.NO_CONTENT) // Sends 204 No Content response
async deleteReview(@Param('id') id: string) {
  try {
    return await this.reviewService.deleteReview(id);
  } catch (error) {
    throw new HttpException(
      { message: 'Failed to delete review', error: error.message },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
}
