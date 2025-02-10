import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { VenuesModule } from './venues/venues.module';
import { AvailabilityModule } from './availability/availability.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/coworking_db'),
    UsersModule,
    BookingsModule,
    VenuesModule,
    AvailabilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
