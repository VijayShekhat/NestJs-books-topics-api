import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Topic } from './topic.entity'; // Adjust the import path as needed

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  publishedDate: Date;

  @Prop({ required: true, unique: true })
  isbn: string;

  @Prop({ type: [Types.ObjectId], ref: 'Topic' }) // Reference to Topic
  topics?: Topic[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
