import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Venue, VenueSchema } from './venues.schema';
import { VenuesController } from './venues.controller';
import { VenuesService } from './venues.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Venue.name, schema: VenueSchema }]),
  ],
  controllers: [VenuesController],
  providers: [VenuesService],
})
export class VenuesModule {}
