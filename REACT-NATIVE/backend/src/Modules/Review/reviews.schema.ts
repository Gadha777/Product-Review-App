import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose'; // Import HydratedDocument from Mongoose, which represents a fully populated document

export type ReviewDocument = HydratedDocument<Review>;// Define a type for the Review document, which extends Mongoose's HydratedDocument


@Schema()// Define a Mongoose schema using the @Schema decorator
export class Review {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  startingPrice: number;

  @Prop({ required: true })
  reviewText: string;

  @Prop({ required: true })
  shortRating: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  category: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
//converts the TypeScript class into a Mongoose schema, which is necessary for MongoDB operations.