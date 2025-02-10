import { Injectable } from '@nestjs/common';
import { Venue } from './venues.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VenuesService {
  constructor(@InjectModel(Venue.name) private venueModel: Model<Venue>) {}

  async getAllVenues(): Promise<Venue[]> {
    return this.venueModel.find();
  }
}
