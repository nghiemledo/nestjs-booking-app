import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Venue', required: true })
  venueId: Types.ObjectId;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  hour: number;

  @Prop({ default: false })
  status: boolean;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
