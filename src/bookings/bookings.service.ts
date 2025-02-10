import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './bookings.schema';
import { BookingDTO } from './bookings.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  getAllBooking(): Promise<Booking[]> {
    return this.bookingModel.find();
  }

  createBooking(bookingDTO: BookingDTO): Promise<Booking> {
    const newBooking = new this.bookingModel(bookingDTO);
    return newBooking.save();
  }

  updateBooking(id: string, bookingDTO: BookingDTO): Promise<Booking | null> {
    const bookingUpdated = this.bookingModel.findByIdAndUpdate(id, bookingDTO, {
      new: true,
      runValidators: true,
    });
    return bookingUpdated;
  }

  async deleteBooking(id: string) {
    const result = await this.bookingModel.findByIdAndDelete(id);
    return result;
  }
}
