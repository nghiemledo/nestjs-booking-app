import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type VenueDocument = HydratedDocument<Venue>;

@Schema({ timestamps: true })
export class Venue {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  capacity: number;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Booking' }] })
  bookings: Types.ObjectId[];
}

export const VenueSchema = SchemaFactory.createForClass(Venue);
